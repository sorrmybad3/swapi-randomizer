import axios, { AxiosError, AxiosResponse } from "axios";
import { BaseResponse } from "../response/base.response";
import { BaseHttpException } from "../exception/exception";

export const handleAxiosError = (error: AxiosError) => {
  let { status = 500, response = {} } = error;
  let { data } = response as AxiosResponse;
  return new BaseResponse(status, data);
};

export const handleUnknownError = (message: string) => {
  return new BaseResponse(500, new BaseHttpException(message));
};

export const handleError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    return handleAxiosError(error);
  } else {
    return handleUnknownError(defaultMessage);
  }
};
