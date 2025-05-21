#!/bin/bash

# Create project structure
mkdir -p sentry-auto-fix-demo/public/js
cd sentry-auto-fix-demo

# Create necessary files
touch public/index.html
touch public/js/app.js
touch public/js/data-service.js
touch public/js/form-handler.js
touch public/js/error-triggers.js
touch server.js
touch package.json

echo "Directory structure created!"
echo "Next, copy the provided files into their respective locations."