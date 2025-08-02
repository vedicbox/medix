import Checkbox from "@mui/material/Checkbox";
import { WEEKS_ENUM } from "values/enum";
import MuiAutoComplete from "./MuiAutoComplete";

export default function SelectedWeekField(props) {
  const { error, weeks, handleProcessObj } = props;

  return (
    <>
      <MuiAutoComplete
        name="weekOff"
        label="Select Weeks"
        error={error}
        options={WEEKS_ENUM}
        handleProcessObj={handleProcessObj}
        value={weeks || []}
        placeholder="Select Weeks"
        autoProps={{
          multiple: true,
          disableCloseOnSelect: true,
          getOptionLabel: (option) => option.value || "",
          renderOption: (props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option.value}
              </li>
            );
          },
          renderTags: (tagValue, getTagProps) =>
            tagValue.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <span key={key} {...tagProps} className="f-s-14 ml-1">
                  {option.value}
                  {key < tagValue.length - 1 && ", "}
                </span>
              );
            }),
        }}
      />
    </>
  );
}
