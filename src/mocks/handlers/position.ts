import { http, delay } from "msw";
import { success } from "@/mocks/utils";

const positionData = [
  {
    id: 1000,
    name: "互联网技术",
    children: [
      { id: 1001, name: "Java", pid: 1000 },
      { id: 1002, name: "C++", pid: 1000 },
      { id: 1003, name: "PHP", pid: 1000 },
      { id: 1004, name: "Python", pid: 1000 },
      { id: 1005, name: "前端工程师", pid: 1000 },
      { id: 1006, name: "iOS", pid: 1000 },
      { id: 1007, name: "Android", pid: 1000 },
      { id: 1008, name: "Go语言", pid: 1000 },
      { id: 1009, name: "全栈工程师", pid: 1000 },
      { id: 1010, name: "测试工程师", pid: 1000 },
      { id: 1011, name: "自动化测试", pid: 1000 },
      { id: 1012, name: "运维工程师", pid: 1000 },
      { id: 1013, name: "DBA", pid: 1000 },
      { id: 1014, name: "架构师", pid: 1000 },
      { id: 1015, name: "算法工程师", pid: 1000 },
      { id: 1016, name: "数据挖掘", pid: 1000 },
      { id: 1017, name: "人工智能", pid: 1000 },
      { id: 1018, name: "区块链", pid: 1000 },
    ],
  },
  {
    id: 2000,
    name: "产品/设计",
    children: [
      { id: 2001, name: "产品经理", pid: 2000 },
      { id: 2002, name: "网页产品经理", pid: 2000 },
      { id: 2003, name: "移动产品经理", pid: 2000 },
      { id: 2004, name: "数据产品经理", pid: 2000 },
      { id: 2005, name: "电商产品经理", pid: 2000 },
      { id: 2006, name: "产品助理", pid: 2000 },
      { id: 2007, name: "UI设计师", pid: 2000 },
      { id: 2008, name: "平面设计师", pid: 2000 },
      { id: 2009, name: "交互设计师", pid: 2000 },
      { id: 2010, name: "插画师", pid: 2000 },
      { id: 2011, name: "视觉设计", pid: 2000 },
      { id: 2012, name: "用户研究员", pid: 2000 },
    ],
  },
  {
    id: 3000,
    name: "运营/编辑",
    children: [
      { id: 3001, name: "用户运营", pid: 3000 },
      { id: 3002, name: "产品运营", pid: 3000 },
      { id: 3003, name: "新媒体运营", pid: 3000 },
      { id: 3004, name: "活动运营", pid: 3000 },
      { id: 3005, name: "社群运营", pid: 3000 },
      { id: 3006, name: "内容运营", pid: 3000 },
      { id: 3007, name: "电商运营", pid: 3000 },
      { id: 3008, name: "视频剪辑", pid: 3000 },
      { id: 3009, name: "文案策划", pid: 3000 },
      { id: 3010, name: "主编/副主编", pid: 3000 },
    ],
  },
  {
    id: 4000,
    name: "市场/销售",
    children: [
      { id: 4001, name: "销售专员", pid: 4000 },
      { id: 4002, name: "销售经理", pid: 4000 },
      { id: 4003, name: "大客户销售", pid: 4000 },
      { id: 4004, name: "商务渠道", pid: 4000 },
      { id: 4005, name: "市场推广", pid: 4000 },
      { id: 4006, name: "品牌公关", pid: 4000 },
      { id: 4007, name: "网络营销", pid: 4000 },
      { id: 4008, name: "SEO/SEM", pid: 4000 },
    ],
  },
  {
    id: 5000,
    name: "财务/行政",
    children: [
      { id: 5001, name: "人力资源", pid: 5000 },
      { id: 5002, name: "招聘专员", pid: 5000 },
      { id: 5003, name: "HRBP", pid: 5000 },
      { id: 5004, name: "行政前台", pid: 5000 },
      { id: 5005, name: "行政总监", pid: 5000 },
      { id: 5006, name: "会计", pid: 5000 },
      { id: 5007, name: "出纳", pid: 5000 },
      { id: 5008, name: "财务总监", pid: 5000 },
      { id: 5009, name: "法务", pid: 5000 },
    ],
  },
  {
    id: 6000,
    name: "金融/保险",
    children: [
      { id: 6001, name: "投资经理", pid: 6000 },
      { id: 6002, name: "风控", pid: 6000 },
      { id: 6003, name: "证券分析师", pid: 6000 },
      { id: 6004, name: "保险经纪人", pid: 6000 },
      { id: 6005, name: "信贷管理", pid: 6000 },
      { id: 6006, name: "银行柜员", pid: 6000 },
    ],
  },
  {
    id: 7000,
    name: "教育/培训",
    children: [
      { id: 7001, name: "教师", pid: 7000 },
      { id: 7002, name: "教务管理", pid: 7000 },
      { id: 7003, name: "课程顾问", pid: 7000 },
      { id: 7004, name: "培训讲师", pid: 7000 },
      { id: 7005, name: "早教老师", pid: 7000 },
    ],
  },
  {
    id: 8000,
    name: "医疗/健康",
    children: [
      { id: 8001, name: "医生", pid: 8000 },
      { id: 8002, name: "护士", pid: 8000 },
      { id: 8003, name: "药剂师", pid: 8000 },
      { id: 8004, name: "医疗器械销售", pid: 8000 },
    ],
  },
  {
    id: 9000,
    name: "采购/贸易",
    children: [
      { id: 9001, name: "采购专员", pid: 9000 },
      { id: 9002, name: "外贸专员", pid: 9000 },
      { id: 9003, name: "报关员", pid: 9000 },
      { id: 9004, name: "供应链管理", pid: 9000 },
    ],
  },
  {
    id: 1100,
    name: "服务业",
    children: [
      { id: 1101, name: "店长", pid: 1100 },
      { id: 1102, name: "服务员", pid: 1100 },
      { id: 1103, name: "厨师", pid: 1100 },
      { id: 1104, name: "导游", pid: 1100 },
      { id: 1105, name: "安保", pid: 1100 },
    ],
  },
];

export const positionHandlers = [
  http.get("/api/position/type", async () => {
    await delay(300);
    return success(positionData);
  }),
];
