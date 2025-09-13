import { Box, Paper } from "@mui/material";
import PatientSearchCard from "components/card/PatientSearchCard";
import SearchField from "components/mui/SearchField";
import DisplayContent from "components/placeholder/DisplayContent";
import ImgReplacer from "components/placeholder/ImgReplacer";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLazySearchPatientQuery } from "service/patientService";
import { snackbar_slice } from "store/root-reducer/global";
import { SEARCH_FIELD_RULE } from "utils/security/ruleBox";
import { validateField } from "utils/security/validation";
import { SEVERITY_ENUM } from "values/enum";
import { PLACEHOLDER_IMG } from "values/img-links";
import { PLACEHOLDER_MSG } from "values/messages";

function SearchPage() {
  const searchFormRef = useRef(null);
  const dispatch = useDispatch();
  const [isEmpty, setIsEmpty] = useState(true);
  const [searchPatients, { data, isLoading }] = useLazySearchPatientQuery();

  const handleSearch = useCallback(
    (searchVal) => {
      const validate = validateField(SEARCH_FIELD_RULE["phone"], searchVal);
      if (validate.status) {
        dispatch(
          snackbar_slice({
            severity: SEVERITY_ENUM.WARNING,
            msg: validate.msg,
          })
        );

        setIsEmpty(true);

        return;
      }

      if (searchVal) {
        searchPatients({ searchVal });
        setIsEmpty(false);
      }
    },
    [dispatch, searchPatients]
  );

  const patientCards = useMemo(
    () =>
      data?.payload?.map((itemObj) => (
        <div key={itemObj.caseId} className="mb-3">
          <PatientSearchCard itemObj={itemObj} />
        </div>
      )) || null,
    [data?.payload]
  );

  const showPlaceholder = !data?.payload?.length || isEmpty;

  return (
    <>
      <SearchField
        placeholder="Enter Phone No..."
        formRef={searchFormRef}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />
      <div className="mt-3">
        <DisplayContent
          valid1={!showPlaceholder}
          content={
            <Paper className="py-5 px-4" variant="outlined">
              <ImgReplacer
                src={PLACEHOLDER_IMG.SEARCH_PATIENT}
                heading={PLACEHOLDER_MSG.SEARCH_PATIENT}
              />
            </Paper>
          }
        >
          <Box sx={{ minHeight: 250 }}>{patientCards}</Box>{" "}
        </DisplayContent>
      </div>
    </>
  );
}

export default SearchPage;
