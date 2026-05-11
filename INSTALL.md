# 依赖安装指南

## 网络问题诊断

当前环境遇到npm install超时问题，可能原因：
1. 网络连接慢或不稳定
2. npm镜像源访问受限
3. 企业防火墙限制

## 推荐安装方案

### 方案1：使用yarn（推荐）
```bash
# 安装yarn
npm install -g yarn

# 设置镜像源
yarn config set registry https://registry.npmmirror.com

# 安装依赖
cd desktop-ui
yarn install
```

### 方案2：使用pnpm（更快）
```bash
# 安装pnpm
npm install -g pnpm

# 设置镜像源
pnpm config set registry https://registry.npmmirror.com

# 安装依赖
cd desktop-ui
pnpm install
```

### 方案3：手动npm安装
```bash
cd desktop-ui

# 清理缓存
npm cache clean --force

# 使用淘宝镜像
npm install --registry=https://registry.npmmirror.com

# 如果还是慢，尝试逐个安装核心包
npm install react@18.3.1 react-dom@18.3.1
npm install -D @types/react@18.3.3 @types/react-dom@18.3.0
npm install -D @vitejs/plugin-react@4.3.1 vite@5.2.12
npm install -D tailwindcss@3.4.4 postcss@8.4.38 autoprefixer@10.4.19
npm install -D typescript@5.4.5
```

### 方案4：使用项目已配置的.npmrc
```bash
cd desktop-ui
# .npmrc已配置淘宝镜像，直接安装即可
npm install
```

## 验证安装

安装完成后，执行以下命令验证：

```bash
# 检查node_modules
ls node_modules

# 运行开发服务器
npm run dev

# 在浏览器打开 http://localhost:3000
```

## 依赖列表

### 生产依赖
- react: 18.3.1
- react-dom: 18.3.1

### 开发依赖
- @types/react: 18.3.3
- @types/react-dom: 18.3.0
- @vitejs/plugin-react: 4.3.1
- autoprefixer: 10.4.19
- postcss: 8.4.38
- tailwindcss: 3.4.4
- typescript: 5.4.5
- vite: 5.2.12

## 故障排查

### 问题：ETIMEDOUT
**解决**：切换镜像源或使用VPN

### 问题：ENOENT
**解决**：删除node_modules和package-lock.json后重试

### 问题：权限错误
**解决**：以管理员身份运行或使用sudo（Mac/Linux）

## 下一步

依赖安装成功后，可以：
1. 运行 `npm run dev` 启动开发服务器
2. 查看设计系统和组件开发进度
3. 参考 `.codeartsdoer/specs/longju-5-1-desktop-ui/` 了解完整需求
