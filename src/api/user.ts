import request from "@/utils/request";

interface CodeRes {
  code: string;
}

interface PolicyRes {
  content: string;
}
// 获取验证码
export function getCode(data: any) {
  return request({
    url: "/login/code",
    method: "post",
    data,
  }) as Promise<CodeRes>;
}

// 登录
export function login(data: any) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

// 协议文件
export function getPolicy(data: any) {
  return request({
    url: "/policy_protocol/list",
    method: "get",
    params: data,
  }) as Promise<PolicyRes>;
}

export function getUserDetailApi(userId: any) {
  return request({
    url: `/user/detail/${userId}`,
    method: "get",
  });
}
