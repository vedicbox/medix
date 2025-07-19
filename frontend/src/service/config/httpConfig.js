import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout_slc } from "store/root-reducer/auth";
import {
  serviceloading_slice,
  snackbar_slice,
} from "store/root-reducer/global";
import { HTTP_STATUS_CODES, SEVERITY_ENUM } from "values/enum";
import { error_msg } from "values/messages";

export const httpConfig = (token) => {
  return fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const access_token = token ? token : localStorage.getItem("access_token");
      if (access_token) {
        headers.set("authorization", `Bearer ${access_token}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  });
};

export const httpMiddlewareBoundary = async (
  dispatch,
  queryFulfilled,
  args = {}
) => {
  const { progress = false } = args;

  if (progress) {
    dispatch(serviceloading_slice(true));
  }
  try {
    const { data } = await queryFulfilled;

    if (progress) {
      dispatch(serviceloading_slice(false));
    }

    if (data.msg) {
      dispatch(
        snackbar_slice({
          severity:
            data.status == HTTP_STATUS_CODES.OK
              ? SEVERITY_ENUM.SUCCESS
              : SEVERITY_ENUM.WARNING,
          msg: data.msg,
        })
      );
    }

    return data?.payload;
  } catch (errObj) {
    if (progress) {
      dispatch(serviceloading_slice(false));
    }

    if (errObj?.error?.status == HTTP_STATUS_CODES.UNAUTHORIZED) {
      dispatch(logout_slc());
    }

    if (errObj.error.data) {
      const status = errObj.error.status;
      let message = errObj.error.data.msg;

      if (status == HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        message = "Validation failed";

      if (!message) {
        message = "Internal Server error";
      }

      dispatch(
        snackbar_slice({
          severity: SEVERITY_ENUM.ERROR,
          msg: message,
        })
      );
    }
    return null;
  }
};

export const onHttpSuccess = (responseObj) => {
  return {
    status: responseObj.status,
    msg: responseObj.msg,
    payload: responseObj.payload,
  };
};
