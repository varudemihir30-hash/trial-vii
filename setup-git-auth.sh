#!/bin/bash

# Script to setup Git authentication with Personal Access Token

echo "=========================================="
echo "GitHub Authentication Setup"
echo "=========================================="
echo ""
echo "Step 1: Create a Personal Access Token"
echo "--------------------------------------"
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Click 'Generate new token' → 'Generate new token (classic)'"
echo "3. Name it: 'Vercel Deployment'"
echo "4. Select scope: Check 'repo' (full control)"
echo "5. Click 'Generate token'"
echo "6. COPY THE TOKEN (you won't see it again!)"
echo ""
echo "Step 2: Enter your token below"
echo "--------------------------------------"
read -p "Enter your Personal Access Token: " GITHUB_TOKEN

if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: Token cannot be empty!"
    exit 1
fi

# Update remote URL with token
echo ""
echo "Updating remote URL..."
git remote set-url origin https://varudemihir30-hash:${GITHUB_TOKEN}@github.com/varudemihir30-hash/trial-vii.git

echo "✓ Remote URL updated!"
echo ""
echo "Step 3: Testing connection..."
git ls-remote origin > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✓ Authentication successful!"
    echo ""
    echo "You can now push your code with:"
    echo "  git push -u origin main"
else
    echo "✗ Authentication failed. Please check your token."
    exit 1
fi

