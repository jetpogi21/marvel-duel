import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React from "react";
import useCards from "../../../hooks/useCards";
import SortMenu from "../../sortMenu/SortMenu";
import Stack from "@mui/material/Stack";
import Link from "next/link";

export const CardListHeader = () => {
  const { limit, handleLimitChange, sortOptions, modifySort } = useCards()!;

  return (
    <>
      <Button size="small" variant="contained">
        <Link href="/new" style={{ textDecoration: "none", color: "inherit" }}>
          Add New
        </Link>
      </Button>
      <Stack direction="row" ml="auto" gap={2}>
        <Box width="75px">
          <FormControl fullWidth={true}>
            <InputLabel id="limit-label">Limit</InputLabel>
            <Select
              labelId="limit-label"
              id="limit"
              value={limit}
              label="Show Records"
              size="small"
              onChange={handleLimitChange}
            >
              <MenuItem value={"10"}>10</MenuItem>
              <MenuItem value={"20"}>20</MenuItem>
              <MenuItem value={"30"}>30</MenuItem>
              <MenuItem value={"40"}>40</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <SortMenu sortOptions={sortOptions} modifySort={modifySort} />
        </Box>
      </Stack>
    </>
  );
};
