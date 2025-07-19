import { VALIDATION_MSG } from "values/messages";
import { parseJsonObj } from "../parse";

export const validateField = (rules, value) => {
  if (!rules) return { status: false };

  const copyRules = { ...rules };

  const props = copyRules.props;
  delete copyRules.props;

  for (const [rule, key] of Object.entries(copyRules)) {

    const errorMsg = rulesCase(rule, { key, value, props });
    if (errorMsg) {
      return { status: true, msg: errorMsg };
    }
  }

  return { status: false };
};

export const validateAll = (rules, credentials, isFormData = false) => {
  return new Promise((resolve, reject) => {
    const errors = {};

    Object.entries(rules).forEach(([field, rule]) => {
      const value = isFormData ? credentials.get(field) : credentials[field];
      const validation = validateField(rule, value);
      if (validation.msg) {
        errors[field] = validation.msg;
      }
    });

    Object.keys(errors).length > 0 ? reject(errors) : resolve(true);
  });
};

const rulesCase = (rule, obj) => {
  switch (rule) {
    case "required":
      return isRequired(obj);
    case "email":
      return isEmail(obj);
    case "name_id":
      return validNameId(obj);
    case "url":
      return isUrl(obj);
    case "numeric":
      return isNumeric(obj);
    case "length":
      return validLength(obj);
    case "maxlength":
      return isMaxLength(obj);
    case "minlength":
      return isMinLength(obj);
    case "maxSize":
      return isMaxSize(obj);
    case "minSize":
      return isMinSize(obj);
    case "alpha":
      return isAlpha(obj);
    case "alphaNumeric":
      return isAlphaNumeric(obj);
    default:
      return null;
  }
};

const validLength = (obj) => {
  const { key, value, props } = obj;
  const { msgVariable, optional } = props;
  if (optional && !isContainValue(value))
    return null;


  return value.trim().length !== key ? formatMessage(VALIDATION_MSG.length, msgVariable) : null;

};

const isMinLength = (obj) => {
  const { key, value, props } = obj;
  const { msgVariable, optional } = props;
  if (optional && !isContainValue(value))
    return null;

  return value?.trim()?.length < key ? formatMessage(VALIDATION_MSG.minlength, msgVariable) : null;
};

const isMaxLength = (obj) => {
  const { key, value, props } = obj;
  const { msgVariable, optional } = props;
  if (optional && !isContainValue(value))
    return null;
  return value?.trim()?.length > key ? formatMessage(VALIDATION_MSG.maxlength, msgVariable) : null;
};

const isMaxSize = (obj) => {
  const { key, value, props } = obj;
  const { msgVariable, optional } = props;
  if (optional && !isContainValue(value))
    return null;
  return parseJsonObj(value).length > key ? formatMessage(VALIDATION_MSG.maxSize, msgVariable) : null;
};

const isMinSize = (obj) => {
  const { key, value, props } = obj;
  const { msgVariable, optional } = props;
  if (optional && !isContainValue(value))
    return null;
  return parseJsonObj(value).length < key ? formatMessage(VALIDATION_MSG.minSize, msgVariable) : null;
};

export const isNumeric = (obj) => {
  const { key, value, props } = obj;
  const { msgVariable, optional } = props;
  if (optional && !isContainValue(value))
    return null;
  const regex = /^[0-9]+$/;
  return regex.test(value) ? null : formatMessage(VALIDATION_MSG.numeric, msgVariable);
};

export const validImg = (obj) => {
  const { key, value, props } = obj;
  const { msgVariable, optional } = props;
  if (optional && !isContainValue(value))
    return null;
  const regex = /\.(jpg|svg|jpeg|png|bmp|gif|webp)$/i;
  return regex.test(value) ? null : formatMessage(VALIDATION_MSG.img, msgVariable);
};

const isUrl = (obj) => {
  const { key, value, props } = obj;
  const { msgVariable, optional } = props;
  if (optional && !isContainValue(value))
    return null;
  const urlRegex = new RegExp(
    "^http(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?$"
  );
  return urlRegex.test(value) ? null : formatMessage(VALIDATION_MSG.url, msgVariable);
};

export const validNameId = (obj) => {
  const { key, value, props } = obj;
  const { msgVariable, optional } = props;
  if (optional && !isContainValue(value))
    return null;

  const regex = /^(?=.{4,20}$)(?![_.0-9])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  return regex.test(value) ? null : formatMessage(VALIDATION_MSG.nameId, msgVariable);
};

const isEmail = (obj) => {
  const { key, value, props } = obj;
  const { msgVariable, optional } = props;
  if (optional && !isContainValue(value))
    return null;
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return regex.test(value) ? null : formatMessage(VALIDATION_MSG.email, msgVariable);
};

const isRequired = (obj) => {
  const { key, value, props } = obj;

  const { msgVariable, optional } = props;

  if (optional && !isContainValue(value))
    return null;

  return isContainValue(value) ? null : formatMessage(VALIDATION_MSG.required, msgVariable);
};


export function formatMessage(template, variables = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => variables[key] || '');
}

export const validateAutocomplete = (oldArr, val) => {
  return val.trim() && !oldArr.includes(val.trim().toLowerCase());
};


export function checkDataDuplication(newFiles, oldFiles, tag = "name") {
  let error = null;

  const filteredFiles = Object.values(newFiles)
    .slice(0, 10)
    .filter((file) => {
      const isDuplicate = oldFiles.some(
        (oldFile) => oldFile[tag] === file[tag]
      );
      if (isDuplicate) {
        error = VALIDATION_MSG.duplicateEntry;
        return false;
      }

      if (!/\.(jpg|svg|jpeg|png|bmp|gif|webp)$/i.test(file.name)) {
        error = VALIDATION_MSG.invalidImageType;
        return false;
      }

      return true;
    });

  if (newFiles.length + oldFiles.length > 10) {
    error = VALIDATION_MSG.maxImageUpload;
  }

  return { filteredFiles, error };
}

const isAlpha = (obj) => {
  const { key, value, props } = obj;
  const { msgVariable, optional } = props;
  if (optional && !isContainValue(value))
    return null;

  const regex = /^[A-Za-z\s]+$/;
  return regex.test(value) ? null : formatMessage(VALIDATION_MSG.alpha, msgVariable);
};

const isAlphaNumeric = (obj) => {
  const { key, value, props } = obj;
  const { msgVariable, optional } = props;
  if (optional && !isContainValue(value))
    return null;

  const regex = /^[A-Za-z0-9\s]+$/;
  return regex.test(value) ? null : formatMessage(VALIDATION_MSG.alphaNumeric, msgVariable);
};

const isContainValue = (value) => {
  const val = value?.toString().trim();
  if (val && val != "-") return true;
  else return false;
}


export const validateWhatsapp = (formData) => {
  if (formData.whatsappPref == 2 && !formData.phone2) {
    return {
      whatsappPref: formatMessage(VALIDATION_MSG.required, {
        label: "Alternate No",
      })
    }
  }
  return null;
};