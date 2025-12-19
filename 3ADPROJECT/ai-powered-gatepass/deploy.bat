@echo off
echo ========================================
echo   AI-Powered Gate Pass - Quick Deploy
echo ========================================
echo.

echo [1/4] Checking Git status...
git status
echo.

echo [2/4] Adding all changes...
git add .
echo.

echo [3/4] Committing changes...
git commit -m "Fix: Update CORS config, add Render deployment files, and fix API endpoints"
echo.

echo [4/4] Pushing to GitHub...
git push origin main
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Go to https://dashboard.render.com/
echo 2. Check your backend service status
echo 3. If needed, create new service using render.yaml
echo 4. Add environment variables (MONGO_URI, JWT_SECRET)
echo 5. Wait for deployment to complete
echo.
echo See DEPLOYMENT.md for detailed instructions
echo.
pause
