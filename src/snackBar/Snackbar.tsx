import { SyntheticEvent, forwardRef, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/system";
import { Snackbar as MUISnackbar, SnackbarCloseReason } from "@mui/material";
import { useGlobalContext } from "../contexts/Global";

export const useSnackbar = () => {
  const [snackBar, setSnackBar] = useState<{
    msg: string;
    open: boolean;
    severity?: "success" | "error";
  }>({ msg: "", open: false });

  const openSnackbar = (
    msg: string,
    severity: "success" | "error" = "success"
  ) => {
    setSnackBar({ ...snackBar, open: true, msg, severity });
  };

  const closeSnackbar = (
    event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({ ...snackBar, open: false });
  };

  return { snackBar, openSnackbar, closeSnackbar };
};

const Alert = forwardRef(function Alert(props, ref) {
  //@ts-ignore
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbar() {
  const { snackBar, closeSnackbar } = useGlobalContext();

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <MUISnackbar
        open={snackBar.open}
        autoHideDuration={2000}
        onClose={closeSnackbar}
      >
        {/* @ts-ignore */}
        <Alert
          onClose={closeSnackbar}
          severity={snackBar.severity}
          sx={{ width: "100%" }}
        >
          {snackBar.msg}
        </Alert>
      </MUISnackbar>
    </Stack>
  );
}
