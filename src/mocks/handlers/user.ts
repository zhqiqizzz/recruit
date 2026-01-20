import { http, HttpResponse, delay } from "msw";
import { db } from "@/mocks/db";
import { fakerZH_CN as faker } from "@faker-js/faker";

// 通用响应封装
const success = (data: any) =>
  HttpResponse.json({ code: 200, success: "ok", result: data });

const error = (msg: string) =>
  HttpResponse.json({ code: 500, success: "fail", message: msg });

export const userHandlers = [
  http.post("/api/login/code", async ({ request }) => {
    const { accounts } = (await request.json()) as { accounts: string };
    if (!accounts) {
      return error("手机号不能为空");
    }
    if (!/^1[3-9]\d{9}$/.test(accounts)) {
      return error("请输入正确的手机号格式");
    }

    const phoneStr = String(accounts);
    // 生成随机 6 位验证码
    const mockCode = faker.string.numeric(6);

    // 查库：用户存在吗？
    const existingUser = db.user.findFirst({
      where: { accounts: { equals: phoneStr } },
    });

    if (existingUser) {
      // 老用户 -> 只更新验证码
      db.user.update({
        where: { id: { equals: existingUser.id } },
        data: { latest_code: mockCode },
      });
    } else {
      // 新用户 -> 自动注册 (这里必须补全 db.ts 中定义的所有字段)
      db.user.create({
        id: faker.number.int({ min: 100000, max: 999999 }),
        accounts: phoneStr,
        latest_code: mockCode,

        // --- 基础信息 ---
        user_name: faker.person.fullName(),
        sex: faker.helpers.arrayElement([0, 1]),
        birthday: faker.date.birthdate().toISOString().split("T")[0],
        head_img: faker.image.avatar(),
        work_time: faker.date.past().toISOString().split("T")[0],
        // email: faker.internet.email(),
        email: null,
        // idcard: faker.string.numeric(18), // 随机身份证
        idcard: null,
        // --- 账户状态 (新用户默认值) ---
        pay_password: null, // 默认无支付密码
        account_price: 0, // 余额 0
        is_checked: 0, // 未认证
        it_enterprise: 0, // 非 IT 企业
        enterprise: 0, // 非企业账号
        manage: 0, // 非管理岗
        role: "1", // 默认角色：人才
      });
    }

    await delay(500); // 模拟网络延迟
    return success({ code: Number(mockCode) });
  }),

  http.post("/api/login", async ({ request }) => {
    const { accounts, code } = (await request.json()) as {
      accounts: string;
      code: string;
    };
    if (!accounts) return error("手机号不能为空");
    if (!code) return error("验证码不能为空");

    // 查库
    const user = db.user.findFirst({
      where: { accounts: { equals: String(accounts) } },
    });

    if (!user) return error("用户不存在，请先获取验证码");

    // 校验 (支持万能码 123456 或 真实验证码)
    if (String(code) !== "123456" && String(code) !== user.latest_code) {
      return error("验证码错误");
    }

    await delay(300);

    return success({
      errCode: 200,
      msg: "登录成功",
      data: {
        user_info: user,
        token: `mock-token-${faker.string.uuid()}`,
        exipreTime: Date.now() + 3600000,
      },
    });
  }),

  http.get("/api/policy_protocol/list", async ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (id) {
      const item = db.agreement.findFirst({
        where: { id: { equals: Number(id) } },
      });
      if (item) {
        return HttpResponse.json({
          code: 200,
          success: "ok",
          result: item,
        });
      } else {
        return HttpResponse.json({
          code: 500,
          success: "fail",
          message: "未找到该协议",
        });
      }
    }
  }),
];
