import request from "@/utils/request";
// 任务列表接口
export function getTaskListApi(data: any) {
  return request({
    url: "/task/taskAllList",
    method: "get",
    params: data,
  }) as Promise<any>;
}

// banner列表接口
export function getBannerListApi(type: any) {
  return request({
    url: "/banner/list",
    params: type,
  }) as Promise<any>;
}

// 城市列表接口
export function getCityListApi() {
  return request({
    url: "/sys/city/list",
  });
}

// 职位类型列表接口
export function getPositionTypeApi() {
  return request({
    url: "/position/positionTypeApi",
  });
}

// 筛选列表接口
export function getTaskScreenApi() {
  return request({
    url: "/task/getTaskAll",
  }) as Promise<any>;
}

// 任务详情接口
export function getTaskDetailApi(taskId: any) {
  return request({
    url: '/task/getTaskDetails',
    method: "get",
    params: {task_id: taskId},
  }) as Promise<any>;
}

// 热门搜索接口
export function getHotSearchApi(type: any) {
  return request({
    url: "/position/public/getHotSeach",
    params: type,
  }) as Promise<any>;
}

// 收藏接口
export function getCollectionApi(data: any) {
  return request({
    url: "/course/TaskCollection",
    method: "post",
    data,
  }) as Promise<any>;
}
