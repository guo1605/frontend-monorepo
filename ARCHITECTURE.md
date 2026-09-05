# Frontend Monorepo Architecture

> 当前项目的整体架构说明文档。

---

# 1. 项目概述

## 1.1 项目定位

本项目是一个基于 **pnpm Workspace 的 Frontend Monorepo**。

主要用于：

- React 企业级项目开发实践
    
- 前端工程化实践
    
- 可复用 JavaScript 工具沉淀
    
- 可复用 React Hooks 沉淀
    
- Git 工程规范实践
    
- CI 自动化实践
    
- Admin Dashboard 项目开发
    

当前整体结构由：

```text
Applications
+
Shared Packages
+
Engineering Infrastructure
```

组成。

---

# 2. 架构目标

当前架构主要解决以下问题。

## 2.1 应用与公共代码分离

避免：

```text
Admin Dashboard
└── 所有代码
    ├── utils
    ├── hooks
    ├── business
    └── pages
```

随着项目增长，所有代码混在一个应用中会导致：

- 公共能力无法复用
    
- 工具代码与业务代码耦合
    
- Hooks 难以沉淀
    
- 多项目之间复制代码
    
- 工程结构逐渐混乱
    

因此采用：

```text
apps
+
packages
```

的 Monorepo 结构。

---

## 2.2 可复用能力沉淀

当前已经沉淀两类公共能力。

### JavaScript 工具库

```text
@frontend/utils
```

负责：

```text
debounce
throttle
deepClone
formatDate
storage
```

---

### React Hooks 工具库

```text
@frontend/react-hooks
```

负责：

```text
useDebounce
useThrottle
useLocalStorage
usePrevious
useToggle
```

Hooks 可以根据实际需要复用基础工具库。

---

## 2.3 业务应用独立

Admin Dashboard 不应该直接承担：

```text
所有公共能力
```

它应该专注于：

```text
业务
+
页面
+
路由
+
状态
+
数据请求
```

公共能力通过 Workspace Package 引入。

---

# 3. 总体架构

```text
                    Frontend Monorepo
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
       apps                               packages
        │                                     │
        │                    ┌────────────────┴───────────────┐
        │                    │                                │
Admin Dashboard       @frontend/utils              @frontend/react-hooks
        │                    │                                │
        │                    │                         React Custom Hooks
        │                    │                                │
        ├────────────────────┼────────────────────────────────┤
        │                    │                                │
        │                 JS Utilities                 Optional Dependency
        │                                                   │
        └───────────────────────────────────────────────────┘
```

实际依赖关系：

```text
Admin Dashboard
      │
      ├──────────────→ @frontend/utils
      │
      └──────────────→ @frontend/react-hooks
                              │
                              │ optional
                              ↓
                       @frontend/utils
```

核心原则：

> **依赖方向必须从应用层向基础层流动。**

---

# 4. Monorepo 目录结构

推荐最终结构：

```text
frontend-monorepo/
│
├── apps/                              # 应用程序（终端产品）
│   │
│   └── admin-dashboard/               # 管理后台应用
│       │
│       ├── src/
│       │   ├── pages/                 # 页面组件
│       │   ├── components/            # 应用级组件
│       │   ├── hooks/                 # 应用级 Hooks
│       │   ├── stores/                # Zustand stores
│       │   ├── routes/                # 路由配置
│       │   └── main.tsx               # 应用入口
│       ├── public/
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
│
├── packages/                          # 共享包（可被 apps 引用）
│   │
│   ├── utils/                         # 共享工具函数
│   │   │
│   │   ├── src/
│   │   │   ├── debounce.ts
│   │   │   ├── throttle.ts
│   │   │   ├── deepClone.ts
│   │   │   ├── formatDate.ts
│   │   │   ├── storage.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── react-hooks/                   # 共享工具Hooks
│       │
│       ├── src/
│       │   ├── useDebounce.ts
│       │   ├── useThrottle.ts
│       │   ├── useLocalStorage.ts
│       │   ├── usePrevious.ts
│       │   ├── useToggle.ts
│       │   └── index.ts
│       │
│       ├── package.json
│       └── tsconfig.json
│
├── .github/
│   │
│   └── workflows/
│       └── ci.yml                     # GitHub Actions CI
│
├── .husky/                            # Git Hooks
│   ├── pre-commit                     # lint-staged
│   └── commit-msg                     # commitlint
│
├── package.json                       # 根 package.json
├── pnpm-workspace.yaml                # pnpm workspace 配置
├── pnpm-lock.yaml                     # 共享锁文件
├── tsconfig.json                      # 根 TypeScript 配置
│
├── README.md
├── ARCHITECTURE.md
└── .gitignore
```

