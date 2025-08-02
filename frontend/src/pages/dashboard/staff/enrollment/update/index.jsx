import { Grid, Paper, Stack, Typography } from "@mui/material";
import CollapsedBreadcrumbs from "components/breadcrumb/CollapsedBreadcrumbs";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import StaffEnrollmentForm from "components/forms/staff/EnrollmentForm";
import EntityAssignForm from "components/forms/staff/EntityAssignForm";
import Iconify from "components/icons/Iconify";
import DisplayContent from "components/placeholder/DisplayContent";
import { DASHBOARD_CRUMB } from "list/breadcrumb-list";
import { useEffect, useRef, useState } from "react";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useEditStaffQuery,
  useUpdateStaffMutation,
} from "service/staffService";
import {
  capitalizeFirstLetter,
  convertNestedToPlainObj,
  parsePicker,
} from "utils/parse";
import { STAFF_FORM_RULES } from "utils/security/ruleBox";
import { useFormValidation } from "utils/security/useFormValidation";
import { validateWhatsapp } from "utils/security/validation";
import { HTTP_STATUS_CODES } from "values/enum";
import { ICON_NAME } from "values/img-links";

export default function EditStaff() {
  const formRef = useRef(null);
  const [processObj, setProcessObj] = useState({});
  const { staffId } = useLocation()?.state || {};

  const navigate = useNavigate();
  const {
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateAll,
    handleErrorUpdate,
  } = useFormValidation(STAFF_FORM_RULES);

  const { data: profData } = useEditStaffQuery({ staffId: staffId });

  const [updateStaffMutation, { isLoading }] = useUpdateStaffMutation();

  const profDefaultData = profData?.payload || {};

  useEffect(() => {
    if (profDefaultData?._id) initDefaultData();
  }, [profDefaultData]);

  const initDefaultData = async () => {
    const parseObj = convertNestedToPlainObj(profDefaultData);

    // Iterate over the entries of the flat default data
    Object.entries(parseObj).forEach(([key, value]) => {
      // Find the input element by name
      const inputElement = formRef.current.elements[key];
      if (inputElement) {
        // Set the value of the input element
        inputElement.value = value;
      }
    });

    let locationObj = {};

    setProcessObj({
      gender: parseObj["gender"],
      roleRef: profDefaultData.userRef?.roleRef?._id,
      dob: parseObj["dob"],
      whatsappPref: parseObj.whatsappPref,
    });

    try {
      // Fetch the country data
      const countries = await GetCountries();
      let countryObj = countries.find((v) => v.name === parseObj["country"]);
      if (countryObj) {
        locationObj["country"] = countryObj;

        // Fetch the state data
        const statelist = await GetState(countryObj.id);
        let stateObj = statelist.find((v) => v.name === parseObj["state"]);
        if (stateObj) {
          locationObj["state"] = stateObj;

          // Fetch the city data
          const citylist = await GetCity(countryObj.id, stateObj.id);
          let cityObj = citylist.find((v) => v.name === parseObj["city"]);
          if (cityObj) {
            locationObj["city"] = cityObj;
          }
        }
      }

      // Set the final processed object
      setProcessObj((prev) => ({
        ...prev,
        ...locationObj,
      }));
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleSubmit = async () => {
    const formData = Object.fromEntries(new FormData(formRef.current));
    formData["staffId"] = profDefaultData._id;
    formData["roleRef"] = processObj["roleRef"]?._id;
    formData["clinicRef"] = processObj["clinicRef"]?._id;
    formData["dob"] = parsePicker(processObj.dob, "date");
    formData["userRef"] = profDefaultData.userRef?._id;
    formData.firstName = capitalizeFirstLetter(formData.firstName);
    formData.lastName = capitalizeFirstLetter(formData.lastName);

    const validateObj = validateWhatsapp(formData);
    if (validateObj) {
      setErrors(validateObj);
      return;
    }

    const isValid = await validateAll(formData);

    if (isValid) {
      let { data, error } = await updateStaffMutation(formData);

      if (data?.status == HTTP_STATUS_CODES.OK) {
        navigate(-1);
      } else if (error?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
        setErrors(error?.data?.payload?.details || {});
      }
    }
  };

  const handleProcessObj = (obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];

    handleErrorUpdate(key, value);
    setProcessObj((prev) => ({ ...prev, ...obj }));
  };

  return (
    <>
      <CollapsedBreadcrumbs breadlist={DASHBOARD_CRUMB.STAFF.EDIT} />
      <Grid container justifyContent="center">
        <Grid size={{ lg: 10, xs: 12 }}>
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
            <Iconify icon={ICON_NAME.UPDATE_ROTATION} />
            <Typography className="f-w-600 text-muted ml-2 f-italic">
              Staff enroll form
            </Typography>
          </Stack>

          <form ref={formRef}>
            <Paper className="p-5">
              <StaffEnrollmentForm
                errors={errors}
                onChange={handleChange}
                onBlur={handleBlur}
                processObj={processObj}
                handleProcessObj={handleProcessObj}
              />
            </Paper>
          </form>
          <DisplayContent valid1={processObj.roleRef != undefined}>
            <div className="mt-3">
              <EntityAssignForm
                errors={errors}
                processObj={processObj}
                handleProcessObj={handleProcessObj}
              />
            </div>
          </DisplayContent>

          <div className="mt-3 text-center">
            <MuiSubmitBtn onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
