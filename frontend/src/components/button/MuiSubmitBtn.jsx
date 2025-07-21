import { LoadingButton } from "@mui/lab";
import Iconify from "components/icons/Iconify";
import { ICON_NAME } from "values/img-links";

export default function MuiSubmitBtn({
  onSubmit,
  isLoading,
  text = "Submit",
  btnProps,
  icon = ICON_NAME.SUBMIT,
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