---

# 5. Workspace 架构

Workspace 负责将：

```text
apps/*
```

和：

```text
packages/*
```

统一组织。

典型结构：

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

Workspace 的作用不是简单地把多个文件夹放在一起。

它提供：

```text
统一依赖管理
+
本地 Package 引用
+
统一 Scripts
+
统一工程规范
```



---

# 6. Package 分层

当前架构可以理解为三层。

```text
┌───────────────────────────────┐
│         Application Layer      │
│                               │
│      Admin Dashboard          │
└───────────────┬───────────────┘
                │
                ↓
┌───────────────────────────────┐
│       React Abstraction        │
│                               │
│   @frontend/react-hooks       │
└───────────────┬───────────────┘
                │
                ↓
┌───────────────────────────────┐
│         Foundation Layer       │
│                               │
│      @frontend/utils          │
└───────────────────────────────┘
```

但是这里需要注意：

> 这是能力分层，不代表每一层必须强制调用下一层。

例如：

```text
Admin Dashboard
```

可以直接使用：

```text
@frontend/utils
```

也可以使用：

```text
@frontend/react-hooks
```

---

# 7. @frontend/utils

## 7.1 职责

`@frontend/utils` 是最基础的共享能力。

特点：

```text
与业务无关
与 React 无关
可被多个应用使用
```

---

## 7.2 当前能力

```text
@frontend/utils
│
├── debounce
├── throttle
├── deepClone
├── formatDate
└── storage
```

---

## 7.3 职责边界

允许：

```text
JavaScript
TypeScript
Browser API
通用数据处理
```

不允许：

```text
React Component
React Hook
Admin Dashboard Business Logic
Page Logic
User API
```

例如：

正确：

```ts
formatDate(date);
```

错误：

```ts
formatUserCreatedAt(user);
```

因为：

```text
formatUserCreatedAt
```

已经开始出现业务含义。

---

# 8. @frontend/react-hooks

## 8.1 职责

`@frontend/react-hooks` 用于沉淀：

```text
可复用的 React 状态逻辑
```

当前包含：

```text
useDebounce
useThrottle
useLocalStorage
usePrevious
useToggle
```

---

## 8.2 核心原则

Custom Hook 的职责是：

```text
状态逻辑复用
```

而不是：

```text
业务复用
```

例如：

合理：

```ts
useDebounce(value);
```

不合理：

```ts
useAdminUserList();
```

后者属于：

```text
Admin Dashboard Business Layer
```

不应该进入公共 Hooks Package。

---

## 8.3 Package 依赖

允许：

```text
react-hooks
      ↓
utils
```

禁止：

```text
utils
      ↓
react-hooks
```

原因：

```text
基础层
不能依赖
上层抽象
```

---

# 9. Admin Dashboard 架构

Admin Dashboard 是当前 Monorepo 的主要业务应用。

项目定位：

```text
React 中后台管理系统
```

主要用于展示：

- React
    
- TypeScript
    
- React Router
    
- TanStack Query
    
- React Hook Form
    
- Zod
    
- Zustand
    
- 组件设计
    
- 状态管理
    
- 工程化能力
    

当前项目范围以 v0.1 项目档案为唯一基准。

---

# 10. Admin Dashboard 页面架构

当前页面范围：

```text
Admin Dashboard
│
├── P001 Dashboard
│
├── P002 User List
│
├── P003 User Detail
│
├── P004 User Create
│
├── P005 User Edit
│
└── P006 Not Found
```

对应路由：

```text
/
│
├── → /dashboard
│
├── → /users
│
├── → /users/new
│
├── → /users/:id
│
├── → /users/:id/edit
│
└── → /* 
```

