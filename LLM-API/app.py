from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import InferenceClient
import time
import os

app = Flask(__name__)
CORS(app)


# List of available HuggingFace API keys
api_keys = [
    "hf_**********************************"
]

# Track usage count and timestamps
usage_data = {key: {"count": 0, "last_reset": time.time()} for key in api_keys}

# Maximum requests per key per hour
HOURLY_LIMIT = 75

# Function to get the current API key based on usage limits
def get_available_api_key():
    current_time = time.time()
    for key, data in usage_data.items():
        # Reset the usage if more than an hour has passed
        if current_time - data["last_reset"] >= 3600:
            usage_data[key] = {"count": 0, "last_reset": current_time}
        
        # Check if the key is under the hourly limit
        if data["count"] < HOURLY_LIMIT:
            # Increment the count for the key and return it
            usage_data[key]["count"] += 1
            return key
    
    raise Exception("All API keys have reached their hourly limit.")

# Chat completion endpoint
@app.route('/chat', methods=['POST'])
def chat_completion():
    try:
        # Get the user input from the request body (JSON format)
        data = request.json
        user_message = data.get("message")

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Get an available API key
        api_key = get_available_api_key()

        # Initialize the Inference Client with the available API key
        client = InferenceClient(api_key=api_key)

        # Collect the entire response from the model
        full_response = ""
        for message in client.chat_completion(
            model="meta-llama/Llama-3.2-1B-Instruct",
            messages=[{"role": "user", "content": user_message}],
            max_tokens=500,
            stream=True
        ):
            full_response += message.choices[0].delta.content

        # Return the full response as a JSON object
        return jsonify({
            "status": 1,
            "response": full_response
        })
    
    except Exception as e:
        return jsonify({
            "status": 0,
            "error": str(e)
        }), 500
