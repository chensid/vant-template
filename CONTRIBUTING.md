# 贡献指南

感谢你考虑为 Vant Template 做出贡献！

## 开发流程

### 1. Fork 项目

点击右上角的 Fork 按钮，将项目 fork 到你的 GitHub 账户。

### 2. 克隆项目

```bash
git clone https://github.com/YOUR_USERNAME/vant-template.git
cd vant-template
```

### 3. 创建分支

基于 `main` 分支创建新的特性分支：

```bash
git checkout -b feature/your-feature-name
```

分支命名规范：

- `feature/*` - 新功能
- `fix/*` - 修复 bug
- `docs/*` - 文档更新
- `refactor/*` - 代码重构
- `perf/*` - 性能优化

### 4. 安装依赖

```bash
pnpm install
```

### 5. 开发

启动开发服务器：

```bash
pnpm dev
```

在开发过程中，请遵循以下规范：

#### 代码规范

- 使用 TypeScript
- 遵循 ESLint 和 Prettier 配置
- 组件命名使用 PascalCase
- 函数命名使用 camelCase
- 常量命名使用 UPPER_SNAKE_CASE

#### 提交规范

项目使用 Conventional Commits 规范，每次提交时会自动检查提交信息格式。

提交信息格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

示例：

```bash
feat(router): 添加路由守卫功能

- 新增全局路由守卫
- 添加权限验证逻辑
- 更新路由类型定义

Closes #123
```

类型说明：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式（不影响代码运行）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `build`: 构建系统或外部依赖
- `ci`: CI 配置
- `chore`: 其他变动
- `revert`: 回退 commit

### 6. 测试

在提交代码前，请确保：

- [ ] 代码通过 ESLint 检查：`pnpm lint`
- [ ] 代码通过 TypeScript 类型检查：`pnpm type-check`
- [ ] 项目可以成功构建：`pnpm build`
- [ ] 新功能已在浏览器中测试

### 7. 提交代码

```bash
git add .
git commit -m "feat: your feature description"
```

注意：如果提交信息不符合规范，pre-commit hook 会阻止提交。

### 8. 推送代码

```bash
git push origin feature/your-feature-name
```

### 9. 创建 Pull Request

1. 前往你 fork 的仓库页面
2. 点击 "New Pull Request"
3. 选择你的特性分支
4. 填写 PR 描述，说明：
   - 改动内容
   - 相关 issue
   - 测试情况
5. 提交 PR

## Pull Request 指南

### PR 标题

PR 标题应该清晰地描述改动内容，格式与 commit message 相同：

```
feat: 添加用户认证功能
fix: 修复路由跳转问题
docs: 更新 README
```

### PR 描述

请在 PR 描述中包含以下内容：

1. **改动说明**

   - 这个 PR 做了什么
   - 为什么需要这个改动

2. **相关 issue**

   - Closes #123
   - Fixes #456

3. **测试说明**

   - 如何测试这个改动
   - 是否需要特殊的测试环境

4. **截图（如果有 UI 改动）**
   - 改动前后的对比截图

### 代码审查

- 所有 PR 都需要至少一个维护者的审查
- 请耐心等待审查反馈
- 根据反馈及时修改代码
- 保持 PR 尽可能小，便于审查

## 问题反馈

### 提交 Issue

如果你发现了 bug 或有新功能建议，请提交 issue：

1. 搜索现有 issue，确保问题未被报告
2. 使用清晰的标题
3. 详细描述问题或建议
4. 提供复现步骤（如果是 bug）
5. 提供环境信息（浏览器版本、Node.js 版本等）

### Issue 标签

- `bug` - 缺陷
- `enhancement` - 功能增强
- `documentation` - 文档相关
- `question` - 问题咨询
- `help wanted` - 需要帮助
- `good first issue` - 适合新手

## 开发技巧

### 调试

开发环境下会自动启用 VConsole，方便移动端调试。

### 模拟数据

可以在 `src/api` 目录下创建 mock 数据进行开发。

### 响应式调试

使用浏览器开发者工具的设备模拟功能，测试不同屏幕尺寸下的表现。

## 代码风格

项目使用 ESLint 和 Prettier 来保持代码风格一致。

在提交代码前，Git hooks 会自动格式化代码，但建议在开发过程中就保持良好的代码风格。

## 联系方式

如有问题，可以通过以下方式联系：

- 提交 Issue
- 发起 Discussion
- 发送邮件给维护者

再次感谢你的贡献！🎉