当前所有业务页面共享：

```text
AdminLayout
```

该页面与路由范围来自 Admin Dashboard v0.1 项目档案。

---

# 11. Layout 架构

整体 Layout：

```text
AdminLayout
│
├── Sidebar
│
└── Main
    │
    ├── Header
    │
    └── Outlet
```

关系：

```text
┌─────────────────────────────────────┐
│              AdminLayout             │
├───────────────┬─────────────────────┤
│               │                     │
│    Sidebar    │        Main         │
│               │                     │
│               │  ┌───────────────┐  │
│               │  │    Header     │  │
│               │  └───────────────┘  │
│               │                     │
│               │  ┌───────────────┐  │
│               │  │    Outlet     │  │
│               │  │               │  │
│               │  │ Current Page  │  │
│               │  └───────────────┘  │
└───────────────┴─────────────────────┘
```

---

## Sidebar

当前固定导航：

```text
Dashboard
/users
```

```text
用户管理
/users
```

当前不因为后续学习内容随意增加新的业务导航。

---

## Header

当前职责：

```text
当前页面信息
+
Admin 用户入口占位
```

当前不实现：

```text
登录
退出
用户菜单
通知
权限系统
```

这些都不属于当前 v0.1 项目范围。

---

# 12. Admin Dashboard 推荐目录结构

```text
src/
│
├── components/
│   │
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   │
│   ├── common/
│   │
│   └── user/
│       ├── UserTable.tsx
│       ├── UserForm.tsx
│       └── UserStatus.tsx
│
├── pages/
│   │
│   ├── DashboardPage.tsx
│   │
│   └── users/
│       ├── UserListPage.tsx
│       ├── UserDetailPage.tsx
│       ├── UserCreatePage.tsx
│       └── UserEditPage.tsx
│
├── layouts/
│   └── AdminLayout.tsx
│
├── services/
│   └── userService.ts
│
├── hooks/
│   └── useUsers.ts
│
├── schemas/
│   └── userSchema.ts
│
├── types/
│   └── user.ts
│
├── stores/
│
└── routes/
```

原则：

> 不要求提前创建所有目录。

随着业务出现：

```text
业务出现
↓
产生职责
↓
创建对应目录
```

避免：

```text
提前设计大量空目录
```

当前推荐目录结构与职责边界来自项目档案。

---

# 13. 组件架构

组件分为四类。

---

## 13.1 Layout Components

负责：

```text
页面整体结构
```

例如：

```text
AdminLayout
Sidebar
Header
```

特点：

```text
结构性
低业务耦合
```

---

## 13.2 Common Components

负责：

```text
跨业务通用 UI
```

例如未来可能出现：

```text
PageHeader
EmptyState
ErrorState
Loading
Button
```

注意：

只有真正重复使用时才进入：

```text
components/common
```

避免过度抽象。

---

## 13.3 Business Components

例如：

```text
UserTable
UserForm
UserStatus
```

特点：

```text
具有明确业务含义
```

因此不应该进入：

```text
common
```

---

## 13.4 Page Components

Page 负责：

```text
路由
+
数据组合
+
页面级状态
+
业务组件组合
```

例如：

```text
UserListPage
```

结构：

```text
UserListPage
│
├── PageHeader
│
├── UserTable
│
├── LoadingState
│
├── ErrorState
│
└── EmptyState
```

---

# 14. 数据模型架构

当前 v0.1 的核心数据模型是：

```ts
export interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  createdAt: string;
}
```

状态：

```ts
export type UserStatus =
  | "active"
  | "inactive";
```

UI 映射：

```text
active
↓
正常

inactive
↓
禁用
```

不允许在代码中混用：

```text
enabled
disabled
normal
ban
```

数据模型必须保持统一。

---

# 15. 用户模块架构

用户模块：

```text
User
│
├── User List
│
├── User Detail
│
├── User Create
│
└── User Edit
```

所有页面围绕同一个：

```text
User Data Model
```

展开。

---

## 用户列表

```text
UserListPage
│
├── 获取用户列表
│
├── Loading
│
├── Error
│
├── Empty
│
└── UserTable
```

---

