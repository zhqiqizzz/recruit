import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/task",
  },
  {
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: "/login/serviceAgree",
    component: () => import("@/views/Login/serviceAgree.vue"),
  },
  {
    path: "/login/privacyPolicy",
    component: () => import("@/views/Login/privacyPolicy.vue"),
  },
  {
    path: "/task",
    component: () => import("@/views/Task/index.vue"),
  },
  {
    path: "/task/city/list",
    component: () => import("@/views/Task/Components/CitySwitch.vue"),
    meta: {
      title: "城市切换",
    },
  },
  {
    path: "/task/position/type",
    component: () => import("@/views/Task/Components/PositionType.vue"),
    meta: {
      title: "职位筛选",
    },
  },
  {
    path: "/task/taskList",
    component: () => import("@/components/list/TaskList.vue"),
  },
  {
    path: "/task/screen",
    component: () => import("@/views/Task/Components/Screen.vue"),
  },
  {
    path: "/task/search",
    component: () => import("@/views/Task/search.vue"),
  },
  {
    path: "/task/details/:id",
    component: () => import("@/views/Task/details.vue"),
  },
  {
    path: "/task/companySource/:id",
    component: () => import("@/views/Task/companySource.vue"),
  },
  {
    path: "/contract",
    component: () => import("@/views/Contract/index.vue"),
  },
  {
    path: "/contract/details/:id",
    component: () => import("@/views/Contract/details.vue"),
  },
  {
    path: "/contract/progress/:id",
    component: () => import("@/views/Contract/progress.vue"),
  },
  {
    path: "/message",
    component: () => import("@/views/Message/index.vue"),
  },
  {
    path: "/message/systemList",
    component: () => import("@/views/Message/systemList.vue"),
  },
  {
    path: "/message/systemDetails/:id",
    component: () => import("@/views/Message/systemDetails.vue"),
  },
  {
    path: "/message/talk/:taskId/:userId",
    component: () => import("@/views/Message/talk.vue"),
  },
  {
    path: "/message/talent/:resumeId/:userId",
    component: () => import("@/views/Message/talent.vue"),
  },
  {
    path: "/my",
    component: () => import("@/views/My/index.vue"),
  },
  {
    path: "/my/user",
    component: () => import("@/views/My/User/index.vue"),
  },
  {
    path: "/my/user/authReal",
    component: () => import("@/views/My/User/authReal.vue"),
  },
  {
    path: "/my/user/certified",
    component: () => import("@/views/My/User/certified.vue"),
  },
  {
    path: "/my/company/authReal",
    component: () => import("@/views/My/Company/authReal.vue"),
  },
  {
    path: "/my/company/certified",
    component: () => import("@/views/My/Company/certified.vue"),
  },
  {
    path: "/my/user/identitySwitch",
    component: () => import("@/views/My/User/identitySwitch.vue"),
  },
  {
    path: "/my/set",
    component: () => import("@/views/My/Set/index.vue"),
  },
  {
    path: "/my/feedback",
    component: () => import("@/views/My/Feedback/index.vue"),
  },
  {
    path: "/my/account",
    component: () => import("@/views/My/Account/index.vue"),
  },
  {
    path: "/my/account/advance",
    component: () => import("@/views/My/Account/advance.vue"),
  },
  {
    path: "/my/account/coinExplain",
    component: () => import("@/views/My/Account/coinExplain.vue"),
  },
  {
    path: "/my/account/depositExplain",
    component: () => import("@/views/My/Account/depositExplain.vue"),
  },
  {
    path: "/my/resume",
    component: () => import("@/views/My/Resume/index.vue"),
  },
  {
    path: "/my/resume/preview",
    component: () => import("@/views/My/Resume/preview.vue"),
  },
  {
    path: "/my/contract/:id",
    component: () => import("@/views/My/Contract/index.vue"),
  },
  {
    path: "/my/contract/add",
    component: () => import("@/views/My/Contract/add.vue"),
  },
  {
    path: "/my/collect",
    component: () => import("@/views/My/Collect/index.vue"),
  },
  {
    path: "/my/collect/talent",
    component: () => import("@/views/My/Collect/talent.vue"),
  },
  {
    path: "/my/about",
    component: () => import("@/views/My/About/index.vue"),
  },
  {
    path: "/my/partner/person",
    component: () => import("@/views/My/Partner/person.vue"),
  },
  {
    path: "/my/partner/company",
    component: () => import("@/views/My/Partner/company.vue"),
  },
  {
    path: "/my/partner/admin",
    component: () => import("@/views/My/Partner/admin.vue"),
  },
  {
    path: "/my/task",
    component: () => import("@/views/My/Task/index.vue"),
  },
  {
    path: "/my/task/add",
    component: () => import("@/views/My/Task/add.vue"),
  },
  {
    path: "/my/task/details/:id",
    component: () => import("@/views/My/Task/details.vue"),
  },
  {
    path: "/my/coupon",
    component: () => import("@/views/My/Coupon/index.vue"),
  },
  {
    path: "/my/coupon/rule",
    component: () => import("@/views/My/Coupon/rule.vue"),
  },
  {
    path: "/talent",
    component: () => import("@/views/Talent/index.vue"),
  },
  {
    path: "/talent/search",
    component: () => import("@/views/Talent/search.vue"),
  },
  {
    path: "/talent/details/:id",
    component: () => import("@/views/Talent/details.vue"),
  },
  {
    path: "/admin/home",
    component: () => import("@/views/Admin/Home/index.vue"),
  },
  {
    path: "/admin/home/contract",
    component: () => import("@/views/Admin/Home/Contract/index.vue"),
  },
  {
    path: "/admin/home/pay",
    component: () => import("@/views/Admin/Home/Pay/index.vue"),
  },
  {
    path: "/admin/home/auditor",
    component: () => import("@/views/Admin/Home/Auditor/index.vue"),
  },
  {
    path: "/admin/home/auditor/task/:id",
    component: () => import("@/views/Admin/Home/Auditor/taskDetail.vue"),
  },
  {
    path: "/admin/home/auditor/talent/:id",
    component: () => import("@/views/Admin/Home/Auditor/talentDetail.vue"),
  },
  {
    path: "/admin/home/auditor/company/:id",
    component: () => import("@/views/Admin/Home/Auditor/companyDetail.vue"),
  },
  {
    path: "/admin/home/user",
    component: () => import("@/views/Admin/Home/User/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    next();
  } else {
    if (
      to.path === "/login" ||
      to.path === "/login/serviceAgree" ||
      to.path === "/login/privacyPolicy"
    ) {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
