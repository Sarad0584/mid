// my_simple_app/static/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('nameInput');
    const button = document.getElementById('greetButton');
    const messageDisplay = document.getElementById('responseMessage');

    button.addEventListener('click', async () => {
        const name = inputField.value || 'Anonymous'; // Get name from input

        // Data to send to the Python server
        const data = { name: name };

        try {
            // Make an asynchronous POST request to the Python API endpoint
            const response = await fetch('/api/greet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Check if the server response was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON response from the server
            const result = await response.json();
            
            // Update the message display with the server's response
            messageDisplay.textContent = result.response_message;

        } catch (error) {
            console.error('Error sending request:', error);
            messageDisplay.textContent = 'Error contacting the server.';
            messageDisplay.style.color = 'red';
        }
    });
});
