import axios from "axios";
import React, { ReactNode, SyntheticEvent, useContext, useState } from "react";
import { SnackbarCloseReason } from "@mui/material";
import { useSnackbar } from "../snackBar/Snackbar";

interface AppContextValues {
  pageLoading: boolean;
  setPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  snackBar: {
    msg: string;
    open: boolean;
    severity?: "success" | "error";
  };
  openSnackbar: (message: string) => void;
  closeSnackbar: (
    event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => void;
}

const AppContext = React.createContext<AppContextValues | null>(null);

interface Props {
  children?: ReactNode;
}

const AppProvider = ({ children }: Props) => {
  const { snackBar, openSnackbar, closeSnackbar } = useSnackbar();
  const [pageLoading, setPageLoading] = useState(false);
  return (
    <AppContext.Provider
      value={{
        pageLoading,
        setPageLoading,
        snackBar,
        openSnackbar,
        closeSnackbar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext) as AppContextValues;
};

export { AppContext, AppProvider, useGlobalContext };
