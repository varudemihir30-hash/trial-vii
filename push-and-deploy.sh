#!/bin/bash

echo "🚀 Starting GitHub Push and Vercel Deployment..."
echo ""

# Step 1: Push to GitHub
echo "📤 Step 1: Pushing to GitHub..."
echo ""

# Check if GitHub CLI is authenticated
if gh auth status &>/dev/null; then
    echo "✅ GitHub CLI is authenticated"
    git push -u origin main
else
    echo "⚠️  GitHub CLI needs authentication"
    echo "Please authenticate GitHub CLI first:"
    echo "  gh auth login"
    echo ""
    echo "Or push manually with:"
    echo "  git push -u origin main"
    echo ""
    read -p "Press Enter after you've pushed to GitHub, or type 'skip' to deploy without pushing: " response
    if [ "$response" = "skip" ]; then
        echo "⏭️  Skipping GitHub push"
    fi
fi

echo ""
echo "📦 Step 2: Deploying to Vercel..."
echo ""

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI found"
    echo "Deploying to Vercel..."
    vercel --prod
else
    echo "❌ Vercel CLI not found"
    echo "Install it with: npm install -g vercel"
    echo "Or deploy via: https://vercel.com"
fi

echo ""
echo "✅ Done!"





