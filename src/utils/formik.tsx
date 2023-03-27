import { FormControl, TextField } from "@mui/material";
import { useField } from "formik";
import { useEffect, useState } from "react";

export interface MUITextProp {
  label: string;
  name: string;
  [x: string]: any;
}

export const MUIText = ({ label, ...props }: MUITextProp) => {
  //console.log({ label, props });
  const [field, meta, { setValue }] = useField(props.field);
  const fieldValue = field.value;
  const [internalVal, setInternalVal] = useState(fieldValue);
  const hasError = meta.touched && meta.error;

  useEffect(() => {
    setInternalVal(fieldValue);
  }, [fieldValue]);

  //@ts-ignore
  const handleChange = (e) => {
    setInternalVal(e.currentTarget.value);
  };

  const handleBlur = () => {
    setValue(internalVal);
  };

  //@ts-ignore
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setValue(e.currentTarget.value);
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
