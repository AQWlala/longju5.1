# Longju 5.1 Desktop UI

基于 React + TypeScript + Tailwind CSS 构建的 AI 原生工作台界面。

## 技术栈

- **React 18** - UI 框架
- **TypeScript 5** - 类型安全
- **Tailwind CSS 3** - 原子化 CSS
- **Vite 5** - 构建工具

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── components/     # React 组件
├── hooks/          # 自定义 Hooks
├── stores/         # Zustand 状态管理
├── services/       # API 服务层
├── types/          # TypeScript 类型定义
├── utils/          # 工具函数
├── constants/      # 常量定义
├── styles/         # 样式文件
├── App.tsx         # 根组件
├── main.tsx        # 入口文件
└── index.css       # 全局样式
```

## 设计规范

详见 `.codeartsdoer/specs/longju-5-1-desktop-ui/spec.md` 和 `design.md`。
