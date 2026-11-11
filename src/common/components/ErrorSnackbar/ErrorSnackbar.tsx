import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppSelector, useAppDispatch } from "@/common/hooks";
import { selectAppError, setAppErrorAC } from "@/app/app-slice";

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectAppError);
  const dispatch = useAppDispatch();

  const handleClose = (
    _event?: React.SyntheticEvent | Event | null,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    dispatch(setAppErrorAC(null));
  };

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
