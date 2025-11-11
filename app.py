from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess
import numpy as np
import librosa

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_audio():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file uploaded"}), 400

    file = request.files["audio"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    # Save uploaded file
    original_path = os.path.join(UPLOAD_FOLDER, "original_" + file.filename)
    file.save(original_path)

    # Convert to 16-bit PCM WAV
    converted_path = os.path.join(UPLOAD_FOLDER, "recording_converted.wav")
    try:
        subprocess.run([
            "ffmpeg",
            "-y",
            "-i", original_path,
            "-ac", "1",              # mono
            "-ar", "44100",          # standard sample rate
            "-f", "wav",
            converted_path
        ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as e:
        print("FFmpeg error:", e.stderr.decode())
        return jsonify({"error": "FFmpeg conversion failed"}), 500

    # Load and analyze audio
    try:
        y, sr = librosa.load(converted_path, sr=None)
        print(f"Loaded samples: {len(y)}, Sample Rate: {sr}")

        if len(y) == 0:
            return jsonify({"error": "Audio file loaded empty"}), 500

        duration = librosa.get_duration(y=y, sr=sr)
        rms = float(np.mean(librosa.feature.rms(y=y)))
        zcr = float(np.mean(librosa.feature.zero_crossing_rate(y)))
        tempo, _ = librosa.beat.beat_track(y=y, sr=sr)

        return jsonify({
            "message": "✅ Audio received and analyzed successfully",
            "analysis": {
                "duration": round(duration, 2),
                "rms": round(rms, 4),
                "zcr": round(zcr, 4),
                "tempo_bpm": round(float(tempo), 2)
            }
        }), 200

    except Exception as e:
        print("Librosa analysis error:", str(e))
        return jsonify({"error": f"Audio analysis failed: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
