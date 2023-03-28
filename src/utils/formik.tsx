import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  createFilterOptions,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  FilterOptionsState,
} from "@mui/material";

import { FieldArray, isObject, useField } from "formik";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

const filter = createFilterOptions();

export interface MUIFileUploadProps {
  name: string;
  uploadName: string;
  [x: string]: any;
}

export const MUIFileUpload = ({
  name,
  uploadName,
  ...props
}: MUIFileUploadProps) => {
  const [field, meta, { setValue }] = useField(name);
  const handleFileUploadFields = useField(uploadName);
  const hasError = meta.touched && meta.error;

  const handleUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : false;
    if (file) {
      handleFileUploadFields[2].setValue(file);
      setValue(file.name);
    }
  };

  const handleDelete = () => {
    handleFileUploadFields[2].setValue(null);
    setValue("");
  };

  const hostLink = "http://localhost:3000";
  const filePath = `${hostLink}/${field.value.replace("files/", "")}`;

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {field.value && (
        <Box>
          <Link href={filePath} target="_blank">
            <Chip
              sx={{ "&:hover": { cursor: "pointer", opacity: 0.8 } }}
              color="success"
              label={field.value}
              onDelete={handleDelete}
            />
          </Link>
        </Box>
      )}
      <Button variant="contained" component="label" size="small">
        {field.value ? "Replace" : "Upload"}
        <input
          name={uploadName}
          hidden
          /* multiple */
          type="file"
          {...props}
          onChange={handleUpload}
        />
      </Button>
    </Stack>
  );
};

export interface MUIAutocompleteProp {
  label: string;
  items: { id: number; name: string }[];
  multiple: boolean;
  newInputHandler?: (arg0: string) => void;
  freeSolo: boolean;
  name: string;
  [x: string]: any;
}

export const MUIAutocomplete = ({
  label,
  items,
  multiple,
  newInputHandler,
  freeSolo = true,
  ...props
}: MUIAutocompleteProp) => {
  const [field, meta, { setValue }] = useField(props);

  const hasError = meta.touched && meta.error;

  const filterOptions = (options: any[], params: FilterOptionsState<any>) => {
    const filtered = filter(options, params);

    if (freeSolo) {
      const { inputValue } = params;
      // Suggest the creation of a new value
      const isExisting = options.some((option) => inputValue === option.name);
      if (inputValue !== "" && !isExisting) {
        filtered.push({
          inputValue,
          name: `Add "${inputValue}"`,
        });
      }
    }

    return filtered;
  };

  return (
    <FormControl fullWidth size="small" sx={{ borderColor: "danger.main" }}>
      <Autocomplete
        size="small"
        multiple={multiple}
        options={items}
        // @ts-ignore
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        value={field.value}
        filterOptions={filterOptions}
        onChange={async (event, newValue) => {
          console.log({ newValue });
          let processedValue;
          if (multiple) {
            if (newValue && Array.isArray(newValue)) {
              processedValue = await Promise.all(
                newValue.map(async (item) => {
                  if (item.inputValue) {
                    // @ts-ignore
                    return await newInputHandler(item);
                  } else {
                    return item;
                  }
                })
              );
            }
          } else {
            // @ts-ignore
            if (newValue?.inputValue) {
              // @ts-ignore
              processedValue = await newInputHandler(newValue);
            } else {
              processedValue = newValue;
            }
          }
          setValue(processedValue);
        }}
        // @ts-ignore
        isOptionEqualToValue={(option, value) => {
          // @ts-ignore
          return parseInt(option.id) === parseInt(value.id);
        }}
        freeSolo={freeSolo}
        renderInput={(params) => {
          return (
            <TextField
              error={!!hasError}
              helperText={meta.touched && meta.error ? meta.error : null}
              {...params}
              label={label}
            />
          );
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
      />
      {/* {hasError ? <FormHelperText>{meta.error}</FormHelperText> : null} */}
    </FormControl>
  );
};

export interface MUITextProp {
  label: string;
  name: string;
  [x: string]: any;
}

export const MUIText = ({ label, ...props }: MUITextProp) => {
  const [field, meta, { setValue }] = useField(props.name);
  const fieldValue = field.value;
  const [internalVal, setInternalVal] = useState(fieldValue);
  const hasError = meta.touched && meta.error;

  useEffect(() => {
    setInternalVal(fieldValue);
  }, [fieldValue]);

  // @ts-ignore
  const handleChange = (e) => {
    setInternalVal(e.target.value);
  };

  const handleBlur = () => {
    setValue(internalVal);
  };

  // @ts-ignore
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setValue(e.target.value);
    }
  };

  const { onChange, onBlur, value, ...otherField } = field;

  return (
    <FormControl fullWidth size="small">
      <TextField
        inputRef={props.inputRef}
        error={!!hasError}
        helperText={meta.touched && meta.error ? meta.error : null}
        label={label}
        variant="outlined"
        size="small"
        value={internalVal}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={(e) => handleKeyDown(e)}
        {...otherField}
        {...props}
      />
      {/* {hasError ? <FormHelperText>{meta.error}</FormHelperText> : null} */}
    </FormControl>
  );
};

