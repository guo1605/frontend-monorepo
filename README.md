# Frontend Monorepo

## 项目介绍

这是一个基于 pnpm Workspace 的 Frontend Monorepo，
用于沉淀 React 项目、JavaScript 工具库和 React Hooks 工具库。

主要用于：
- 前端工程化实践
- React 项目开发
- 可复用工具沉淀
- Git 工程规范
- CI 实践
---
## 项目结构

```text
frontend-monorepo/
│
├── apps/
│   └── admin-dashboard/
│
├── packages/
│   ├── utils/
│   └── react-hooks/
│
└── .github/
    └── workflows/
```

---
## 技术栈

| 类别        | 技术                                | 版本      |
| :-------- | :-------------------------------- | :------ |
| 包管理器      | pnpm                              | ^9.0.0  |
| 构建工具      | Vite                              | ^5.0.0  |
| 前端框架      | React                             | ^18.3.0 |
| 类型系统      | TypeScript                        | ^5.0.0  |
| 路由        | React Router                      | ^6.0.0  |
| 单元测试      | Vitest                            | ^2.0.0  |
| 代码检查      | ESLint                            | ^9.0.0  |
| 代码格式化     | Prettier                          | ^3.0.0  |
| Git Hooks | Husky + lint-staged               | —       |
| 提交规范      | commitlint + Conventional Commits | —       |
| CI/CD     | GitHub Actions                    | —       |

## 📋 前置条件
- Node.js >= 20.19.0
- pnpm >= 9.0.0
```bash
# 安装 pnpm（如果尚未安装）
npm install -g pnpm
```


---
## Packages

### Admin Dashboard

用途：React Admin Dashboard 项目

### Utils

当前包含：
```
debounce
throttle
deepClone
formatDate
storage
```
### React Hooks

当前包含：
```
useDebounce
useThrottle
useLocalStorage
usePrevious
useToggle
```
---
## 开发

## Scripts

## 工程规范

```text
Git Commit
↓
Husky
↓
lint-staged
↓
ESLint / Prettier
```
```text
Commit Message
↓
commitlint
```

Commit示例：
```
feat: 添加用户列表
fix: 修复用户状态显示
refactor: 重构用户模块
docs: 更新 README
chore: 更新工程配置
```

---
## CI

```text
GitHub Actions 自动执行：

pnpm install
pnpm lint
pnpm build
```
---
## 学习记录
1.搭建Monorepo基础结构
  apps
  packages
  package.json
  pnpm-workspace.yaml
  pnpm-lock.yaml(生成)
  .gitignore

2.Git工程规范：Husky、lint-staged、commitlint、Commitizen


| 类别        | 技术                                | 版本      |
| :-------- | :-------------------------------- | :------ |
| 包管理器      | pnpm                              | ^9.0.0  |
| 构建工具      | Vite                              | ^5.0.0  |
| 前端框架      | React                             | ^18.3.0 |
| 类型系统      | TypeScript                        | ^5.0.0  |
| 状态管理      | Zustand                           | ^4.0.0  |
| 数据获取      | TanStack Query                    | ^5.0.0  |
| 表单处理      | React Hook Form                   | ^7.0.0  |
| 数据校验      | Zod                               | ^3.0.0  |
| 路由        | React Router                      | ^6.0.0  |
| 单元测试      | Vitest                            | ^2.0.0  |
| 代码检查      | ESLint                            | ^9.0.0  |
| 代码格式化     | Prettier                          | ^3.0.0  |
| Git Hooks | Husky + lint-staged               | —       |
| 提交规范      | commitlint + Conventional Commits | —       |
| CI/CD     | GitHub Actions                    | —       |
