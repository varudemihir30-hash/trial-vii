# Vertex Tech Io - AI Agency & Technology HTML Template

## Deployment to Vercel

This project is configured for easy deployment to Vercel.

### Quick Deploy Options:

#### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Navigate to the project directory:
   ```bash
   cd /Users/mihirsmacpro/Desktop/aivora-html-package
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts to link your project or create a new one.

#### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Configure:
   - **Root Directory**: Leave as root (or set to `Aivora` if you prefer)
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: `Aivora`
5. Click "Deploy"

#### Option 3: Deploy from Aivora folder directly

If you want to deploy just the Aivora folder:

1. Navigate to the Aivora directory:
   ```bash
   cd Aivora
   ```

2. Run:
   ```bash
   vercel
   ```

### Project Structure

- `Aivora/` - Main website files (HTML, CSS, JS, images)
- `Documentation/` - Documentation files (excluded from deployment)

### Notes

- This is a static HTML site, so no build process is required
- All assets are in the `Aivora/assets/` directory
- The site uses relative paths, so it should work correctly on Vercel

# trial-vii
