import { Grid } from "@mui/material";
import MuiDatePicker from "components/textfield/MuiDateField";
import MuiTimePicker from "components/textfield/MuiTimeField";
import { helpertext_msg } from "values/messages";
import FormHeading from "../element/FormHeading";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";

export default function CrudMeetingForm(props) {
  const { errors, handleProcessObj, formObj } = props;

  return (
    <>
      <FormHeading title="Meeting Details" icon="fluent-emoji:information">
        <Grid container spacing={3}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <div>
                <MuiDatePicker
                  label="Date From"
                  //helperText={helpertext_msg.defaultText}
                  handleProcessObj={handleProcessObj}
                  name="dtFrom"
                  value={handleProcessObj["dtFrom"]}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <MuiDatePicker
                  label="Date To"
                  //helperText={helpertext_msg.defaultText}
                  handleProcessObj={handleProcessObj}
                  name="dtTo"
                  value={handleProcessObj["dtTo"]}
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <MuiTimePicker
                  label="Meeting From"
                  //helperText={helpertext_msg.defaultText}
                  value={handleProcessObj["meetingFrom"]}
                  handleProcessObj={handleProcessObj}
                  name="meetingFrom"
                />
              </div>
            </Grid>
            <Grid size={6}>
              <div>
                <MuiTimePicker
                  label="Meeting To"
                  //elperText={helpertext_msg.defaultText}
                  value={handleProcessObj["meetingTo"]}
                  handleProcessObj={handleProcessObj}
                  name="meetingTo"
                />
              </div>
            </Grid>
          </Grid>
        </Grid>

      </FormHeading>
    </>
  );
}
