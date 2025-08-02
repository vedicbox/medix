import { Grid, Paper, Stack, Typography } from "@mui/material";
import CityAutoField from "components/autocomplete/CityAutoField";
import CountryAutoField from "components/autocomplete/CountryAutoField";
import StateAutoField from "components/autocomplete/StateAutoField";
import Iconify from "components/icons/Iconify";
import MuiTextField from "components/mui/MuiTextField";
import MuiTimePicker from "components/mui/MuiTimeField";
import SelectedWeekField from "components/mui/SelectedWeek";
import { useEffect } from "react";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import { WEEKS_ENUM } from "values/enum";

export default function CrudClinicForm(props) {
  const { formRef, errors, processObj, setProcessObj, defaultData } = props;

  const handleProcessObj = (keyObj) => {
    setProcessObj({
      ...processObj,
      ...keyObj,
    });
  };

  const handleMultipleUpdate = (obj, name, newValue) => {
    handleProcessObj(obj);
  };

  const handleWeekOff = (e, newVal) => {
    handleProcessObj({ weekOff: newVal });
  };

  const initDefaultData = async () => {
    // Iterate over the entries of the flat default data
    Object.entries(defaultData).forEach(([key, value]) => {
      // Find the input element by name
      const inputElement = formRef.current.elements[key];
      if (inputElement) {
        // Set the value of the input element
        inputElement.value = value;
      }
    });

    let locationObj = {};

    try {
      // Fetch the country data
      const countries = await GetCountries();
      let countryObj = countries.find((v) => v.name === defaultData["country"]);
      if (countryObj) {
        locationObj["country"] = countryObj;

        // Fetch the state data
        const statelist = await GetState(countryObj.id);
        let stateObj = statelist.find((v) => v.name === defaultData["state"]);
        if (stateObj) {
          locationObj["state"] = stateObj;

          // Fetch the city data
          const citylist = await GetCity(countryObj.id, stateObj.id);
          let cityObj = citylist.find((v) => v.name === defaultData["city"]);
          if (cityObj) {
            locationObj["city"] = cityObj;
          }
        }
      }

      const defaultWeeks = defaultData.weekOff || "";

      // Set the final processed object
      setProcessObj({
        ...locationObj,
        status: defaultData.status,
        shiftFrom: defaultData.shiftFrom,
        shiftTo: defaultData.shiftTo,
        weekOff: WEEKS_ENUM.filter((item) => defaultWeeks.includes(item.key)),
      });
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  useEffect(() => {
    if (defaultData?.id) initDefaultData();
  }, [defaultData]);

  return (
    <form ref={formRef}>
      <Stack
        direction="row"
        sx={{
          bgcolor: (theme) => theme.palette.primary[50],
          p: "10px",
          borderBottomLeftRadius: 10,
          borderTopRightRadius: 10,
          mb: "5px",
          border: "1px solid #ccc",
        }}
      >
        <Iconify icon="fluent-emoji:information" />
        <Typography className="f-w-600 text-muted ml-2 f-italic">
          Personal Details
        </Typography>
      </Stack>
      <Paper className="p-4 mb-3">
        <Grid container spacing={3}>
          <Grid size={6}>
            <MuiTextField
              label="Clinic Name"
              name="name"
              error={errors["name"]}
              textProps={{
                name: "name",
                placeholder: "Abc Clinic",
              }}
            />
          </Grid>
          <Grid size={6}>
            <MuiTextField
              label="GST No."
              error={errors["gstNo"]}
              textProps={{
                name: "gstNo",
                placeholder: "XXXXX",
              }}
            />
          </Grid>
          <Grid size={12}>
            <MuiTextField
              label="Description"
              name="shortDesc"
              error={errors["shortDesc"]}
              textProps={{
                name: "shortDesc",
                rows: 2,
                multiline: true,
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Stack
        direction="row"
        sx={{
          bgcolor: (theme) => theme.palette.primary[50],
          p: "10px",
          borderBottomLeftRadius: 10,
          borderTopRightRadius: 10,
          mb: "5px",
          border: "1px solid #ccc",
        }}
      >
        <Iconify icon="flat-color-icons:business-contact" />
        <Typography className="f-w-600 text-muted ml-2 f-italic">
          Contact Details
        </Typography>
      </Stack>
      <Paper className="p-4 mb-3">
        <Grid container spacing={3}>
          <Grid size={12}>
            <MuiTextField
              label="Clinic Email"
              error={errors["email"]}
              textProps={{
                name: "email",
                placeholder: "clinic@gmail.com",
              }}
            />
          </Grid>
          <Grid size={6}>
            <MuiTextField
              label="Phone No"
              error={errors["phone1"]}
              textProps={{
                name: "phone1",
                placeholder: "999999999",
              }}
            />
          </Grid>
          <Grid size={6}>
            <MuiTextField
              label="Alternate No"
              error={errors["phone2"]}
              textProps={{
                name: "phone2",
                placeholder: "999999999",
              }}
            />
          </Grid>
          <Grid size={6}>
            <CountryAutoField
              name="country"
              error={errors["country"]}
              selectedVal={processObj["country"]}
              onChange={handleMultipleUpdate}
            />
          </Grid>
          <Grid size={6}>
            <StateAutoField
              name="state"
              error={errors["state"]}
              country={processObj["country"]}
              selectedVal={processObj["state"]}
              onChange={handleMultipleUpdate}
            />
          </Grid>
          <Grid size={6}>
            <CityAutoField
              name="city"
              error={errors["city"]}
              state={processObj["state"]}
              country={processObj["country"]}
              selectedVal={processObj["city"]}
              onChange={handleMultipleUpdate}
            />
          </Grid>
          <Grid size={6}>
            <div>
              <MuiTextField
                label="Pincode"
                error={errors["pincode"]}
                textProps={{
                  name: "pincode",
                }}
              />
            </div>
          </Grid>
          <Grid size={12}>
            <div>
              <MuiTextField
                label="Address"
                error={errors["address"]}
                textProps={{
                  name: "address",
                  rows: 2,
                  multiline: true,
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>

      <Stack
        direction="row"
        sx={{
          bgcolor: (theme) => theme.palette.primary[50],
          p: "10px",
          borderBottomLeftRadius: 10,
          borderTopRightRadius: 10,
          mb: "5px",
          border: "1px solid #ccc",
        }}
      >
        <Iconify icon="openmoji:timer" />
        <Typography className="f-w-600 text-muted ml-2 f-italic">
          Timing Details
        </Typography>
      </Stack>
      <Paper className="p-4 mb-3">
        <Grid container spacing={2}>
          <Grid size={6}>
            <div>
              <MuiTimePicker
                label="Shift From"
                value={processObj["shiftFrom"]}
                handleProcessObj={handleProcessObj}
                name="shiftFrom"
              />
            </div>
          </Grid>
          <Grid size={6}>
            <div>
              <MuiTimePicker
                label="Shift To"
                value={processObj["shiftTo"]}
                handleProcessObj={handleProcessObj}
                name="shiftTo"
              />
            </div>
          </Grid>

          <Grid size={12}>
            <div>
              <SelectedWeekField
                weeks={processObj["weekOff"]}
                handleWeekChange={handleWeekOff}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}
