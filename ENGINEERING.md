# Frontend Engineering Guide

> 本文档用于整理当前 Frontend Monorepo 项目的工程化体系，包括构建工具、包管理、Monorepo、Git 规范、代码质量、共享包和 CI。

---

# 1. 工程化阶段概览

当前工程化阶段对应学习计划：

| 内容              | 主要目标             |
| --------------- | ---------------- |
| Vite            | 现代前端构建工具         |
| pnpm            | 包管理与 Workspace   |
| Monorepo        | 多项目/Package 统一管理 |
| Git 工程规范        | 提交质量控制           |
| JS 工具库          | 通用能力沉淀           |
| React Hooks 工具库 | React 逻辑复用       |
| CI 与工程整理        | 自动化质量检查          |

这不是 7 个独立工具。

它们最终组成一套完整流程：

```text
Vite
  +
pnpm
  +
Workspace
  +
Monorepo
  +
Git Hooks
  +
Code Quality
  +
Shared Packages
  +
GitHub Actions
```

最终形成：

```text
开发
 ↓
本地检查
 ↓
提交
 ↓
Git Hook
 ↓
Push
 ↓
CI
 ↓
自动验证
```



---

# 2. 工程化目标

当前工程化体系主要解决五个问题。

## 2.1 如何开发？

使用：

```text
Vite
```

解决：

```text
开发服务器
模块加载
环境变量
Alias
Proxy
生产构建
```

---

## 2.2 如何管理依赖？

使用：

```text
pnpm
```

解决：

```text
依赖安装
Scripts
Workspace
Package 管理
```

---

## 2.3 如何管理多个项目和公共代码？

使用：

```text
Monorepo
```

组织：

```text
apps
+
packages
```

---

## 2.4 如何保证提交质量？

使用：

```text
Husky
+
lint-staged
+
commitlint
+
Commitizen
```

解决：

```text
代码质量
+
提交信息规范
```

---

## 2.5 如何自动验证代码？

使用：

```text
GitHub Actions
```

自动执行：

```text
install
↓
lint
↓
build
```

---

# 3. 工程化整体架构

当前完整工程流程：

```text
┌─────────────────────┐
│     Developer        │
│      编写代码         │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│       Vite          │
│   本地开发 / Build    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│       pnpm          │
│    依赖 / Scripts    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│      Monorepo       │
│   apps / packages   │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│      git commit     │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│       Husky         │
│    Git Hooks        │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│     lint-staged     │
│    代码质量检查      │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│     commitlint      │
│    Commit 检查      │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│       git push      │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│   GitHub Actions    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│      pnpm install   │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│       lint          │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│       build         │
└─────────────────────┘
```

---

# 4. Vite

## 4.1 Vite 的定位

Vite 是当前项目的：

```text
Frontend Build Tool
```

主要负责：

```text
开发服务器
+
模块处理
+
环境变量
+
构建
```

---

## 4.2 当前重点

当前阶段不需要深入 Vite 源码。

只重点掌握：

```text
核心配置
Alias
环境变量
Proxy
Build
```

这也是当前总计划明确限定的学习范围。

---

## 4.3 Alias

解决：

```text
../../../components
```

这种问题。

例如：

```ts
import Button from "@/components/Button";
```

Alias 的价值：

```text
减少相对路径
+
提高可读性
+
降低目录调整成本
```

---

## 4.4 环境变量

不同环境可能需要不同配置：

```text
Development
Production
```

例如：

```text
API 地址
Feature Flag
环境标识
```

核心原则：

> 不要把环境相关配置直接写死在业务代码中。

---

## 4.5 Proxy

本地开发时：

```text
Frontend
   ↓
Vite Dev Server
   ↓
Proxy
   ↓
Backend API
```

主要用于解决开发阶段的：

```text
跨域问题
```

注意：

> Vite Proxy 是开发环境代理方案，不是生产环境跨域解决方案。

---

## 4.6 Build

最终：

```bash
pnpm build
```

应该能够验证：

```text
TypeScript / 构建配置
+
依赖关系
+
生产构建
```

---

# 5. pnpm

## 5.1 pnpm 的职责

pnpm 是当前项目的：

```text
Package Manager
```

主要负责：

```text
安装依赖
管理依赖
执行 Scripts
管理 Workspace
```

