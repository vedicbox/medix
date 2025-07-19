import ImgReplacer from "components/placeholder/ImgReplacer";
import { useRef, useState } from "react";
import { useLazySearchPatientQuery } from "service/patientService";
import { PLACEHOLDER_MSG } from "values/messages";

const imgDetails = {
  src: "https://cdn-icons-png.flaticon.com/512/9733/9733327.png",
  heading: "Thank you for visit",
};

export default function MovePage() {
  const searchFormRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const [searchPatients, { data, isLoading }] = useLazySearchPatientQuery();

  const handleSearch = (searchVal) => {
    if (searchVal) {
      searchPatients({ searchVal });
      setIsEmpty(false);
    } else {
      alert("Please provide valid search parameters.");
      setIsEmpty(true);
    }
  };

  return (
    <>
      <ImgReplacer {...imgDetails} />
    </>
  );
}
