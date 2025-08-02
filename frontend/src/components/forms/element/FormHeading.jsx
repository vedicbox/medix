import { IconButton, Stack, Typography } from "@mui/material";
import Iconify from "components/icons/Iconify";
import DisplayContent from "components/placeholder/DisplayContent";

export default function FormHeading(props) {
  const { title, icon, action } = props;

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        bgcolor: (theme) => theme.palette.primary[50],
        p: "10px",
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        border: "1px solid #ccc",
      }}
    >
      <Iconify icon={icon} />
      <Typography className="f-w-600 text-muted ml-2 f-italic">
        {title}
      </Typography>

      <DisplayContent valid1={!!action}>
        <IconButton size="small" onClick={action?.onClick} className="ml-auto">
          <Iconify icon={action?.icon} />
        </IconButton>
      </DisplayContent>
    </Stack>
  );
}
