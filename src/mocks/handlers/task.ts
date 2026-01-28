import { delay, http } from "msw";
import { db } from "@/mocks/db";
import { success, error } from "@/mocks/utils";

export const taskHandlers = [
  http.get("/api/banner/list", ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    if (!type) {
      return error("参数错误：必须传入 type");
    }
    const list = db.banner.findMany({
      where: {
        type: { equals: Number(type) },
        isdelete: { equals: 0 },
      },
      orderBy: { sort: "desc" },
    });
    return success({
      list: list,
      count: list.length,
      page: 1,
      pageSize: 10,
    });
  }),

  http.get("/api/task/taskList", async ({ request }) => {
    await delay(500);

    // 获取 URL 上的查询参数
    const url = new URL(request.url);
    const pageNum = Number(url.searchParams.get("pageNum") || 1);
    const pageSize = Number(url.searchParams.get("pageSize") || 10);
    const city = url.searchParams.get("city");
    const positionName = url.searchParams.get("position_name");
    const serviceMode = url.searchParams.get("service_mode");
    const taskCycle = url.searchParams.get("task_cycle");
    const salary = url.searchParams.get("salary");

    // 开始过滤数据
    let filteredList = db.taskItem.getAll();
    // 城市筛选
    if (city) {
      filteredList = filteredList.filter((item: any) => {
        return item.city && item.city === city;
      });
    }
    // 职位类型筛选
    if (positionName && positionName !== "全部") {
      filteredList = filteredList.filter((item: any) =>
        item.position_name?.includes(positionName)
      );
    }
    // 服务方式筛选
    if (serviceMode) {
      filteredList = filteredList.filter(
        (item: any) => item.service_mode === serviceMode
      );
    }
    // 任务周期筛选
    if (taskCycle) {
      // 简单匹配，实际可能需要区间判断
      filteredList = filteredList.filter(
        (item: any) => String(item.task_cycle) === taskCycle
      );
    }

    if (salary) {
      const parts = salary.split("-");
      if (parts.length === 2) {
        const minSalary = Number(parts[0]);
        const maxSalary = Number(parts[1]);
        filteredList = filteredList.filter(
          (item: any) => item.salary >= minSalary && item.salary <= maxSalary
        );
      }
    }

    // 处理分页逻辑
    const total = filteredList.length;
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageList = filteredList.slice(startIndex, endIndex);

    return success({
      records: pageList,
      count: total,
      page: pageNum,
      pageSize: pageSize,
    });
  }),

  http.get("/api/task/screen", async () => {
    await delay(200);
    return success({
      // 模拟从数据库 dict 表里查出来的数据
      serviceMode: [
        { label: "驻场", value: "驻场" },
        { label: "远程", value: "远程" },
        { label: "全职", value: "全职" },
      ],
      taskCycle: [
        { label: "7天", value: 7 },
        { label: "15天", value: 15 },
        { label: "30天", value: 30 },
        { label: "60天", value: 60 },
        { label: "90天", value: 90 },
      ],
      salary: [
        { label: "3k以下", value: "0-3000" },
        { label: "3k-5k", value: "3000-5000" },
        { label: "5k-10k", value: "5000-10000" },
        { label: "10k-15k", value: "10000-15000" },
        { label: "15k-20k", value: "15000-20000" },
        { label: "20k以上", value: "20000-999999" },
      ],
    });
  }),

  http.get("/api/task/detail/:taskId", async ({ params }) => {
    await delay(300);
    const { taskId } = params;

    const task = db.taskItem.findFirst({
      where: {
        task_id: {
          equals: Number(taskId),
        },
      },
    });
    return success(task);
  }),

  http.get("/api/task/companySource/:userId", async ({ params }) => {
    await delay(500);
    const { userId } = params;

    if (!userId) return success([]);
    const list = db.taskItem.findMany({
      where: {
        user_id: {
          equals: Number(userId),
        },
      },
    });

    return success(list);
  }),
];
