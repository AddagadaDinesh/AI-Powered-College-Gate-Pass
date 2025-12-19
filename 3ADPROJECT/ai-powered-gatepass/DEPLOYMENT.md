# 🚀 Deployment Guide for AI-Powered Gate Pass

## Current Status
- ✅ **Frontend**: Deployed on Vercel
- ❌ **Backend**: Not deployed/not responding on Render

## Problem
Your Vercel frontend is trying to connect to `https://ai-powered-college-gate-pass-3.onrender.com`, but this backend is not responding.

---

## 📋 Step-by-Step Deployment Instructions

### **Option 1: Deploy Backend to Render (Recommended)**

#### Step 1: Push Your Code to GitHub

1. **Check Git status:**
   ```bash
   git status
   ```

2. **Add all files:**
   ```bash
   git add .
   ```

3. **Commit changes:**
   ```bash
   git commit -m "Add Render deployment configuration and fix API endpoints"
   ```

4. **Push to GitHub:**
   ```bash
   git push origin main
   ```
   (If your branch is `master`, use `git push origin master`)

---

#### Step 2: Deploy Backend on Render

1. **Go to Render Dashboard:**
   - Visit: https://dashboard.render.com/
   - Sign in with your GitHub account

2. **Check Existing Service:**
   - Look for `ai-powered-college-gate-pass-3` or similar
   - If it exists, click on it and check the logs
   - If it's sleeping, it should wake up when you access it

3. **If No Service Exists, Create New:**
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository: `AddagadaDinesh/AI-Powered-College-Gate-Pass`
   - Configure:
     - **Name**: `ai-powered-gatepass-backend`
     - **Region**: Oregon (Free)
     - **Branch**: `main` (or `master`)
     - **Root Directory**: Leave empty
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && node server.js`
     - **Plan**: Free

4. **Add Environment Variables:**
   Click "Environment" tab and add:
   ```
   MONGO_URI=mongodb+srv://dineshaddagada_db:Dinesh26@cluster0.xgfejie.mongodb.net/?appName=Cluster0
   JWT_SECRET=your_secret_key
   PORT=5000
   NODE_ENV=production
   ```

5. **Deploy:**
   - Click **"Create Web Service"**
   - Wait for deployment (5-10 minutes)
   - Note the URL (e.g., `https://ai-powered-gatepass-backend.onrender.com`)

---

#### Step 3: Update Frontend API URL

1. **Update `frontend/src/api.js`:**
   
   Change line 8 to use your new Render backend URL:
   ```javascript
   const API_BASE_URL = isLocalhost
       ? "http://localhost:5000"
       : (process.env.REACT_APP_API_URL || "https://YOUR-NEW-RENDER-URL.onrender.com");
   ```

2. **Or set environment variable in Vercel:**
   - Go to Vercel Dashboard
   - Select your project
   - Go to **Settings** → **Environment Variables**
   - Add: `REACT_APP_API_URL` = `https://YOUR-RENDER-URL.onrender.com`
   - Redeploy

---

### **Option 2: Use Existing Render Deployment**

If `https://ai-powered-college-gate-pass-3.onrender.com` exists:

1. **Wake it up:**
   - Visit the URL in browser
   - Wait 30-60 seconds for it to wake up (free tier sleeps)
   - Check `/ping` endpoint: `https://ai-powered-college-gate-pass-3.onrender.com/ping`

2. **Check Render Dashboard:**
   - Go to https://dashboard.render.com/
   - Find your backend service
   - Check logs for errors
   - Verify environment variables are set

3. **If it has errors:**
   - Check the logs
   - Verify the build and start commands match:
     - Build: `cd backend && npm install`
     - Start: `cd backend && node server.js`

---

## 🔍 Troubleshooting

### Backend Not Responding
- **Check Render logs** for errors
- **Verify MongoDB connection** - make sure MONGO_URI is correct
- **Check environment variables** - ensure all are set

### Frontend Still Getting 404
- **Clear browser cache**
- **Check API_BASE_URL** in browser console:
  ```javascript
  // Open browser console (F12) and type:
  localStorage.clear();
  location.reload();
  ```

### CORS Errors
If you see CORS errors, update `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://ai-powered-college-gate-pass-frontend-l8bkjqg3e.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true
}));
```

---

## 📊 Quick Test Commands

### Test Backend Locally
```bash
curl http://localhost:5000/ping
```

### Test Backend on Render
```bash
curl https://YOUR-RENDER-URL.onrender.com/ping
```

### Test Login Endpoint
```bash
curl -X POST https://YOUR-RENDER-URL.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test","role":"student"}'
```

---

## ✅ Verification Checklist

- [ ] Backend code pushed to GitHub
- [ ] Render service created and deployed
- [ ] Environment variables set on Render
- [ ] Backend `/ping` endpoint responds
- [ ] Frontend API_BASE_URL updated
- [ ] Frontend redeployed on Vercel
- [ ] Login works on production

---

## 🆘 Need Help?

If you're still having issues:
1. Share the Render deployment logs
2. Share the browser console errors (F12)
3. Verify the backend URL you're using
