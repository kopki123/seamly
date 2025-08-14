# Seamly - 模擬服飾電商平台

一個基於 Node.js + Vue.js 的現代化電商平台，提供完整的購物體驗，包括用戶認證、商品管理、購物車、訂單處理和支付集成。

## 🚀 功能特性

### 用戶功能
- 🔐 用戶注冊/登錄/登出
- 📧 郵箱驗證
- 👤 用戶信息管理
- 🛒 購物車管理
- 📦 訂單管理
- 💳 在線支付（綠界金流）

### 商品功能
- 🏷️ 商品分類管理
- 📱 商品展示和搜索
- 📊 商品銷量統計

## 🛠️ 技術棧

### 後端
- **Node.js** - 服務器運行環境
- **Express.js** - Web 框架
- **TypeScript** - 類型安全的 JavaScript
- **Prisma** - 數據庫 ORM
- **PostgreSQL** - 主數據庫
- **JWT** - 身份驗證
- **bcryptjs** - 密碼加密
- **Nodemailer** - 郵件發送
- **Multer** - 文件上傳
- **Helmet** - 安全中間件

### 前端
- **Vue 3** - 漸進式 JavaScript 框架
- **TypeScript** - 類型安全
- **Vue Router** - 路由管理
- **Pinia** - 狀態管理
- **Tailwind CSS** - 樣式框架
- **Vite** - 構建工具
- **Axios** - HTTP 客戶端
- **Swiper** - 輪播組件

### 開發工具
- **ESLint** - 代碼規範
- **Nodemon** - 開發熱重載
- **Prisma Studio** - 數據庫管理

## 📁 項目結構

```
seamly/
├── client/                 # 前端 Vue.js 應用
│   ├── src/
│   │   ├── api/           # API 接口
│   │   ├── components/    # Vue 組件
│   │   ├── stores/        # Pinia 狀態管理
│   │   ├── views/         # 頁面視圖
│   │   └── utils/         # 工具函數
│   └── public/            # 靜態資源
├── src/                   # 後端 Node.js 應用
│   ├── controllers/       # 控制器
│   ├── middleware/        # 中間件
│   ├── models/           # 數據模型
│   ├── routes/           # 路由定義
│   ├── services/         # 業務邏輯
│   └── utils/            # 工具函數
├── prisma/               # 數據庫配置
│   ├── schema.prisma     # 數據庫模式
│   └── migrations/       # 數據庫遷移
└── public/               # 生產環境靜態文件
```

## 測試帳號

您可以使用以下測試帳號登入網站進行測試：

- 帳號：`test@example.com`
- 密碼：`test123`

## 🚀 快速開始

### 環境要求
- Node.js >= 18.0.0
- PostgreSQL >= 14.0
- npm >= 8.0.0

### 安裝步驟

1. **克隆項目**
   ```bash
   git clone https://github.com/kopki123/seamly.git
   cd seamly
   ```

2. **安裝依賴**
   ```bash
   # 安裝後端依賴
   npm install

   # 安裝前端依賴
   cd client
   npm install
   cd ..
   ```

3. **環境配置**
   ```bash
   # 覆制環境變量文件
   cp .env.example .env
   ```

   編輯 `.env` 文件，配置以下變量：
   ```env
   # 數據庫配置
   DB_PASSWORD=password
   DATABASE_URL="postgresql://username:password@localhost:5432/seamly"
   DIRECT_URL="postgresql://username:password@localhost:5432/seamly"

   # JWT 配置
   ACCESS_TOKEN_SECRET=your-jwt-secret
   REFRESH_TOKEN_SECRET=your-jwt-secret

   # Cookie 配置
   COOKIE_SECRET="your-cookie-secret"

   # 郵件配置
   EMAIL=email@gmail.com
   EMAIL_PASSWORD=password

   # supabase配置
   SUPABASE_URL=https://example.supabase.co
   SUPABASE_KEY=your_supabase_key

   # 綠界支付配置
   ECPAY_URL=https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5
   MERCHANTID="your-merchant-id"
   HASHKEY="your-hash-key"
   HASHIV="your-hash-iv"
   HOST="https://website.com"

   # 服務器配置
   PORT=3000
   ```

4. **數據庫設置**
   ```bash
   # 生成 Prisma 客戶端
   npm run prisma

   # 運行數據庫遷移
   npx prisma migrate dev

   # 填充測試數據
   npm run db:seed
   ```

5. **啟動開發服務器**
   ```bash
   # 啟動後端服務器
   npm run dev

   # 新開終端，啟動前端開發服務器
   cd client
   npm run dev
   ```

6. **訪問應用**
   - 前端: http://localhost:5173
   - 後端 API: http://localhost:3000
   - Prisma Studio: http://localhost:5555

## 📦 生產環境部署

### 構建項目
```bash
# 構建前端
cd client
npm run build
cd ..

# 構建後端
npm run build
```

### 啟動生產服務器
```bash
npm start
```


