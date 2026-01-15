# Vue 3 + TypeScript + Vite

## 项目运行

```bash
npm run dev
```

## 项目简介

### 项目页面结构

```plaintext
views/                    # 页面目录
├── login/                # 登录
│   ├── index.vue         # 登录页
│   ├── serviceAgree.vue  # 服务协议页
│   └── privacyAgree.vue  # 隐私协议页
├── task/                 # 任务
│   ├── index.vue         # 任务主页
│   ├── search.vue        # 任务搜索页
│   ├── details.vue       # 任务详情页
│   └── companySource.vue # 企业任务主页
├── contract/             # 合约
│   ├── index.vue         # 合约主页
│   ├── details.vue       # 合约详情页
│   └── process.vue       # 合约进度页
├── message/              # 消息
│   ├── index.vue         # 消息主页
│   ├── systemList.vue    # 系统消息列表页
│   ├── systemDetails.vue # 系统消息详情页
│   └── talk.vue          # 对话消息页
├── my/                   # 个人中心
│   ├── index.vue         # 我的主页
│   ├── user/             # 用户中心
│   │   ├── index.vue     # 个人信息主页
│   │   ├── authReal.vue  # 实名认证页
│   │   ├── certified.vue # 已完成实名认证页
│   │   └── identitySwitch.vue # 身份切换页
│   ├── set/              # 设置
│   │   └── index.vue     # 设置主页
│   ├── feedback/         # 意见反馈
│   │   └── index.vue     # 反馈主页
│   ├── account/          # 我的账户
│   │   ├── index.vue     # 账户主页
│   │   ├── advance.vue   # 账户提现页
│   │   ├── coinExplain.vue # 代币说明页
│   │   └── depositExplain.vue # 押金说明页
│   ├── resume/           # 我的简历
│   │   ├── index.vue     # 简历主页
│   │   └── preview.vue   # 预览简历页
│   └── collect/          # 我的收藏
│       └── index.vue     # 收藏主页
└── talent/               # 人才
    ├── index.vue         # 人才主页
    └── details.vue       # 人才详情页
```
