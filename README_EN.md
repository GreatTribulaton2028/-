# PROJECT: TRIBULATION - Manus-Agent Collaboration Guide

## Table of Contents

- [How to Invite manus-agent to Collaborate](#how-to-invite-manus-agent-to-collaborate)
- [How to Generate a TOKEN for AI Repository Access](#how-to-generate-a-token-for-ai-repository-access)
- [Configuration and Usage](#configuration-and-usage)

---

## How to Invite manus-agent to Collaborate

### Method 1: Invite via GitHub Collaborators

1. **Navigate to Repository Settings**
   - Go to your GitHub repository page
   - Click on the `Settings` tab
   
2. **Add Collaborator**
   - In the left sidebar, select `Collaborators` or `Collaborators and teams`
   - Click the `Add people` button
   - Enter the GitHub username or email of `manus-agent`
   - Choose the appropriate permission level:
     - `Read`: Read-only access
     - `Write`: Can push to the repository
     - `Admin`: Full administrative access
   
3. **Send Invitation**
   - Click `Add [username] to this repository`
   - manus-agent will receive an invitation notification

### Method 2: Use GitHub Teams (for Organizations)

If your repository belongs to an organization:

1. Go to the organization's `Teams` page
2. Create a new team or select an existing one
3. Add manus-agent to the team
4. Grant the team access to the repository

---

## How to Generate a TOKEN for AI Repository Access

### Creating a GitHub Personal Access Token (PAT)

GitHub Personal Access Tokens allow AI agents (like manus-agent) to programmatically access your repository.

#### Step 1: Navigate to GitHub Token Settings

1. Log in to your GitHub account
2. Click your profile picture in the top right, select `Settings`
3. In the left sidebar at the bottom, select `Developer settings`
4. Choose `Personal access tokens` → `Tokens (classic)` or `Fine-grained tokens`

#### Step 2: Create New Token

**Using Fine-grained tokens (Recommended):**

1. Click `Generate new token` → `Generate new token (fine-grained)`
2. Fill in token details:
   - **Token name**: e.g., "manus-agent-access"
   - **Expiration**: Choose expiration period (recommended: 90 days or custom)
   - **Description**: e.g., "Token for manus-agent to access repository"
   - **Repository access**: Select "Only select repositories", then choose this repository
3. Set Permissions:
   - **Repository permissions**:
     - `Contents`: Read and write (read/write code)
     - `Issues`: Read and write (manage Issues)
     - `Pull requests`: Read and write (manage PRs)
     - `Metadata`: Read-only (automatically included)
     - `Workflows`: Read and write (if modifying Actions is needed)
4. Click `Generate token`

**Using Classic tokens:**

1. Click `Generate new token` → `Generate new token (classic)`
2. Fill in Note: e.g., "manus-agent-token"
3. Select expiration date
4. Select scopes:
   - ✅ `repo` (full repository access)
     - `repo:status`
     - `repo_deployment`
     - `public_repo`
     - `repo:invite`
   - ✅ `workflow` (if modifying GitHub Actions is needed)
   - ✅ `write:packages` (if package access is needed)
5. Click `Generate token`

#### Step 3: Save the Token

⚠️ **Important**: The token will only be shown once!

1. Copy the generated token immediately
2. Store it in a secure location (like a password manager)
3. Never share this token in code or public places

Token format examples:
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # Classic token
github_pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # Fine-grained token
```

---

## Configuration and Usage

### Configure Token for manus-agent

1. **Environment Variable Method** (Recommended):
   ```bash
   export GITHUB_TOKEN="your_token_here"
   ```

2. **Configuration File Method**:
   Create a `.env` file (make sure it's added to `.gitignore`):
   ```
   GITHUB_TOKEN=your_token_here
   GITHUB_REPO=GreatTribulaton2028/-
   ```

3. **Use Directly in manus-agent Configuration**:
   Configure according to manus-agent's specific documentation

### Verify Token Permissions

Verify the token using GitHub API:

```bash
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/user
```

Or verify repository access:

```bash
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/repos/GreatTribulaton2028/-
```

### Clone Repository Using Token

```bash
git clone https://YOUR_TOKEN@github.com/GreatTribulaton2028/-.git
```

Or set as remote:

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/GreatTribulaton2028/-.git
```

---

## Security Best Practices

1. ✅ **Rotate Tokens Regularly**: Update every 90 days
2. ✅ **Principle of Least Privilege**: Grant only necessary permissions
3. ✅ **Monitor Usage**: Regularly check token usage logs
4. ✅ **Revoke Immediately**: If a token is compromised, revoke it immediately in GitHub settings
5. ✅ **Never Commit to Code**: Always use environment variables or secure storage
6. ✅ **Use Fine-grained Tokens**: More secure than classic tokens

---

## Frequently Asked Questions

### Q: What if my token expires?
A: Return to GitHub Developer settings, generate a new token, and update your configuration.

### Q: How do I revoke a token?
A: Go to `Settings` → `Developer settings` → `Personal access tokens`, find the token, and click `Delete` or `Revoke`.

### Q: What are the minimum permissions required for manus-agent?
A: At minimum, you need the `repo` scope (for classic tokens) or `Contents: Read and write` + `Pull requests: Read and write` (for fine-grained tokens).

### Q: Can a token be used for multiple repositories?
A: Classic tokens can access all repositories (based on permissions), while fine-grained tokens can be configured for specific repositories during creation.

---

## Reference Resources

- [GitHub Personal Access Tokens Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Managing Repository Collaborators](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository)

---

## Contact and Support

For questions, please create an Issue in the repository or contact the maintainers.

---

*Last updated: 2026-01-27*