## 用户详情

```text
UserDetailPage
│
├── 获取用户
│
├── Loading
│
├── Error
│
└── User Information
```

---

## 新增用户

```text
UserCreatePage
│
├── UserForm
│
├── RHF
│
├── Zod
│
└── Mutation
```

---

## 编辑用户

```text
UserEditPage
│
├── 获取 User
│
├── RHF defaultValues
│
├── UserForm
│
├── Zod Validation
│
└── Update Mutation
```

---

# 16. API 架构

API 请求统一通过：

```text
Service Layer
```

页面不直接大量调用：

```text
fetch()
```

推荐：

```text
Page
 ↓
TanStack Query
 ↓
Service
 ↓
API
```

例如：

```text
UserListPage
      ↓
useQuery
      ↓
userService.getUsers()
      ↓
API
```

---

# 17. Service Layer

Service 的职责：

```text
请求 API
处理请求参数
处理响应数据
```

例如：

```text
userService.ts
```

负责：

```text
getUsers
getUser
createUser
updateUser
deleteUser
```

Service 不负责：

```text
UI State
Modal State
Component State
Form Validation UI
```

---

# 18. Server State 架构

Server State 使用：

```text
TanStack Query
```

负责：

```text
useQuery
useMutation
Cache
Loading
Error
Refetch
Invalidate Queries
```

数据流：

```text
API
 ↓
Service
 ↓
TanStack Query
 ↓
Component
```

Mutation：

```text
Form
 ↓
Validation
 ↓
Mutation
 ↓
Service
 ↓
API
 ↓
Invalidate Query
 ↓
UI Update
```

---

# 19. Form 架构

Form 使用：

```text
React Hook Form
+
Zod
```

结构：

```text
UserForm
│
├── React Hook Form
│
├── Zod Schema
│
└── Submit
```

流程：

```text
User Input
    ↓
React Hook Form
    ↓
Zod Validation
    ↓
Validation Result
    ↓
Mutation
    ↓
Service
    ↓
API
```

---

# 20. 状态管理架构

状态必须先分类。

当前项目状态边界：

|状态类型|技术|
|---|---|
|Server State|TanStack Query|
|Form State|React Hook Form|
|Schema Validation|Zod|
|Local UI State|useState|
|Shared Client State|Zustand|
|Route State|React Router|

这是当前项目最重要的架构原则之一。

---

# 21. 状态选择流程

遇到一个状态时：

```text
这个状态来自服务器？
│
├── 是
│   ↓
│ TanStack Query
│
└── 否
    ↓
    是否属于表单？
    │
    ├── 是
    │   ↓
    │ React Hook Form
    │
    └── 否
        ↓
        是否多个组件共享？
        │
        ├── 是
        │   ↓
        │ Zustand
        │
        └── 否
            ↓
          useState
```

---

# 22. 路由架构

使用：

```text
React Router
```

核心职责：

```text
URL
↓
Route
↓
Page
```

例如：

```text
/users
↓
UserListPage
```

动态路由：

```text
/users/:id
↓
UserDetailPage
```

嵌套路由：

```text
AdminLayout
      ↓
    Outlet
      ↓
Current Page
```

---

# 23. Admin Dashboard 完整数据流

## 用户列表

```text
UserListPage
      ↓
useQuery
      ↓
userService.getUsers
      ↓
API
      ↓
Response
      ↓
Query Cache
      ↓
UserTable
```

---

## 新增用户

```text
UserCreatePage
      ↓
UserForm
      ↓
React Hook Form
      ↓
Zod
      ↓
useMutation
      ↓
userService.createUser
      ↓
API
      ↓
Invalidate Users Query
      ↓
User List Update
```

---

## 编辑用户

```text
UserEditPage
      ↓
Get User
      ↓
RHF defaultValues
      ↓
User Form
      ↓
Zod Validation
      ↓
Update Mutation
      ↓
API
      ↓
Invalidate User Query
      ↓
UI Update
```

---

# 24. 公共 Package 使用原则

## 使用 @frontend/utils

适合：

```text
formatDate
debounce
throttle
deepClone
storage
```

例如：

```ts
import {
  formatDate,
} from "@frontend/utils";
```

