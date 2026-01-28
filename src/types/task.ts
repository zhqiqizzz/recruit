export interface taskItem {
  task_id: number;
  task_name: string;
  position_name: string;
  salary: number;
  task_cycle: number;
  service_mode: string;
  task_ask: string;
  task_grade: string | null;
  isdelete: number;
  is_check: number;
  company_name: string | null;
  city: string | null;
  area: string | null;
  it_head: string | null;
  is_emergency: number; // 1 是紧急，0 是普通
  status: number;
  logo: string;
  head_img: string;
  user_id: number; // 发布人ID
  user_name: string | null; // 发布人名字
}

export interface taskListRes {
  records: taskItem[];
  count: number;
  page: number;
  pageSize: number;
}
