# How to Push to GitHub

## The Issue
You're getting a 403 error because your GitHub token might be expired or doesn't have the right permissions.

## Solution: Create a New Personal Access Token

### Step 1: Create Token
1. Go to: **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. **Name:** `Vercel Deployment`
4. **Expiration:** Choose 90 days or No expiration
5. **Select scopes:** Check **`repo`** (Full control of private repositories)
6. Click **"Generate token"**
7. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Update Remote URL
Run this command (replace `YOUR_NEW_TOKEN` with the token you just copied):

```bash
cd /Users/mihirsmacpro/Desktop/aivora-html-package/Aivora
git remote set-url origin https://varudemihir30-hash:YOUR_NEW_TOKEN@github.com/varudemihir30-hash/trial-vii.git
```

### Step 3: Push
```bash
git push -u origin main
```

---

## Alternative: Use SSH (More Secure)

### Step 1: Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/id_ed25519_github
# Press Enter 3 times (no passphrase)
```

### Step 2: Copy Public Key
```bash
cat ~/.ssh/id_ed25519_github.pub
# Copy the entire output
```

### Step 3: Add to GitHub
1. Go to: **https://github.com/settings/keys**
2. Click **"New SSH key"**
3. **Title:** "MacBook Pro"
4. **Key:** Paste the key you copied
5. Click **"Add SSH key"**

### Step 4: Update Remote and Push
```bash
cd /Users/mihirsmacpro/Desktop/aivora-html-package/Aivora
git remote set-url origin git@github.com:varudemihir30-hash/trial-vii.git
git push -u origin main
```

---

## Quick Test
After updating, test the connection:
```bash
git ls-remote origin
```

If it works, you'll see the branch list. Then push:
```bash
git push -u origin main
```

