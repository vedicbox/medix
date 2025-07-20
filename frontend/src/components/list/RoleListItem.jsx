import { Divider, IconButton } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Iconify from "components/icons/Iconify";
import { ICON_NAME } from "values/img-links";

export default function ClassicListItem(props) {
  const { title } = props;
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <IconButton edge="end" aria-label="comments">
            <Iconify icon={ICON_NAME.EDIT} />
          </IconButton>
        }
      >
        <ListItemText primary={title} />
      </ListItem>
      <Divider className="my-2" />
    </>
  );
}
