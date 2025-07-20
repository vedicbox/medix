import { Grid, Paper } from "@mui/material";
import MuiAutoComplete from "components/mui/MuiAutoComplete";
import MuiTextField from "components/mui/MuiTextField";
import DisplayContent from "components/placeholder/DisplayContent";
import ImgReplacer from "components/placeholder/ImgReplacer";
import { PAYMENT_OPTIONS } from "list/optionsList";
import { PLACEHOLDER_IMG } from "values/img-links";

const imgDetails = {
  src: PLACEHOLDER_IMG.COLLECT_FEE,
};

export default function ConsultFeeForm(props) {
  const {
    formRef,
    doclist,
    processObj,
    handleProcessObj,
    errors,
    onChange,
    onBlur,
  } = props;

  return (
    <form ref={formRef}>
      <Grid container>
        <Grid size={{ xl: 4, xs: 12 }}>
          <Paper
            sx={{
              border: "1px solid #ccc",
              borderRadius: "50%",
              width: 150,
              height: 150,
              mx: "auto",
            }}
            elevation={3}
          >
            <ImgReplacer {...imgDetails} />
          </Paper>
        </Grid>
        <Grid size={{ xl: 8, xs: 12 }}>
          <div className="mt-2">
            <MuiTextField
              error={errors.fee}
              label="Consultation Fee"
              textProps={{
                name: "fee",
                placeholder: "XXXXX",
                onChange,
                onBlur,
                slotProps: { htmlInput: { maxLength: 3 } }
              }}

            />
          </div>
          <div className="mt-3">
            <MuiAutoComplete
              name="payMode"
              label="Payment Mode"
              error={errors.payMode}
              options={PAYMENT_OPTIONS}
              handleProcessObj={handleProcessObj}
              value={processObj["payMode"] || ""}
              placeholder="Select Pay Mode"
              autoProps={{
                getOptionLabel: (option) => option.method || "",
              }}
            />
          </div>
        </Grid>
      </Grid>

      <DisplayContent
        valid1={processObj["payMode"] && processObj["payMode"]?.tag !== "cash"}
      >
        <div className="mt-3">
          <MuiTextField
            label="Transaction Id"
            error={errors.transId}
            textProps={{
              name: "transId",
              placeholder: "Transaction Id",
              onChange,
              onBlur,
            }}
          />
        </div>
      </DisplayContent>

      <div className="mt-3">
        <MuiAutoComplete
          name="assignDoc"
          label="Assign Doctor"
          options={doclist}
          error={errors.assignDoc}
          handleProcessObj={handleProcessObj}
          value={processObj["assignDoc"] || ""}
          placeholder="Select Pay Mode"
          autoProps={{
            getOptionLabel: (option) => option.name || "",
          }}
        />
      </div>
    </form>
  );
}
