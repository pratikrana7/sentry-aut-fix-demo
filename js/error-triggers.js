// Error Triggers - Functions to deliberately cause errors for demo purposes

// Trigger a ReferenceError
function triggerReferenceError() {
    try {
        // Undefined variable
        console.log(undefinedVariable);
    } catch (error) {
        console.error('Reference Error triggered:', error);
        Sentry.captureException(error);
    }
}

// Trigger a TypeError
function triggerTypeError() {
    try {
        // Calling a non-function
        const obj = {};
        obj.nonExistentFunction();
    } catch (error) {
        console.error('Type Error triggered:', error);
        Sentry.captureException(error);
    }
}

// Trigger a SyntaxError (note: this won't be caught at runtime, but at parse time)
function triggerSyntaxError() {
    try {
        // This is a function that contains an eval with a syntax error
        eval('if (true) { console.log("Missing closing brace"');
    } catch (error) {
        console.error('Syntax Error triggered:', error);
        Sentry.captureException(error);
    }
}

// Trigger a browser-specific error
function triggerBrowserSpecificError() {
    try {
        // This will cause different errors in different browsers
        // In some browsers, document.body.doScroll is not a function
        // In others, it's undefined
        document.body.doScroll('up');
    } catch (error) {
        console.error('Browser-specific Error triggered:', error);
        
        // Add browser information to the error
        Sentry.withScope(function(scope) {
            scope.setTag('browser', navigator.userAgent);
            scope.setExtra('browserInfo', {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                vendor: navigator.vendor
            });
            Sentry.captureException(error);
        });
    }
}

// Trigger different errors based on browser
(function() {
    const ua = navigator.userAgent;
    
    // Intentional Error #11: Browser-specific code with errors
    if (ua.indexOf('Chrome') !== -1) {
        // Chrome-specific error
        // Intentional Error: Incorrect property name
        window.addEventListener('load', function() {
            try {
                // Chrome-specific API with error
                const chromeFeature = window.chrome.loadTimes;
                // This will cause an error in some Chrome versions
                console.log(chromeFeature.firstPaintTime);
            } catch (e) {
                Sentry.captureException(e);
            }
        });
    } else if (ua.indexOf('Firefox') !== -1) {
        // Firefox-specific error
        window.addEventListener('load', function() {
            try {
                // Access a Firefox-specific feature incorrectly
                const firefoxFeature = window.netscape;
                console.log(firefoxFeature.securityPrivilegeManager);
            } catch (e) {
                Sentry.captureException(e);
            }
        });
    } else if (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1) {
        // Safari-specific error
        window.addEventListener('load', function() {
            try {
                // Access a Safari-specific feature incorrectly
                document.createAttribute('pushNotifications').value = true;
            } catch (e) {
                Sentry.captureException(e);
            }
        });
    }
})();