from flask import Flask, request, jsonify
import os
import subprocess
import google.generativeai as genai

app = Flask(__name__)

# --- Configure Gemini API ---
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not set! Run: setx GOOGLE_API_KEY your_api_key_here")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("models/gemini-2.5-flash")

# --- Routes ---

@app.route('/')
def home():
    return "Flask server is running!"

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "Missing prompt"}), 400
    try:
        response = model.generate_content(prompt)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/gemini-cli', methods=['POST'])
def gemini_cli():
    """Run Gemini CLI commands and return only the text output."""
    try:
        data = request.get_json()
        command = data.get("command")

        if not command:
            return jsonify({"error": "Missing 'command' in request"}), 400

        # Run the Gemini CLI command
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True
        )

        # If the command failed, show stderr
        if result.returncode != 0:
            return jsonify({"error": result.stderr.strip()}), 500

        # Only return the text output
        return jsonify({"response": result.stdout.strip()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# --- Main entry ---
if __name__ == "__main__":
    app.run(debug=True)
