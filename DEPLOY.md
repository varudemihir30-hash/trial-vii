# Deploy to Vercel - Simple Guide

## Option 1: Deploy via Vercel Web Interface (EASIEST - No GitHub needed!)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com
   - Sign in with GitHub/Google/Email

2. **Create New Project:**
   - Click "Add New Project"
   - Choose "Browse" or "Import Git Repository"
   
3. **If you have GitHub repo:**
   - Select your repository: `varudemihir30-hash/trial-vii`
   - Vercel will auto-detect settings
   - **Root Directory:** Set to `Aivora` (or leave empty if deploying from Aivora folder)
   - Click "Deploy"

4. **If you DON'T have GitHub (or want to skip it):**
   - Use Vercel CLI (see Option 2 below)
   - OR zip the `Aivora` folder and use Vercel's drag-and-drop

---

## Option 2: Deploy via Vercel CLI (Direct Deployment)

### Install Vercel CLI:
```bash
npm install -g vercel
```

### Deploy:
```bash
cd /Users/mihirsmacpro/Desktop/aivora-html-package/Aivora
vercel
```

Follow the prompts:
- Login to Vercel
- Link to existing project or create new
- Deploy!

---

## Option 3: Fix GitHub Authentication (Then use Vercel)

### Use SSH (Recommended):

1. **Generate SSH key for GitHub:**
```bash
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/id_ed25519_github
# Press Enter to accept defaults (no passphrase needed)
```

2. **Copy your public key:**
```bash
cat ~/.ssh/id_ed25519_github.pub
```

3. **Add to GitHub:**
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Title: "MacBook Pro"
   - Paste the key you copied
   - Click "Add SSH key"

4. **Update Git remote to use SSH:**
```bash
cd /Users/mihirsmacpro/Desktop/aivora-html-package
git remote set-url origin git@github.com:varudemihir30-hash/trial-vii.git
```

5. **Test SSH connection:**
```bash
ssh -T git@github.com
# Should say: "Hi varudemihir30-hash! You've successfully authenticated..."
```

6. **Push to GitHub:**
```bash
git push -u origin main
```

7. **Then connect to Vercel:**
   - Go to vercel.com
   - Import your GitHub repository
   - Deploy!

---

## Option 4: Use Personal Access Token (Quick Fix)

1. **Create Token:**
   - Go to: https://github.com/settings/tokens
   - "Generate new token (classic)"
   - Name: "Vercel"
   - Scope: `repo`
   - Generate and COPY the token

2. **Update remote URL:**
```bash
cd /Users/mihirsmacpro/Desktop/aivora-html-package
git remote set-url origin https://varudemihir30-hash:YOUR_TOKEN@github.com/varudemihir30-hash/trial-vii.git
```

3. **Push:**
```bash
git push -u origin main
```

---

## Which Option Should You Use?

- **Fastest:** Option 1 (Vercel Web Interface)
- **Most Control:** Option 2 (Vercel CLI)
- **Best for Long-term:** Option 3 (SSH)
- **Quick Fix:** Option 4 (Personal Access Token)

