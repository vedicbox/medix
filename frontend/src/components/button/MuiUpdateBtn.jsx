import { LoadingButton } from "@mui/lab";
import Iconify from "components/icons/Iconify";

export default function MuiUpdateBtn({ onSubmit,isLoading }) {
  return (
    <div className="text-right">
      <LoadingButton
        onClick={onSubmit}
        variant="contained"
        startIcon={<Iconify icon="dashicons:update" />}
        loading={isLoading}
      >
        Update
      </LoadingButton>
    </div>
  );
}
