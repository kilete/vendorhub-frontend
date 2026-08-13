# VendorHub Frontend

## What is This?

This is the **user-facing website** for your Vendor Order Management System. It includes:
- Home page with features
- User registration (customer & vendor)
- User login
- Customer dashboard
- Vendor dashboard

## Files Included

```
frontend/
├── index.html              (Home page)
├── register.html           (Registration page)
├── login.html              (Login page)
├── customer-dashboard.html (Customer interface)
├── vendor-dashboard.html   (Vendor interface)
└── styles.css              (Modern styling)
```

## Setup Instructions

### Step 1: Download All Files

Download the entire `frontend` folder.

### Step 2: Place in a Folder

Create a folder on your computer called `frontend` and put all these files inside.

### Step 3: Make Sure Backend is Running

Your Node.js backend server must be running on `http://localhost:3000` for the frontend to work.

**Check:** 
- Open PowerShell in your `vendor_system_node` folder
- Type: `npm start`
- You should see: "🚀 VendorHub Server started!"

### Step 4: Open the Website

1. **Double-click `index.html`** to open it in your browser
2. OR right-click and select **"Open with"** → **Your favorite browser**

You should see the beautiful VendorHub home page!

## How to Use

### Testing Registration

1. Click **"Sign Up"** button
2. Choose **"Customer"** or **"Vendor"**
3. Fill in your details
4. Click **"Create Account"**
5. You'll be redirected to login

### Testing Login

**Use the demo admin account:**
- **Email:** admin@platform.com
- **Password:** admin123

If the demo account does not exist in your database, create or repair it from the backend folder:

```bash
npm run admin:create
```

Then open `http://localhost:3000/vendor-login` and log in with the credentials above.

After login:
- **Customers** go to customer dashboard
- **Vendors** go to vendor dashboard
- **Admin** goes to `/admin-dashboard`

### Approving Vendors

1. Log in with `admin@platform.com` / `admin123`.
2. Open `http://localhost:3000/admin-dashboard`.
3. Select **Pending**.
4. Click **Approve** beside the vendor.
5. Refresh Browse Stores.

Only approved vendors are displayed publicly.

## What Each Page Does

### index.html (Home Page)
- Shows features of the platform
- Call-to-action buttons to sign up
- Links to login

### register.html (Sign Up)
- Create new customer or vendor account
- Form validation
- Connects to backend API

### login.html (Login)
- Sign in with email and password
- Stores login token in browser
- Redirects to appropriate dashboard

### customer-dashboard.html
- Browse nearby stores
- View featured vendors
- Placeholder for orders feature

### vendor-dashboard.html
- View sales statistics
- Manage orders
- Manage products & inventory
- View business settings

## Features

✅ Modern, clean design (Jumia-style)
✅ Responsive (works on desktop and mobile)
✅ Connects to Node.js backend API
✅ Secure login with tokens
✅ Different dashboards for customers and vendors
✅ Beautiful gradient colors

## Troubleshooting

### Page shows "This site can't be reached"
- Make sure you opened an HTML file (not a folder)
- Try double-clicking the HTML file directly

### Login doesn't work
- Make sure backend server is running on `http://localhost:3000`
- Check browser console for errors (F12 → Console tab)

### Can't register
- Backend server must be running
- Check the email isn't already registered

### Styling looks broken
- Make sure `styles.css` is in the same folder as the HTML files
- Refresh the page (Ctrl+R or Cmd+R)

## Next Steps

After you test the frontend:

1. **Connect to real database** — Add actual order management
2. **Build the map** — Integrate Google Maps or similar
3. **Add product catalog** — Create product browsing
4. **Payment integration** — Add payment gateway later
5. **Deploy online** — Host on free servers

## Support

If something doesn't work:

1. Check the browser console (F12 → Console)
2. Make sure backend is running
3. Check file paths are correct
4. Try refreshing the page

---

**Frontend is complete and ready to use!** 🎉

Next: Connect the frontend and backend together fully!
