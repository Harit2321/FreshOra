# Stripe Debugging Guide

## Common Causes & Solutions for "Checkout Session could not be found" Error

### 1. **API Key Mismatch** (Most Common)
- **Problem**: Using different API keys on frontend vs backend
- **Solution**: Ensure both use keys from the same Stripe account

**Check your environment variables:**

**Server (.env):**
```env
STRIPE_SECRET_KEY=sk_test_... (must start with sk_test_ for test mode)
```

**Client (.env):**
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_... (must start with pk_test_ for test mode)
```

### 2. **Mixed Test/Live Keys**
- **Problem**: One key is test mode, other is live mode
- **Solution**: Use matching test keys or matching live keys

### 3. **Session Expiration**
- **Problem**: Stripe sessions expire after 24 hours
- **Solution**: Create fresh session for each payment attempt

### 4. **Environment Variable Loading**
- **Problem**: Environment variables not loaded properly
- **Solution**: Restart both servers after changing .env files

### 5. **CORS Issues**
- **Problem**: Frontend can't reach backend properly
- **Solution**: Check FRONTEND_URL in server .env matches client URL

## Quick Fix Steps:

1. **Verify API Keys Match:**
   - Go to Stripe Dashboard → Developers → API Keys
   - Copy BOTH test keys (secret & publishable)
   - Update both .env files
   - Restart both servers

2. **Check Console Logs:**
   - Look for Stripe errors in browser console
   - Check server logs for session creation errors

3. **Test Session Creation:**
   - Add more logging to see if session is created successfully
   - Verify session ID is returned to frontend

4. **Clear Browser Cache:**
   - Clear cookies and local storage
   - Try in incognito mode