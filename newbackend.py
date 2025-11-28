import os
import uuid
import json
import requests
from pathlib import Path
from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename

# Your FastAPI endpoint and API key (hardcoded)
API_BASE_URL = "http://localhost:8000"  # Change to your FastAPI port
MMB_API_KEY = "mmb_fbBZXdJiCYOi0Q0dyg5lLUh5fDjF4DdBcwnKfswfhRU"  # Replace with your actual generated API key

# if not MMB_API_KEY or MMB_API_KEY == "mmb_xyz":
#     print("WARNING: Please replace 'mmb_xyz' with your actual API key!")

# local modules
from file_processor import process_file, validate_patient_data

app = Flask(__name__, template_folder="templates", static_folder="static")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
ALLOWED_EXTENSIONS = {"pdf", "csv"}

# in-memory session store
SESSIONS = {}

# helpers
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_clean_text(result):
    """Extract text from API response"""
    if result is None:
        return "No response from agent."
    if isinstance(result, str):
        return result
    if isinstance(result, dict):
        # Check for common response keys
        for key in ("response", "text", "message", "analysis"):
            if key in result and isinstance(result[key], str):
                return result[key]
        # Check for nested response structure
        if "data" in result and isinstance(result["data"], dict):
            for key in ("response", "text", "message"):
                if key in result["data"]:
                    return result["data"][key]
        return json.dumps(result, default=str)
    return str(result)

def call_mmb_api(endpoint, payload):
    """
    Call your FastAPI microbiome analysis API
    
    Args:
        endpoint: API endpoint ('/api/analyze' or '/api/predict')
        payload: Request payload
    
    Returns:
        API response
    """
    url = f"{API_BASE_URL}{endpoint}"
    headers = {
        "X-API-Key": MMB_API_KEY,
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        response.raise_for_status()
        
        data = response.json()
        
        if data.get("success"):
            return data.get("response", "No response received")
        else:
            return f"API Error: {data.get('error', 'Unknown error')}"
    
    except requests.exceptions.Timeout:
        return "API request timed out. Please try again."
    except requests.exceptions.ConnectionError:
        return "Could not connect to analysis API. Please ensure the API server is running."
    except requests.exceptions.RequestException as e:
        return f"API request failed: {str(e)}"
    except Exception as e:
        return f"Unexpected error: {str(e)}"

# routes 

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/upload", methods=["POST"])
def upload():
    """Handles PDF/CSV uploads via multipart form-data."""
    if "file" not in request.files:
        return jsonify({"success": False, "error": "No file uploaded"}), 400

    f = request.files["file"]
    if f.filename == "":
        return jsonify({"success": False, "error": "No file selected"}), 400

    if not allowed_file(f.filename):
        return jsonify({"success": False, "error": "Invalid file type"}), 400

    filename = secure_filename(f.filename)
    tmp_path = os.path.join(UPLOAD_FOLDER, f"{uuid.uuid4()}_{filename}")
    f.save(tmp_path)

    try:
        # extract patient features
        patient_data = process_file(tmp_path)
        validate_patient_data(patient_data)

        # Initial analysis - call your FastAPI endpoint
        payload = {
            "patient_data": patient_data,
            "history": [],
            "new_message": "",
            "initial_analysis": True,
            "previous_prediction": ""
        }
        
        # Use /api/predict for initial analysis (faster)
        api_response = call_mmb_api("/api/predict", {"patient_data": patient_data})
        analysis_text = extract_clean_text(api_response)

        # create chat session
        session_id = str(uuid.uuid4())
        SESSIONS[session_id] = {
            "patient_data": patient_data,
            "initial_analysis": analysis_text,
            "history": []
        }

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    finally:
        try:
            os.remove(tmp_path)
        except Exception:
            pass

    return jsonify({
        "success": True,
        "session_id": session_id,
        "analysis": analysis_text,
        "patient_data": patient_data
    })


@app.route("/api/chat", methods=["POST"])
def chat():
    """Handle follow-up chat messages"""
    data = request.get_json() or {}
    session_id = data.get("session_id")
    message = (data.get("message") or "").strip()

    if not session_id or session_id not in SESSIONS:
        return jsonify({"error": "invalid session_id"}), 400

    if not message:
        return jsonify({"error": "empty message"}), 400

    session = SESSIONS[session_id]
    session["history"].append(("user", message))

    try:
        # Call your FastAPI /api/analyze endpoint
        payload = {
            "patient_data": session["patient_data"],
            "history": session["history"],
            "new_message": message,
            "initial_analysis": False,
            "previous_prediction": session.get("initial_analysis", "")
        }
        
        api_response = call_mmb_api("/api/analyze", payload)
        reply = extract_clean_text(api_response)
        
    except Exception as e:
        reply = f"Agent error: {str(e)}"

    session["history"].append(("agent", reply))
    return jsonify({"reply": reply})

# debug endpoint
@app.route("/api/session/<sid>")
def session_debug(sid):
    s = SESSIONS.get(sid)
    if not s:
        return jsonify({"error": "not found"}), 404
    return jsonify(s)

# Health check endpoint
@app.route("/health")
def health():
    """Check if backend and API connection are healthy"""
    try:
        # Test API connection
        url = f"{API_BASE_URL}/health"
        response = requests.get(url, timeout=5)
        api_status = "connected" if response.status_code == 200 else "error"
    except:
        api_status = "disconnected"
    
    return jsonify({
        "status": "healthy",
        "api_connection": api_status,
        "api_url": API_BASE_URL,
        "sessions": len(SESSIONS)
    })

if __name__ == "__main__":
    print("\n" + "="*60)
    print("OncoBiome Frontend Backend Server")
    print("="*60)
    print(f"\nAPI Endpoint: {API_BASE_URL}")
    print(f"API Key: {MMB_API_KEY[:15]}..." if MMB_API_KEY else "API Key: NOT SET")
    print("\nServer starting on http://127.0.0.1:5001")
    print("="*60 + "\n")
    
    # Run on same port or different - adjust as needed
    # If FastAPI runs on 5000, use 5001 for Flask
    # Or run FastAPI on different port (8000) and keep Flask on 5000
    app.run(host="0.0.0.0", port=5000, debug=True)