---

## 5.2 为什么使用 pnpm？

在当前项目中，最重要的不是简单的：

```text
pnpm 比 npm 快
```

而是：

> pnpm 对 Workspace 和 Monorepo 有良好的支持。

---

## 5.3 Scripts

Root `package.json` 应该成为：

```text
统一工程入口
```

例如：

```text
pnpm dev:admin
pnpm lint
pnpm build
pnpm format
```

而不是每次：

```text
进入 apps
↓
进入某个 package
↓
手动执行
```

---

# 6. pnpm Workspace

Workspace 将多个 Package 组织到一起。

例如：

```text
frontend-monorepo
│
├── apps
│
└── packages
```

配置概念：

```text
apps/*
packages/*
```

---

## Workspace 的意义

它解决：

```text
多个项目
+
多个共享 Package
```

之间的：

```text
本地依赖
统一管理
统一 Scripts
```

---

# 7. Monorepo

## 7.1 什么是 Monorepo？

Monorepo：

```text
Multiple Projects
↓
One Repository
```

例如：

```text
frontend-monorepo/
│
├── apps/
│   └── admin-dashboard/
│
└── packages/
    ├── utils/
    └── react-hooks/
```

---

# 8. apps 与 packages

## apps

放：

```text
完整应用
```

当前：

```text
apps/
└── admin-dashboard
```

---

## packages

放：

```text
可复用能力
```

当前：

```text
packages/
├── utils
└── react-hooks
```

---

# 9. Package 依赖原则

当前依赖方向：

```text
Admin Dashboard
      │
      ├────→ utils
      │
      └────→ react-hooks
```

`react-hooks` 可以根据实际实现依赖 `utils`：

```text
react-hooks
      ↓
utils
```

禁止：

```text
utils
  ↓
Admin Dashboard
```

也禁止：

```text
utils
  ↓
react-hooks
  ↓
Admin Dashboard
```

核心原则：

> 上层可以依赖下层，下层不能依赖上层。

---

# 10. JS 工具库

Package：

```text
@frontend/utils
```

当前工具：

```text
debounce
throttle
deepClone
formatDate
storage
```

这是工程化阶段的重要产物，也是总计划要求同步沉淀的长期资产。

---

## debounce

用途：

```text
高频事件
↓
停止触发一段时间
↓
执行一次
```

典型场景：

```text
搜索输入
窗口 resize
表单输入
```

---

## throttle

用途：

```text
高频事件
↓
固定时间间隔
↓
最多执行一次
```

典型场景：

```text
scroll
mousemove
```

---

## deepClone

解决：

```text
复杂对象复制
```

需要理解：

```text
浅拷贝
vs
深拷贝
```

以及：

```text
不同数据类型
循环引用
函数
Date
Map
Set
```

对深拷贝实现的影响。

---

## formatDate

统一处理：

```text
日期
时间
格式
```

避免项目中到处：

```text
new Date()
```

然后各自格式化。

---

## storage

统一管理：

```text
localStorage
sessionStorage
```

而不是业务代码直接：

```ts
localStorage.setItem(...)
```

更合理：

```text
业务代码
↓
storage utils
↓
Browser Storage API
```

---

# 11. React Hooks 工具库

Package：

```text
@frontend/react-hooks
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

## useDebounce

处理：

```text
React State
↓
Debounced Value
```

典型：

```text
搜索
```

---

## useThrottle

处理：

```text
高频 React 状态更新
```

---

## useLocalStorage

封装：

```text
React State
+
localStorage
```

数据流：

```text
State
 ↓
Hook
 ↓
localStorage
```

---

## usePrevious

保存：

```text
Previous Value
```

主要理解：

```text
useRef
```

在保存跨渲染数据时的作用。

---

## useToggle

封装：

```text
boolean state
```

例如：

```text
true
false
toggle
```

---

# 12. 为什么要建立 Package？

核心目的不是：

> 为了 Monorepo 而 Monorepo。

而是：

```text
学习
↓
沉淀能力
↓
形成 Package
↓
项目复用
↓
长期资产
```

最终形成：

```text
学习内容
≠
看完就结束
```

而是：

```text
学习内容
↓
代码实现
↓
工具沉淀
↓
项目复用
↓
GitHub Portfolio
```

---

# 13. Git 工程规范

Git 工程化主要包含：

```text
Husky
+
lint-staged
+
commitlint
+
Commitizen
```

---

# 14. Husky

Husky 用于：

```text
Git Hooks
```

例如：

```text
pre-commit
```

流程：

```text
git commit
    ↓
