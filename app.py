# my_simple_app/app.py

from flask import Flask, render_template, jsonify, request

# Initialize the Flask application
app = Flask(__name__)

# --- Frontend Route ---
# The main route that renders the HTML page
@app.route('/')
def index():
    # Flask looks for 'index.html' inside the 'templates' folder
    return render_template('index.html')

# --- Backend API Endpoint ---
# A simple endpoint that the JavaScript will call
@app.route('/api/greet', methods=['POST'])
def greet():
    # Get data sent from the JavaScript (e.g., {"name": "User"})
    data = request.get_json()
    user_name = data.get('name', 'World') # Default to 'World' if no name is provided
    
    # Generate the response message
    message = f"Hello, {user_name}! Your data was successfully processed by the Python server."
    
    # Send back a JSON response
    return jsonify({"response_message": message})

# Run the application
if __name__ == '__main__':
    # 'debug=True' is great for development, turn it off for production
    app.run(debug=True)