---

## 使用 @frontend/react-hooks

适合：

```text
useDebounce
useThrottle
useLocalStorage
usePrevious
useToggle
```

例如：

```ts
import {
  useDebounce,
} from "@frontend/react-hooks";
```

---

## 不应该出现

```text
../../../packages/utils
```

或者：

```text
../../../../react-hooks/src
```

必须通过 Package 名称引用。

---

# 25. 依赖规则

允许：

```text
Admin Dashboard
      ↓
Utils
```

允许：

```text
Admin Dashboard
      ↓
React Hooks
```

允许：

```text
React Hooks
      ↓
Utils
```

禁止：

```text
Utils
      ↓
React Hooks
```

禁止：

```text
Utils
      ↓
Admin Dashboard
```

禁止：

```text
React Hooks
      ↓
Admin Dashboard
```

---

# 26. Git 工程架构

代码质量分为两层。

---

## 本地层

```text
Developer
    ↓
git add
    ↓
git commit
    ↓
Husky
    ↓
lint-staged
    ↓
commitlint
```

目的：

```text
尽可能在提交前发现问题
```

---

## 远程层

```text
git push
    ↓
GitHub Actions
    ↓
pnpm install
    ↓
lint
    ↓
build
```

目的：

```text
在统一环境中验证工程
```

---

# 27. CI 架构

触发：

```text
push
```

以及：

```text
pull_request
```

流程：

```text
┌─────────────┐
│ GitHub Event│
└──────┬──────┘
       ↓
┌─────────────┐
│   Runner    │
└──────┬──────┘
       ↓
┌─────────────┐
│  Checkout   │
└──────┬──────┘
       ↓
┌─────────────┐
│ Setup Node  │
└──────┬──────┘
       ↓
┌─────────────┐
│ Setup pnpm  │
└──────┬──────┘
       ↓
┌─────────────┐
│ pnpm install│
└──────┬──────┘
       ↓
┌─────────────┐
│ pnpm lint   │
└──────┬──────┘
       ↓
┌─────────────┐
│ pnpm build  │
└─────────────┘
```

---

# 28. Root Scripts

Root Scripts 应该成为：

```text
整个 Workspace 的统一入口
```

目标：

```text
pnpm dev:admin
```

启动 Admin Dashboard。

```text
pnpm lint
```

检查整个 Workspace。

```text
pnpm build
```

构建整个 Workspace。

```text
pnpm format
```

格式化代码。

---

# 29. 架构决策原则

未来遇到新的需求时，按照以下顺序判断。

---

## 新代码属于什么？

```text
业务代码？
```

放入：

```text
apps/admin-dashboard
```

---

```text
React 通用状态逻辑？
```

考虑：

```text
packages/react-hooks
```

---

```text
纯 JavaScript 通用能力？
```

考虑：

```text
packages/utils
```

---

# 30. 新增代码判断流程

```text
新增能力
   │
   ↓
是否 Admin Dashboard 特有？
   │
   ├── 是
   │   ↓
   │ apps/admin-dashboard
   │
   └── 否
       ↓
是否依赖 React？
       │
       ├── 是
       │   ↓
       │ packages/react-hooks
       │
       └── 否
           ↓
         packages/utils
```

---

# 31. 当前架构边界

当前明确不包含：

```text
Micro Frontend
```

```text
Docker
```

```text
Kubernetes
```

```text
自动 npm 发布
```

```text
复杂 CI/CD
```

```text
多应用微服务架构
```

```text
权限系统
```

```text
真实登录系统
```

原因：

> 当前项目目标是服务于前端求职与工程能力展示，不为了“看起来复杂”而增加不必要架构。

总计划当前主线是 React、TypeScript、现代工程化、Admin Dashboard 等能力，工程化阶段结束后将继续进入 Admin Dashboard 正式开发。

---

# 32. 架构演进路线

当前：

```text
v0.1
│
├── Monorepo
├── Admin Dashboard
├── Utils Package
├── React Hooks Package
├── Git Hooks
└── CI
```

下一阶段：

```text
v0.2
│
├── 完善 Dashboard
├── User CRUD
├── API Layer
├── TanStack Query
├── RHF + Zod
├── Zustand
└── Performance
```