Husky
    ↓
执行检查
```

作用：

> 在代码真正进入 Git 历史之前，进行自动检查。

---

# 15. lint-staged

lint-staged 的作用：

```text
只检查暂存区代码
```

而不是：

```text
检查整个项目
```

流程：

```text
git add
↓
staged files
↓
lint-staged
↓
lint
↓
通过
↓
commit
```

价值：

```text
减少检查范围
+
提高提交速度
```

---

# 16. commitlint

commitlint 用于检查：

```text
Commit Message
```

例如：

```text
feat: 添加用户列表
```

```text
fix: 修复用户状态显示
```

```text
refactor: 重构用户模块
```

```text
docs: 更新 README
```

```text
chore: 更新工程配置
```

---

# 17. Commitizen

Commitizen 的作用：

```text
辅助生成规范 Commit Message
```

关系：

```text
Commitizen
↓
帮助你生成
↓
规范 Commit Message

commitlint
↓
检查
↓
是否符合规范
```

两者职责不同。

---

# 18. 本地代码质量流程

完整流程：

```text
修改代码
   ↓
git add
   ↓
git commit
   ↓
Husky
   ↓
lint-staged
   ↓
代码检查
   ↓
commitlint
   ↓
提交信息检查
   ↓
Commit Success
```

---

# 19. 为什么有 Git Hooks 还需要 CI？

这是工程化中非常重要的问题。

## Git Hook

发生在：

```text
本地
```

优点：

```text
反馈快
提交前发现问题
```

问题：

```text
可以被绕过
环境不统一
依赖开发者本地环境
```

---

## CI

发生在：

```text
远程
```

优点：

```text
统一环境
自动执行
团队共享结果
```

因此：

```text
Local Check
+
Remote Check
```

才是完整方案。

---

# 20. GitHub Actions

GitHub Actions 用于：

```text
CI
```

当前最小目标：

```text
Push
↓
Install
↓
Lint
↓
Build
```

---

# 21. CI 触发

典型：

```text
push
```

以及：

```text
pull_request
```

流程：

```text
GitHub Event
       ↓
Workflow
       ↓
Runner
       ↓
Checkout
       ↓
Setup Environment
       ↓
Install
       ↓
Lint
       ↓
Build
       ↓
Result
```

---

# 22. 当前 CI 职责

当前 CI 只负责：

```text
pnpm install
pnpm lint
pnpm build
```

暂时不加入：

```text
Docker
自动部署
npm 发布
自动 Release
Kubernetes
复杂 CD
```

原因：

> 当前项目目标是建立前端求职需要的基础工程能力，而不是堆砌 DevOps 技术。

---

# 23. 工程化中的质量体系

当前可以理解为：

```text
              Quality System
                    │
       ┌────────────┴────────────┐
       │                         │
   Local Quality             Remote Quality
       │                         │
       │                         │
     Husky                 GitHub Actions
       │                         │
       ↓                         ↓
 lint-staged              lint + build
       │
       ↓
 commitlint
```

---

# 24. Root Scripts

Root Scripts 是整个工程的：

```text
统一操作入口
```

目标：

```text
pnpm dev:admin
```

启动应用。

```text
pnpm lint
```

检查代码。

```text
pnpm build
```

验证生产构建。

```text
pnpm format
```

格式化代码。

---

# 25. README

README 的目标用户：

```text
第一次访问项目的人
```

应该快速回答：

```text
这是什么项目？

使用什么技术？

项目结构是什么？

如何运行？

有哪些 Package？

