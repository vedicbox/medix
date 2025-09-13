import { Grid } from "@mui/material";
import MuiDatePicker from "components/mui/MuiDateField";
import MuiTimePicker from "components/mui/MuiTimePicker";

export default function CrudMeetingForm(props) {
  const { processObj, handleProcessObj, errors } = props;

  return (
    <>
      <Grid container spacing={3}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <div>
              <MuiDatePicker
                label="Date From"
                handleProcessObj={handleProcessObj}
                name="dtFrom"
                value={processObj["dtFrom"]}
                error={errors.dtFrom}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div>
              <MuiDatePicker
                label="Date To"
                handleProcessObj={handleProcessObj}
                name="dtTo"
                value={processObj["dtTo"]}
                error={errors.dtTo}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div>
              <MuiTimePicker
                label="Meeting From"
                value={processObj["meetingFrom"]}
                handleProcessObj={handleProcessObj}
                name="meetingFrom"
                error={errors.meetingFrom}
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div>
              <MuiTimePicker
                label="Meeting To"
                value={processObj["meetingTo"]}
                handleProcessObj={handleProcessObj}
                name="meetingTo"
                error={errors.meetingTo}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
