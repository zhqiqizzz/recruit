import { primaryKey, nullable } from "@mswjs/data";
import { fakerZH_CN as faker } from "@faker-js/faker";

// ==============================================
// 1. 定义模型 Schema (类似数据库建表)
// ==============================================

export const userModel = {
  id: primaryKey(Number),
  accounts: String,
  latest_code: String,
  user_name: String,
  sex: Number,
  birthday: String,
  pay_password: nullable(String),
  email: nullable(String),
  work_time: String,
  head_img: String,
  idcard: nullable(String),
  account_price: nullable(Number),
  is_checked: Number,
  it_enterprise: Number,
  enterprise: Number,
  manage: Number,
  role: String,
};

export const agreementModel = {
  id: primaryKey(Number),
  title: String,
  content: String,
  isdelete: Number,
  create_time: String,
  sort: Number,
  update_time: String,
  type: Number,
};

export const seedDB = (db: any) => {
  db.agreement.create({
    id: 1,
    title: "《用户服务协议》",
    content: `<div class="protocol-content">
      <h3>用户服务协议</h3>
      <p><strong>版本生效日期：2023-09-01</strong></p>
      <p>欢迎您使用本平台服务...</p>
      <p>1. 本协议是您与平台之间关于您使用本服务所订立的协议。</p>
      <p>2. 务必认真阅读、充分理解各条款内容...</p>
    </div>`,
    isdelete: 0,
    create_time: "2023-01-01T00:00:00.000Z",
    update_time: "2023-09-01T12:00:00.000Z",
    sort: 1,
    type: 1,
  });

  db.agreement.create({
    id: 2,
    title: "《隐私政策》",
    content: `<div class="protocol-content">
      <h3>隐私政策</h3>
      <p><strong>更新日期：2023-10-15</strong></p>
      <p>我们要非常重视您的个人信息保护...</p>
      <p>1. 我们如何收集和使用您的信息...</p>
      <p>2. 我们如何共享、转让、公开披露您的个人信息...</p>
    </div>`,
    isdelete: 0,
    create_time: "2023-01-01T00:00:00.000Z",
    update_time: "2023-10-15T08:30:00.000Z",
    sort: 2,
    type: 2,
  });

  // 固定人才账号 (手机号 13800000001)
  db.user.create({
    id: 10001,
    accounts: "13800000001",
    latest_code: "",
    user_name: "测试人才001",
    sex: 0,
    birthday: "2000-01-01",
    pay_password: null,
    head_img: faker.image.avatar(),
    work_time: "2023-01-01",
    email: faker.internet.email(),
    idcard: faker.string.numeric(18),
    account_price: 100,
    is_checked: 1,
    enterprise: 0,
    it_enterprise: 0,
    manage: 0,
    role: "1",
  });

  // 固定管理员账号 (手机号 13800000003)
  db.user.create({
    id: 10003,
    accounts: "13800000003",
    latest_code: "",
    user_name: "超级管理员",
    role: "2",
    sex: 0,
    birthday: "1988-08-08",
    head_img: faker.image.avatar(),
    work_time: "2010-01-01",
    is_checked: 1,
    enterprise: 0,
    it_enterprise: 0,
    manage: 1,
    email: faker.internet.email(),
    idcard: faker.string.numeric(18),
    pay_password: null,
    account_price: 10000,
  });

  // 固定企业账号 (手机号 13800000002)
  db.user.create({
    id: 10002,
    accounts: "13800000002",
    latest_code: "",
    user_name: "测试企业001",
    role: "3",
    sex: 1,
    birthday: "1990-01-01",
    head_img: faker.image.avatar(),
    work_time: "2015-01-01",
    email: faker.internet.email(),
    idcard: faker.string.numeric(18),
    pay_password: null,
    account_price: 5000,
    is_checked: 1,
    enterprise: 1,
    it_enterprise: 1,
    manage: 0,
  });
};
