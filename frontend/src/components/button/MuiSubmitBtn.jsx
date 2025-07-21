import { Button } from "@mui/material";
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
      <Button
        onClick={onSubmit}
        variant="contained"
        startIcon={<Iconify icon={icon} />}
        loading={isLoading}
        {...btnProps}
      >
        {text}
      </Button>
    </>
  );
}