注意：

> v0.2 不意味着直接推翻 v0.1。

正确方式：

```text
v0.1
↓
明确需求变化
↓
分析影响范围
↓
更新项目档案
↓
更新数据模型
↓
更新 UI
↓
更新代码
```

项目档案已经明确规定，需求变化需要先判断影响范围，再同步更新相关模型、页面、UI、Schema、API、Mock 与代码。

---

# 33. 变更管理

任何需求变化：

```text
Requirement Change
        ↓
Impact Analysis
        ↓
Architecture Update
        ↓
Data Model Update
        ↓
UI Update
        ↓
Type Update
        ↓
Schema Update
        ↓
API Update
        ↓
Code Update
        ↓
Progress Update
```

---

# 34. 最终架构原则

整个项目遵循：

```text
业务
↓
数据模型
↓
页面
↓
UI
↓
组件
↓
状态
↓
服务
↓
代码
```

工程能力遵循：

```text
Application
↓
Shared Packages
↓
Foundation
```

质量保障遵循：

```text
Local Check
↓
Git Commit
↓
Remote CI
↓
Build Verification
```

依赖关系遵循：

```text
High Level
↓
Low Level
```

避免：

```text
Low Level
↓
High Level
```

---

# 35. 当前架构总结

```text
Frontend Monorepo
│
├── Application
│   │
│   └── Admin Dashboard
│       │
│       ├── Router
│       ├── Pages
│       ├── Layout
│       ├── Components
│       ├── Services
│       ├── Query
│       ├── Forms
│       ├── State
│       └── Types
│
├── Shared Packages
│   │
│   ├── @frontend/utils
│   │
│   └── @frontend/react-hooks
│
└── Engineering
    │
    ├── pnpm Workspace
    ├── Monorepo
    ├── Husky
    ├── lint-staged
    ├── commitlint
    └── GitHub Actions
```

---

# 36. Architecture Principle

> **业务代码解决业务问题，共享 Package 沉淀通用能力，工程基础设施保证代码质量；依赖始终从应用层向基础层流动。**
> 
>---

注：
## 1. 技术栈总览

| 类别 | 技术选型 | 版本 | 用途 |
| :--- | :--- | :--- | :--- |
| **包管理器** | pnpm | ^9.0.0 | 依赖管理、workspace 支持 |
| **构建工具** | Vite | ^5.0.0 | 开发服务器 + 生产构建 |
| **前端框架** | React | ^18.3.0 | UI 渲染 |
| **类型系统** | TypeScript | ^5.0.0 | 类型安全 |
| **状态管理** | Zustand | ^4.0.0 | 客户端全局状态 |
| **数据获取** | TanStack Query | ^5.0.0 | 服务端状态管理 |
| **表单处理** | React Hook Form | ^7.0.0 | 表单验证 + 提交 |
| **数据校验** | Zod | ^3.0.0 | Schema 验证 |
| **路由** | React Router | ^6.0.0 | 客户端路由 |
| **UI 组件库** | (待选) | — | 如 Ant Design / MUI |
| **代码检查** | ESLint | ^9.0.0 | 代码质量 |
| **代码格式化** | Prettier | ^3.0.0 | 代码风格 |
| **单元测试** | Vitest | ^2.0.0 | 单元测试 |
| **Git Hooks** | Husky + lint-staged | — | 提交前检查 |
| **提交规范** | commitlint + Conventional Commits | — | 统一提交信息 |
| **CI/CD** | GitHub Actions | — | 自动化构建 + 测试 + 部署 |

---

## 2.架构分层

