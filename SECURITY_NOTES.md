# 安全性说明 (Security Notes)

生成日期: 2025-11-23

## 📋 概述

本文档记录了项目当前的安全状态、已知问题和建议改进措施。

## 🔒 当前安全状态

### ✅ 良好的安全实践

1. **环境变量管理**
   - ✅ 使用 `.env.*` 文件管理不同环境的配置
   - ✅ API 基础 URL 通过环境变量配置
   - ✅ `.gitignore` 正确配置，不会提交敏感信息

2. **身份验证**
   - ✅ Token 存储在 localStorage（移动端常见做法）
   - ✅ 请求拦截器自动添加 Authorization header
   - ✅ 401 响应自动清理 token 并重定向

3. **构建安全**
   - ✅ 生产环境自动移除 console 和 debugger
   - ✅ Source maps 仅在开发/测试环境启用
   - ✅ Terser 压缩优化

4. **代码质量**
   - ✅ TypeScript 严格模式，类型安全
   - ✅ ESLint 静态代码分析
   - ✅ Pre-commit hooks 确保代码质量

## ⚠️ 已知安全问题

### pnpm 审计结果

```bash
5 low severity vulnerabilities
```

**详细信息**:

- **影响范围**: 仅开发依赖（commitizen, inquirer, tmp）
- **严重程度**: 低
- **生产影响**: 无（这些包不在生产构建中）
- **漏洞类型**: 符号链接相关（tmp 包）

**受影响的包**:

```
tmp@<=0.2.3
  └─ external-editor@>=1.1.1
      └─ inquirer@3.0.0 - 8.2.6 || 9.0.0 - 9.3.7
          └─ commitizen@>=3.0.1
              └─ cz-conventional-changelog@>=3.0.2
```

**漏洞详情**:

- CVE: GHSA-52f5-9888-hmc6
- 描述: tmp 包允许通过符号链接参数进行任意临时文件/目录写入
- 影响: 仅在使用 `pnpm run cz` 提交代码时

**修复选项**:

1. **推荐**: 接受风险（因为仅影响开发工具）
2. **可选**: `pnpm audit fix --force` (可能导致破坏性更改)
3. **替代**: 使用其他提交工具（如直接使用 git commit）

### 当前决策

**不立即修复的原因**:

1. 仅影响开发依赖
2. 不影响生产代码安全性
3. 修复可能引入破坏性更改
4. 替代方案可用（直接使用 git commit）

**监控计划**:

- 定期运行 `pnpm audit`
- 等待上游包更新
- 在安全更新可用时立即应用

## 🛡️ 安全建议

### 1. 高优先级建议

#### 1.1 Token 过期处理

**当前状态**: Token 存储但无过期检查

**建议实现**:

```typescript
// src/utils/auth.ts
export function setToken(token: string, expiresIn?: number) {
  localStorage.setItem(STORAGE_KEY.TOKEN, token)
  if (expiresIn) {
    const expiryTime = Date.now() + expiresIn * 1000
    localStorage.setItem(STORAGE_KEY.TOKEN_EXPIRY, expiryTime.toString())
  }
}

export function getToken(): string | null {
  const token = localStorage.getItem(STORAGE_KEY.TOKEN)
  const expiry = localStorage.getItem(STORAGE_KEY.TOKEN_EXPIRY)

  if (token && expiry) {
    if (Date.now() > parseInt(expiry)) {
      removeToken()
      return null
    }
  }

  return token
}

export function removeToken() {
  localStorage.removeItem(STORAGE_KEY.TOKEN)
  localStorage.removeItem(STORAGE_KEY.TOKEN_EXPIRY)
}
```

#### 1.2 Refresh Token 机制

**当前状态**: 无 refresh token

**建议实现**:

```typescript
// src/utils/request.ts
let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

service.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 等待 token 刷新
        return new Promise(resolve => {
          refreshSubscribers.push((token: string) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`
            resolve(service(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN)
        const { data } = await axios.post('/auth/refresh', { refreshToken })

        const newToken = data.token
        setToken(newToken)

        // 通知所有等待的请求
        refreshSubscribers.forEach(cb => cb(newToken))
        refreshSubscribers = []

        return service(originalRequest)
      } catch (refreshError) {
        removeToken()
        router.push({ name: ROUTE_NAMES.LOGIN })
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)
```

### 2. 中优先级建议

#### 2.1 输入验证

**建议**: 添加客户端输入验证

```typescript
// src/utils/validate.ts
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const regex = /^1[3-9]\d{9}$/
  return regex.test(phone)
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}
```

#### 2.2 CSP (Content Security Policy)

**建议**: 在 `index.html` 中添加 CSP meta 标签

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' data:;
    connect-src 'self' https://api.example.com;
  "
/>
```

#### 2.3 XSS 防护

**当前状态**: Vue 3 默认对模板进行转义

**建议**: 避免使用 `v-html`，如必须使用，请先清理内容

```typescript
import DOMPurify from 'dompurify'

// 使用前清理 HTML
const cleanHTML = DOMPurify.sanitize(dirtyHTML)
```

#### 2.4 HTTPS 强制

**建议**: 确保生产环境使用 HTTPS

```typescript
// vite.config.ts
export default defineConfig(({ mode }) => ({
  server: {
    https: mode === 'production', // 生产环境强制 HTTPS
  },
}))
```

### 3. 低优先级建议

#### 3.1 安全响应头

**建议**: 在服务器配置中添加安全响应头

```nginx
# nginx 配置示例
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

#### 3.2 依赖审计自动化

**建议**: 在 CI/CD 中添加安全审计

```yaml
# .github/workflows/security.yml
name: Security Audit
on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm audit --audit-level=moderate
```

#### 3.3 环境变量验证

**建议**: 在应用启动时验证必需的环境变量

```typescript
// src/utils/env.ts
export function validateEnv() {
  const required = ['VITE_BASE_API', 'VITE_ENV']
  const missing = required.filter(key => !import.meta.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing required env variables: ${missing.join(', ')}`)
  }
}

// src/main.ts
validateEnv()
```

## 📊 安全检查清单

### 开发阶段

- [x] 使用 TypeScript 确保类型安全
- [x] 配置 ESLint 静态分析
- [x] 使用环境变量管理配置
- [ ] 添加输入验证
- [ ] 添加 XSS 防护
- [ ] 实现 Token 过期处理

### 构建阶段

- [x] 生产环境移除 console
- [x] 配置 source maps 策略
- [x] 代码压缩和混淆
- [ ] 添加 SRI (Subresource Integrity)
- [ ] 配置 CSP

### 部署阶段

- [ ] 强制 HTTPS
- [ ] 配置安全响应头
- [ ] 设置 CORS 策略
- [ ] 配置 rate limiting
- [ ] 启用日志记录

### 运维阶段

- [x] 定期依赖审计
- [ ] 监控安全漏洞
- [ ] 定期更新依赖
- [ ] 安全事件响应计划

## 🔍 安全审计历史

| 日期       | 工具        | 发现问题         | 状态         |
| ---------- | ----------- | ---------------- | ------------ |
| 2025-11-23 | pnpm audit  | 5 low (dev deps) | 已知，已记录 |

## 📞 安全报告

如发现安全问题，请通过以下方式报告：

1. **GitHub Security Advisories** (推荐)
2. **Issue tracker** (非敏感问题)
3. **直接联系维护者** (敏感问题)

---

**最后更新**: 2025-11-23  
**下次审计**: 2025-12-23（建议每月一次）
