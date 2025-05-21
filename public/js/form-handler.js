// Form Handler - Manages form submissions and validation

// Validate email format
function validateEmail(email) {
    // Intentional Error #8: Incorrect regex pattern
    // Missing the '@' in the regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Validate form data
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!formData.email || formData.email.trim() === '') {
        errors.push('Email is required');
    } else if (!validateEmail(formData.email)) {
        errors.push('Email is invalid');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// Process form submission
function processForm(formData) {
    // Intentional Error #9: Incorrect property access
    // 'fullName' doesn't exist, it should be 'name'
    return {
        name: formData.fullName,
        email: formData.email,
        joinDate: new Date().toISOString().slice(0, 10)
    };
}

// Submit form
function submitForm() {
    try {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        
        const formData = {
            name: nameInput.value,
            email: emailInput.value
        };
        
        const validation = validateForm(formData);
        if (!validation.valid) {
            alert('Form validation failed: ' + validation.errors.join(', '));
            return;
        }
        
        const processedData = processForm(formData);
        
        // Simulate API submission
        setTimeout(() => {
            // Intentional Error #10: Accessing property of undefined
            // processedData.fullName doesn't exist
            alert(`Form submitted successfully for ${processedData.fullName}!`);
            
            // Clear form
            nameInput.value = '';
            emailInput.value = '';
        }, 500);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        Sentry.captureException(error);
        alert('An error occurred while submitting the form. Please try again.');
    }
}