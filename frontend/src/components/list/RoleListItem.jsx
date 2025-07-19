import { Divider, IconButton } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Iconify from "components/icons/Iconify";

export default function ClassicListItem(props) {
  const { title } = props;
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <IconButton edge="end" aria-label="comments">
            <Iconify icon="tabler:edit" />
          </IconButton>
        }
      >
        <ListItemText primary={title} />
      </ListItem>
      <Divider className="my-2" />
    </>
  );
}
