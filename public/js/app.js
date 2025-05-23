// Initialize Sentry
console.log('Initializing Sentry...');
if (typeof Sentry === 'undefined') {
    console.warn('Sentry is not available - using mock implementation');
} else {
    Sentry.init({
        dsn: "https://61edb47cb5f442c4602cbe8ebf03b17f@o4509356547833856.ingest.de.sentry.io/4509359456125008",
        integrations: [new Sentry.BrowserTracing()],
        tracesSampleRate: 1.0,
        environment: "demo",
        release: "demo-app@1.0.0",
        debug: true, // Enable debug mode
        beforeSend(event) {
            console.log('Sentry beforeSend called with event:', event);
            // Increment error count in localStorage
            const currentCount = parseInt(localStorage.getItem('errorCount') || '0');
            console.log('Current error count:', currentCount);
            localStorage.setItem('errorCount', currentCount + 1);
            
            // Update UI
            const errorCountElement = document.getElementById('error-count');
            console.log('Error count element:', errorCountElement);
            if (errorCountElement) {
                errorCountElement.textContent = currentCount + 1;
                console.log('Updated error count to:', currentCount + 1);
            }
            
            return event;
        }
    });
    console.log('Sentry initialized');
}

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Global error handler caught:', {message, source, lineno, colno, error});
    return false; // Let the default handler run
};

// Application initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Demo application initialized');
    
    // Intentional Error #1: Undefined variable
    // This will cause a ReferenceError when the page loads
    try {
        // This has a typo - 'document' is misspelled
        const bodyElement = docment.querySelector('body');
        console.log(bodyElement);
    } catch (e) {
        Sentry.captureException(e);
    }
});

// Global utility functions
function formatDate(dateString) {
    // Intentional Error #2: No error handling for invalid dates
    // This will throw an error if dateString is invalid
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function parseUserData(data) {
    // Intentional Error #3: No null check
    // This will throw if data is null or undefined
    return {
        name: data.name.trim(),
        email: data.email.toLowerCase(),
        joined: formatDate(data.joinDate)
    };
}