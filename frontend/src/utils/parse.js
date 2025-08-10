import dayjs from "dayjs";
import { VALIDATION_MSG } from "values/messages";

export const parseValidationErrors = (errors) => {
  const { error, msg, error_code } = errors.data;
  const errorResponse = {};

  if (error_code === 11000) {
    const match = error.match(/index: (\w+)_1 dup key:/);
    if (match) {
      errorResponse[match[1]] = VALIDATION_MSG.duplicateErr;
    }
  } else {
    // Remove the "user validation failed:" part
    const cleanedMessage = error.replace(`${msg}: `, "");

    // Split by comma to get individual errors
    const errorEntries = cleanedMessage.split(", ");

    // Create an array of error objects
    errorEntries.map((entry) => {
      const [field, message] = entry.split(": ");
      errorResponse[field] = message;
    });
  }

  return errorResponse;
};

export const parseJsonObj = (value) => {
  if (!value) return [];

  return Array.isArray(value) ? value : JSON.parse(value);
};

export const parsePicker = (val, type, format = "YYYY-MM-DD") => {
  if (!val) return null;
  else if (typeof val === "string") return val;

  switch (type) {
    case "date":
      return dayjs(val).format(format);
    case "time":
      return dayjs(val).format("HH:mm");
    default:
      return "";
  }
};

export const convertNestedToPlainObj = (nestedObj) => {
  const plainObj = {};

  const flatten = (obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        flatten(value);
      } else {
        plainObj[key] = value;
      }
    });
  };

  flatten(nestedObj);
  return plainObj;
};


export const isDataArray = (value) => (Array.isArray(value) ? value : []);

export const capitalizeFirstLetter = (str) => {
  if (typeof str !== "string" || !str.length) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const defaultTimeParser = (val) => {
  if (!val) return null;
  else if (typeof val === "string") return val;
  return dayjs(val).format("HH:mm")
}

export const encodeByComma = (val) => {
  return isDataArray(val)
    .map((item) => item.key)
    .join(",");
}