export interface MUISwitchProp {
  label: string;
  name: string;
  [x: string]: any;
}

export const MUISwitch = ({ label, ...props }: MUISwitchProp) => {
  const [field, meta, { setValue }] = useField(props);

  const handleChange = () => {
    setValue(!field.value);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch onChange={handleChange} checked={field.value} />}
        label={label}
      />
    </FormGroup>
  );
};

export interface MUISelectProp {
  label: string;
  name: string;
  items: { value: string; label: string }[];
  [x: string]: any;
}

export const MUISelect = ({ label, items, ...props }: MUISelectProp) => {
  const [field, meta, { setValue }] = useField(props);
  const fieldValue = field.value;
  const labelId = `${props.id || props.name}-label`;
  const [internalVal, setInternalVal] = useState(field.value);
  const hasError = meta.touched && meta.error;

  useEffect(() => {
    setInternalVal(fieldValue);
  }, [fieldValue]);

  // @ts-ignore
  const handleChange = (e) => {
    setInternalVal(e.target.value);
  };

  const handleBlur = () => {
    setValue(internalVal);
  };

  const { onChange, onBlur, value, ...otherField } = field;

  const createItems = () => {
    return items.map((item) => {
      if (item) {
        const { value, label } = item;
        return (
          <MenuItem key={label} value={value}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </MenuItem>
        );
      }
    });
  };

  return (
    <FormControl fullWidth size="small" error={!!hasError}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        value={internalVal}
        onChange={handleChange}
        onBlur={handleBlur}
        {...otherField}
        {...props}
      >
        {createItems()}
      </Select>
      {hasError ? (
        <FormHelperText sx={{ color: "danger.main" }}>
          {meta.error}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export interface MUIRadioProp {
  label: string;
  name: string;
  items: { value: string; label: string }[];
  radioProps?: any;
  row?: boolean;
  [x: string]: any;
}

export const MUIRadio = ({
  label,
  items,
  radioProps,
  row = true,
  ...props
}: MUIRadioProp) => {
  const [field, meta, { setValue }] = useField(props);
  const fieldValue = field.value;
  const labelId = `${props.id || props.name}-label`;
  const [internalVal, setInternalVal] = useState(field.value);
  const hasError = meta.touched && meta.error;

  useEffect(() => {
    setInternalVal(fieldValue);
  }, [fieldValue]);

  // @ts-ignore
  const handleChange = (e) => {
    setInternalVal(e.target.value);
  };

  const handleBlur = () => {
    setValue(internalVal);
  };

  const { onChange, onBlur, value, ...otherField } = field;

  const createItems = () => {
    return items.map((item) => {
      const { value, label } = item;
      return (
        <FormControlLabel
          sx={{ textTransform: "capitalize" }}
          key={label}
          value={value}
          control={<Radio {...radioProps} />}
          label={label}
        />
      );
    });
  };

  return (
    // @ts-ignore
    <FormControl sx={{ px: 1 }} error={hasError}>
      <FormLabel id={labelId}>{label}</FormLabel>
      <RadioGroup
        row={row}
        aria-labelledby={labelId}
        value={internalVal}
        onChange={handleChange}
        onBlur={handleBlur}
        {...otherField}
        {...props}
      >
        {createItems()}
      </RadioGroup>
      {hasError ? <FormHelperText>{meta.error}</FormHelperText> : null}
    </FormControl>
  );
};

export interface MUICheckboxGroupProp {
  label: string;
  name: string;
  items: { id: string; name: string }[];
  cbProps: any;
  row: boolean;
  [x: string]: any;
}

export const MUICheckboxGroup = ({
  label,
  items,
  cbProps,
  row = false,
  ...props
}: MUICheckboxGroupProp) => {
  const [field, meta, { setValue }] = useField(props);

  // @ts-ignore
  const handleChange = (e, id: string) => {
    if (e.target.checked) {
      // @ts-ignore
      setValue([...new Set([...field.value, id])]);
    } else {
      // @ts-ignore
      setValue(field.value.filter((item) => item !== id));
    }
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row={row}>
        {items?.map(({ id, name }) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  {...cbProps}
                  checked={field.value.includes(id.toString())}
                  onChange={(e) => handleChange(e, id.toString())}
                  name={name}
                />
              }
              key={id}
              label={<Typography>{name}</Typography>}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};
