# PROJECT: TRIBULATION - Manus-Agent 協作指南

## 目錄 / Table of Contents

- [如何邀請 manus-agent 協作](#如何邀請-manus-agent-協作)
- [如何生成 TOKEN 讓 AI 訪問倉庫](#如何生成-token-讓-ai-訪問倉庫)
- [配置和使用](#配置和使用)

---

## 如何邀請 manus-agent 協作

### 方法 1: 通過 GitHub 邀請協作者

1. **前往倉庫設置**
   - 打開你的 GitHub 倉庫頁面
   - 點擊 `Settings`（設置）標籤
   
2. **添加協作者**
   - 在左側菜單中選擇 `Collaborators`（協作者）或 `Collaborators and teams`
   - 點擊 `Add people`（添加人員）按鈕
   - 輸入 `manus-agent` 的 GitHub 用戶名或電子郵件
   - 選擇適當的權限級別：
     - `Read`: 只讀訪問
     - `Write`: 可以推送到倉庫
     - `Admin`: 完全管理權限
   
3. **發送邀請**
   - 點擊 `Add [username] to this repository`
   - manus-agent 將收到邀請通知

### 方法 2: 使用 GitHub Teams（適用於組織）

如果你的倉庫屬於一個組織：

1. 前往組織的 `Teams` 頁面
2. 創建一個新團隊或選擇現有團隊
3. 將 manus-agent 添加到團隊
4. 為該團隊分配倉庫訪問權限

---

## 如何生成 TOKEN 讓 AI 訪問倉庫

### 生成 GitHub Personal Access Token (PAT)

GitHub Personal Access Token 允許 AI 代理（如 manus-agent）以編程方式訪問你的倉庫。

#### 步驟 1: 前往 GitHub Token 設置

1. 登錄你的 GitHub 帳戶
2. 點擊右上角的頭像，選擇 `Settings`
3. 在左側菜單底部，選擇 `Developer settings`
4. 選擇 `Personal access tokens` → `Tokens (classic)` 或 `Fine-grained tokens`

#### 步驟 2: 創建新 Token

**使用 Fine-grained tokens（推薦）：**

1. 點擊 `Generate new token` → `Generate new token (fine-grained)`
2. 填寫 Token 詳情：
   - **Token name**: 例如 "manus-agent-access"
   - **Expiration**: 選擇過期時間（建議：90天或自定義）
   - **Description**: 例如 "Token for manus-agent to access repository"
   - **Repository access**: 選擇 "Only select repositories"，然後選擇此倉庫
3. 設置權限（Permissions）：
   - **Repository permissions**:
     - `Contents`: Read and write（讀寫代碼）
     - `Issues`: Read and write（管理 Issues）
     - `Pull requests`: Read and write（管理 PR）
     - `Metadata`: Read-only（自動包含）
     - `Workflows`: Read and write（如果需要修改 Actions）
4. 點擊 `Generate token`

**使用 Classic tokens：**

1. 點擊 `Generate new token` → `Generate new token (classic)`
2. 填寫 Note（備註）：例如 "manus-agent-token"
3. 選擇過期時間
4. 選擇權限範圍（scopes）：
   - ✅ `repo`（完整倉庫訪問）
     - `repo:status`
     - `repo_deployment`
     - `public_repo`
     - `repo:invite`
   - ✅ `workflow`（如果需要修改 GitHub Actions）
   - ✅ `write:packages`（如果需要訪問包）
5. 點擊 `Generate token`

#### 步驟 3: 保存 Token

⚠️ **重要**: Token 只會顯示一次！

1. 立即複製生成的 token
2. 將其保存在安全的地方（如密碼管理器）
3. 不要在代碼或公共位置分享此 token

Token 格式示例：
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # Classic token
github_pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # Fine-grained token
```

---

## 配置和使用

### 為 manus-agent 配置 Token

1. **環境變量方式**（推薦）：
   ```bash
   export GITHUB_TOKEN="your_token_here"
   ```

2. **配置文件方式**：
   創建 `.env` 文件（確保已添加到 `.gitignore`）：
   ```
   GITHUB_TOKEN=your_token_here
   GITHUB_REPO=GreatTribulaton2028/-
   ```

3. **直接在 manus-agent 配置中使用**：
   根據 manus-agent 的具體文檔進行配置

### 驗證 Token 權限

使用 GitHub API 驗證 token：

```bash
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/user
```

或驗證倉庫訪問：

```bash
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/repos/GreatTribulaton2028/-
```

### 使用 Token 克隆倉庫

```bash
git clone https://YOUR_TOKEN@github.com/GreatTribulaton2028/-.git
```

或設置為遠程：

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/GreatTribulaton2028/-.git
```

---

## 安全最佳實踐

1. ✅ **定期輪換 Token**: 每 90 天更新一次
2. ✅ **最小權限原則**: 只授予必要的權限
3. ✅ **監控使用情況**: 定期檢查 token 的使用日誌
4. ✅ **立即撤銷**: 如果 token 洩露，立即在 GitHub 設置中撤銷
5. ✅ **不要提交到代碼**: 始終使用環境變量或安全存儲
6. ✅ **使用 Fine-grained tokens**: 比 classic tokens 更安全

---

## 常見問題

### Q: Token 過期了怎麼辦？
A: 返回 GitHub Developer settings，生成新的 token 並更新配置。

### Q: 如何撤銷 Token？
A: 前往 `Settings` → `Developer settings` → `Personal access tokens`，找到對應的 token，點擊 `Delete` 或 `Revoke`。

### Q: manus-agent 需要哪些最低權限？
A: 至少需要 `repo` 範圍（對於 classic tokens）或 `Contents: Read and write` + `Pull requests: Read and write`（對於 fine-grained tokens）。

### Q: Token 可以用於多個倉庫嗎？
A: Classic tokens 可以訪問所有倉庫（根據權限），Fine-grained tokens 可以在創建時選擇特定倉庫。

---

## 參考資源

- [GitHub Personal Access Tokens 文檔](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub API 文檔](https://docs.github.com/en/rest)
- [管理倉庫協作者](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository)

---

## 聯繫和支持

如有問題，請在倉庫中創建 Issue 或聯繫維護者。

---

*本文檔最後更新: 2026-01-27*