```
┌─────────────────────────────────────────────────────────────────┐
│                        应用层 (Apps)                           │
│         admin-dashboard / web / ...                            │
├─────────────────────────────────────────────────────────────────┤
│                        路由层 (Routing)                        │
│              React Router (BrowserRouter)                      │
├─────────────────────────────────────────────────────────────────┤
│                        状态管理层                              │
│         ┌─────────────────┐  ┌─────────────────┐               │
│         │  Server State   │  │  Client State   │               │
│         │ (TanStack Query)│  │  (Zustand)      │               │
│         └─────────────────┘  └─────────────────┘               │
├─────────────────────────────────────────────────────────────────┤
│                        数据验证层                              │
│              React Hook Form + Zod                             │
├─────────────────────────────────────────────────────────────────┤
│                        工具层 (Packages)                       │
│         ┌─────────┐ ┌─────────┐ ┌─────────┐                   │
│         │  Utils  │ │Shared UI│ │  Types  │                   │
│         └─────────┘ └─────────┘ └─────────┘                   │
├─────────────────────────────────────────────────────────────────┤
│                        基础设施层                              │
│         Vite / TypeScript / pnpm / ESLint / Prettier           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. 关键架构决策

### 3.1 Monorepo + pnpm workspace

| 决策                | 说明                                       |
| :---------------- | :--------------------------------------- |
| **为什么选 pnpm**     | 硬链接机制节省磁盘空间，严格依赖隔离杜绝幽灵依赖，内置 workspace 支持 |
| **为什么选 Monorepo** | 统一管理多个应用，共享代码零成本，原子化提交，统一工具链             |

### 3.2 状态管理分层

| 数据类型 | 管理工具 | 存储位置 |
| :--- | :--- | :--- |
| 服务端数据（API 响应） | **TanStack Query** | 内存缓存（Query Cache） |
| 全局客户端状态（主题、用户） | **Zustand** | 内存 |
| 持久化客户端状态（偏好设置） | **Zustand + persist** 中间件 | localStorage |
| 表单状态（用户输入） | **React Hook Form** | 组件内部 |
| 临时 UI 状态（弹窗开关） | **useState / useToggle** | 组件内部 |
| 路由状态 | **React Router**（useSearchParams） | URL |

### 3.3 组件分层

| 层级 | 职责 | 示例 |
| :--- | :--- | :--- |
| **布局层 (Layout)** | 页面骨架 + Outlet | `DashboardLayout` |
| **容器层 (Container)** | 数据获取 + 状态管理 | `TodoList`（调用 useQuery） |
| **展示层 (Presentational)** | 纯 UI，只接收 props | `TodoItem` |
| **逻辑层 (Custom Hooks)** | 封装可复用逻辑 | `useLocalStorage` |

### 3.4 工具函数分层（packages/utils）

| 类别 | 工具函数 | 说明 |
| :--- | :--- | :--- |
| **通用工具** | `formatDate`、`deepClone` | 零依赖，纯函数 |
| **函数控制** | `debounce`、`throttle` | 高频事件优化 |
| **存储工具** | `createStorage` | 封装 localStorage + 命名空间 + TTL |
| **React Hooks** | `useToggle`、`useDebounce`、`useThrottle`、`usePrevious`、`useLocalStorage` | 自定义 Hook |

---

## 4. 命名规范

### 4.1 文件命名

| 类型 | 命名规则 | 示例 |
| :--- | :--- | :--- |
| 组件文件 | PascalCase | `UserCard.tsx` |
| Hook 文件 | camelCase + `use` 前缀 | `useToggle.ts` |
| 工具函数 | camelCase | `formatDate.ts` |
| 类型定义 | camelCase | `api.ts` |
| 测试文件 | `*.test.ts` 或 `*.spec.ts` | `debounce.test.ts` |
| 常量文件 | kebab-case | `api-constants.ts` |

### 4.2 组件 Props 命名

| 类型 | 命名规则 | 示例 |
| :--- | :--- | :--- |
| 数据 Props | 名词 | `todos`、`user`、`items` |
| 回调 Props | `on` + 动词 | `onToggle`、`onDelete`、`onSubmit` |
| 布尔 Props | `is` / `has` + 形容词 | `isOpen`、`isLoading`、`hasError` |
| 渲染 Props | `render` + 名词 | `renderItem`、`renderHeader` |

### 4.3 Git 提交信息（Conventional Commits）

```
<type>(<scope>): <description>

[可选的正文]

