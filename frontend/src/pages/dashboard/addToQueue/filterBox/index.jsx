import { Button, ButtonGroup, Grid } from "@mui/material";
import Iconify from "components/icons/Iconify";

export default function AddQueueFilterBox() {
  return (
    <Grid container className="mb-2">
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ButtonGroup variant="outlined" size="large" className="elevation1">
          <Button
            startIcon={
              <Iconify icon="streamline-freehand-color:waiting-room-clock" />
            }
            elevation={4}
          >
            Pending | <span className=" f-w-600 ml-2">32</span>
          </Button>
          <Button
            startIcon={
              <Iconify icon="streamline-ultimate-color:single-man-actions-check-1" />
            }
          >
            Ready | <span className=" f-w-600 ml-2">2</span>
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
