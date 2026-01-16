import request from "@/utils/request";
export function getTaskList(data: any) {
  return request({
    url: "/task/list",
    data,
  });
}
