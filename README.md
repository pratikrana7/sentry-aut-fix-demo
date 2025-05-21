# Sentry Auto-Fix Demo App

This is a demo web application that contains intentional JavaScript errors to showcase the Sentry Auto-Fix system. The application generates various errors that are captured by Sentry, which our Auto-Fix system will then automatically fix.

## Features

- Multiple types of JavaScript errors (Reference, Type, Syntax, etc.)
- Browser-specific errors to demonstrate cross-browser fixes
- Form validation errors
- Data processing errors

## Setup Instructions

1. **Install dependencies**

```bash
npm install
```

2. **Configure Sentry**

Edit `public/js/app.js` and replace `YOUR_SENTRY_DSN` with your actual Sentry DSN:

```javascript
Sentry.init({
    dsn: "YOUR_SENTRY_DSN", // Replace with your actual Sentry DSN
    // ...
});
```

3. **Start the server**

```bash
npm start
```

4. **Open the app**

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Directory Structure

```
sentry-auto-fix-demo/
├── public/
│   ├── index.html
│   ├── js/
│   │   ├── app.js
│   │   ├── data-service.js
│   │   ├── form-handler.js
│   │   └── error-triggers.js
├── server.js
└── package.json
```

## Using the Demo

1. **Trigger errors manually**
   - Click the error buttons to trigger specific types of errors
   - Fill and submit the form with invalid data
   - Click "Load Data" to trigger data processing errors

2. **View errors in Sentry**
   - Log into your Sentry dashboard
   - See the errors being reported from your demo app

3. **Run the Auto-Fix system**
   - Execute the Sentry Auto-Fix script
   - Watch as it creates PRs to fix the errors

## Intentional Errors

The app contains the following intentional errors:

1. Reference error: Misspelled variable name (`docment` instead of `document`)
2. No error handling for invalid dates in `formatDate()`
3. No null check in `parseUserData()`
4. No array check in `processData()`
5. Accessing property of potentially undefined object
6. Missing template literal syntax (`{item.name}` instead of `${item.name}`)
7. Incorrect regex pattern for email validation
8. Incorrect property access (`formData.fullName` doesn't exist)
9. Several browser-specific errors

These errors are designed to be easy for an LLM to identify and fix automatically.