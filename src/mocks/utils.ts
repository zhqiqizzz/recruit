import { HttpResponse } from "msw";

export const success = (data: any) => {
  return HttpResponse.json({
    code: 200,
    success: "ok",
    result: data,
  });
};

export const error = (msg: string = "系统异常") => {
  return HttpResponse.json({
    code: 500,
    success: "fail",
    message: msg,
    result: null,
  });
};
