import { LoadingButton } from "@mui/lab";
import Iconify from "components/icons/Iconify";

export default function MuiSubmitBtn({
  onSubmit,
  isLoading,
  text="Submit",
  btnProps,
  icon = "tabler:hand-click",
}) {
  return (
    <>
      <LoadingButton
        onClick={onSubmit}
        variant="contained"
        startIcon={<Iconify icon={icon} />}
        loading={isLoading}
        {...btnProps}
      >
        {text}
      </LoadingButton>
    </>
  );
}
