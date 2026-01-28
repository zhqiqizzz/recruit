import request from "@/utils/request";
import type { taskListRes, taskItem } from "@/types/task";
interface bannerListRes {
  list: Array<any>;
}
export interface ScreenDictItem {
  label: string;
  value: string;
}

export interface ScreenData {
  serviceMode: ScreenDictItem[];
  taskCycle: ScreenDictItem[];
  salary: ScreenDictItem[];
}

export function getTaskListApi(data: any) {
  return request({
    url: "/task/taskList",
    method: "get",
    params: data,
  }) as Promise<taskListRes>;
}

export function getBannerListApi(type: any) {
  return request({
    url: "/banner/list",
    params: type,
  }) as Promise<bannerListRes>;
}

export function getCityListApi() {
  return request({
    url: "/sys/city/list",
  });
}

export function getPositionTypeApi() {
  return request({
    url: "/position/type",
  });
}

export function getTaskScreenApi() {
  return request({
    url: "/task/screen",
  }) as Promise<ScreenData>;
}

export function getTaskDetailApi(taskId: any) {
  return request({
    url: `/task/detail/${taskId}`,
    method: "get",
  }) as Promise<taskItem>;
}

// 传入发布者id
export function getCompanySourceApi(userId: any) {
  return request({
    url: `/task/companySource/${userId}`,
    method: "get",
  }) as Promise<any>;
}