工程规范是什么？
```

---

# 26. ARCHITECTURE.md

ARCHITECTURE.md 的目标用户：

```text
未来的自己
+
开发者
+
面试官
```

重点解释：

```text
为什么这样组织？
```

而不是简单列目录。

包括：

```text
Monorepo
依赖关系
应用层
Package 层
数据流
工程流程
架构原则
```

---

# 27. 文档体系

当前推荐：

```text
frontend-monorepo/
│
├── README.md
├── ARCHITECTURE.md
├── ENGINEERING.md
│
├── apps/
├── packages/
│
├── .github/
└── .husky/
```

职责：

|文档|职责|
|---|---|
|README|项目介绍与使用|
|ARCHITECTURE|项目架构|
|ENGINEERING|工程化体系|

---

# 28. 当前工程目录

建议最终：

```text
frontend-monorepo/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .husky/
│   ├── pre-commit
│   └── commit-msg
│
├── apps/
│   └── admin-dashboard/
│
├── packages/
│   │
│   ├── utils/
│   │   └── src/
│   │
│   └── react-hooks/
│       └── src/
│
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
│
├── README.md
├── ARCHITECTURE.md
├── ENGINEERING.md
│
└── .gitignore
```

---

# 29. 当前工程化能力地图

```text
                     Frontend Engineering
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
      Development        Code Quality         Automation
         │                    │                    │
       Vite                Husky             GitHub Actions
         │                    │                    │
       Build             lint-staged        install
         │                    │              lint
      Environment        commitlint         build
         │
       Proxy
         │
       Alias
```

同时：

```text
                    Project Management
                           │
                    pnpm Workspace
                           │
                        Monorepo
                           │
             ┌─────────────┴─────────────┐
             │                           │
            apps                     packages
             │                           │
     Admin Dashboard              utils/hooks
```

---

# 30. 工程化学习成果

完成当前阶段后，你已经不只是：

```text
会 React
```

而是具备：

```text
React Application Development
+
TypeScript
+
Vite
+
pnpm
+
Workspace
+
Monorepo
+
Git Engineering
+
Shared Package
+
GitHub Actions CI
```

---

# 31. 面试表达

如果面试官问：

> 你的项目工程化做了什么？

可以这样回答：

> 项目使用 Vite 作为构建工具，pnpm 管理依赖，并通过 pnpm Workspace 组织 Monorepo。业务应用放在 apps 下，通用能力沉淀到 packages 中，包括 JavaScript 工具库和 React Hooks 工具库。
> 
> 在代码提交阶段，通过 Husky、lint-staged 和 commitlint 进行本地质量控制，避免不规范代码和提交信息进入仓库。
> 
> 代码推送到 GitHub 后，通过 GitHub Actions 自动执行依赖安装、lint 和 build，在远程统一环境中进行 CI 验证。

这段回答的价值在于：

```text
不是背工具
↓
而是讲清楚工具之间的关系
```

---

# 32. 当前工程化的最终流程

```text
┌──────────────┐
│   编写代码    │
└──────┬───────┘
       ↓
┌──────────────┐
│    Vite      │
│   本地开发    │
└──────┬───────┘
       ↓
┌──────────────┐
│    pnpm      │
│   管理依赖    │
└──────┬───────┘
       ↓
┌──────────────┐
│  Workspace   │
│   Monorepo   │
└──────┬───────┘
       ↓
┌──────────────┐
│  git commit  │
└──────┬───────┘
       ↓
┌──────────────┐
│    Husky     │
└──────┬───────┘
       ↓
┌──────────────┐
│ lint-staged  │
└──────┬───────┘
       ↓
┌──────────────┐
│ commitlint   │
└──────┬───────┘
       ↓
┌──────────────┐
│  git push    │
└──────┬───────┘
       ↓
┌──────────────┐
│ GitHub CI    │
└──────┬───────┘
       ↓
┌──────────────┐
│   install    │
└──────┬───────┘
       ↓
┌──────────────┐
│    lint      │
└──────┬───────┘
       ↓
┌──────────────┐
│    build     │
└──────────────┘
```

---

# 33. 最终原则

> **工程化的核心不是安装更多工具，而是让开发、代码组织、提交、检查和构建形成稳定、自动、可重复的流程。**

---

本文档与 `README.md` 和 `ARCHITECTURE.md` 的分工如下：

| 文档                | 定位                          | 目标读者 |
| ----------------- | --------------------------- | ---- |
| `README.md`       | **用户手册**：“这是什么？怎么跑起来？”      | 所有人  |
| `ENGINEERING.md`  | **开发手册**：“我们怎么协作？有什么规矩？”    | 贡献者  |
| `ARCHITECTURE.md` | **设计蓝本**：“为什么这样设计？核心决策是什么？” | 架构师  |
