// Data Service - Simulates API calls and data processing

// Mock API endpoint
const API_URL = 'https://api.example.com/data';

// Fetch data from API
async function fetchData() {
    // Simulate API response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'User 1', email: 'user1@example.com', joinDate: '2023-01-15' },
                { id: 2, name: 'User 2', email: 'user2@example.com', joinDate: '2023-02-20' },
                { id: 3, name: 'User 3', email: 'user3@example.com', joinDate: '2023-03-10' },
                { id: 4, name: 'User 4', email: null, joinDate: '2023-04-05' }, // Intentional error - null email
                { id: 5, name: 'User 5', email: 'user5@example.com', joinDate: 'invalid-date' } // Intentional error - invalid date
            ]);
        }, 500);
    });
}

// Process data from API
function processData(data) {
    // Intentional Error #4: No array check
    // This will cause errors if data is not an array
    return data.map(item => {
        // Intentional Error #5: Accessing property of potentially undefined object
        const processedItem = parseUserData(item);
        return processedItem;
    });
}

// Display data in the UI
function displayData(data) {
    const container = document.getElementById('data-container');
    
    // Clear previous data
    container.innerHTML = '';
    
    // Intentional Error #6: No null check for container
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('user-item');
        
        // Intentional Error #7: Template literal syntax error
        // Missing $ before {item.name}
        div.innerHTML = `<p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Email:</strong> ${item.email}</p>
                        <p><strong>Joined:</strong> ${item.joined}</p>`;
        
        container.appendChild(div);
    });
}

// Load and display data
async function loadData() {
    try {
        const data = await fetchData();
        const processedData = processData(data);
        displayData(processedData);
    } catch (error) {
        console.error('Error loading data:', error);
        Sentry.captureException(error);
        
        // Display error message
        const container = document.getElementById('data-container');
        container.innerHTML = '<p style="color: red;">Error loading data. Please try again.</p>';
    }
}