[可选的页脚]
```

| Type | 说明 |
| :--- | :--- |
| `feat` | 新功能 |
| `fix` | 修复 Bug |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响逻辑） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具依赖 |

---

## 5. 环境变量

| 变量名 | 说明 | 示例 |
| :--- | :--- | :--- |
| `VITE_API_URL` | API 基础地址 | `https://api.example.com` |
| `VITE_APP_TITLE` | 应用标题 | `我的应用` |
| `VITE_ENV` | 环境标识 | `development` / `production` |

**规则**：
- 只有 `VITE_` 前缀的变量会暴露给客户端
- 敏感变量（如密钥）不得以 `VITE_` 开头
- 环境变量类型需在 `src/vite-env.d.ts` 中声明

---

## 6. Git 工作流

```
main (生产)
  ↑
develop (开发)
  ↑
feature/* (功能分支)
```

- **feature/**：新功能开发，从 `develop` 切出，合并回 `develop`
- **hotfix/**：紧急修复，从 `main` 切出，合并回 `main` 和 `develop`

---

## 10. CI/CD

### 10.1 GitHub Actions 流程

```yaml
name: CI
on:
  push: [main, develop]
  pull_request: [main, develop]

jobs:
  build-and-test:
    steps:
      - Checkout
      - Setup Node.js
      - Install pnpm
      - Cache dependencies
      - pnpm install --frozen-lockfile
      - pnpm run lint
      - pnpm run type-check
      - pnpm run test:ci
      - pnpm run build
```

### 10.2 检查门禁

- [ ] ESLint 检查通过（0 error）
- [ ] TypeScript 类型检查通过
- [ ] Vitest 单元测试全部通过
- [ ] 构建成功（所有子包）
- [ ] 提交信息符合 Conventional Commits

---

## 11. 依赖管理策略

### 11.1 依赖分类

| 类别 | 安装位置 | 示例 |
| :--- | :--- | :--- |
| 根依赖 | 根 `package.json` | ESLint、Prettier、Vitest、Husky |
| 应用依赖 | 子包 `package.json` | React、React Router、Zustand、TanStack Query |
| 共享包依赖 | 子包 `package.json` | `dependencies` 或 `peerDependencies` |

### 11.2 版本锁定

- `pnpm-lock.yaml` 必须提交到 Git
- CI 中使用 `--frozen-lockfile` 强制依赖一致性
- 子包不需要自己的锁文件

---

## 12. 性能优化策略

| 优化手段 | 应用位置 | 说明 |
| :--- | :--- | :--- |
| **路由懒加载** | React Router | `lazy(() => import('./pages/...'))` |
| **代码分割** | Vite `manualChunks` | 第三方库独立 chunk |
| **防抖/节流** | 工具函数 | 高频事件（搜索、滚动） |
| **Memo 缓存** | React | `useMemo`、`useCallback`、`React.memo` |
| **预加载** | 浏览器 | `dns-prefetch`、`preconnect` |
| **Tree Shaking** | Vite | 移除未使用代码 |

---

## 13. 文档维护

### 12.1 文档类型

| 类型     | 位置                                         | 说明          |
| :----- | :----------------------------------------- | :---------- |
| 架构文档   | `ARCHITECTURE.md`                          | 项目整体架构（本文档） |
| API 文档 | `packages/*/README.md`                     | 子包使用说明      |


### 13.2 更新规则

- 架构变更时同步更新本文档
- 新增子包时更新项目结构图
- 技术栈升级时更新技术栈总览

---

## 14. 附录：快速命令速查

| 命令                                            | 说明                        |
| :-------------------------------------------- | :------------------------ |
| `pnpm install`                                | 安装所有依赖                    |
| `pnpm dev:admin`                              | 启动Admin Dashboard的 dev 服务 |
| `pnpm build`                                  | 构建所有子包                    |
| `pnpm build --filter admin-dashboard`         | 只构建 admin-dashboard       |
| `pnpm lint`                                   | 运行所有子包的 ESLint            |
| `pnpm type-check`                             | 运行所有子包的类型检查               |
| `pnpm test:ci`                                | 运行所有子包的单元测试               |
| `pnpm commit`                                 | 使用 Commitizen 交互式提交       |
| `pnpm add axios --filter web`                 | 为 web 添加依赖                |
| `pnpm add @my/utils@workspace:* --filter web` | 为 web 添加 workspace 包      |
