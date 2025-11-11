# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import librosa
import numpy as np
import subprocess
import os
from pathlib import Path
import uuid
from datetime import datetime

app = Flask(__name__)

# Configure CORS to allow requests from your frontend
CORS(app, resources={
    r"/upload": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

UPLOAD_FOLDER = Path('./uploads')
UPLOAD_FOLDER.mkdir(exist_ok=True)

# File size limit (10 MB)
MAX_FILE_SIZE = 10 * 1024 * 1024
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'running',
        'service': 'AutoDecX Audio Analysis API',
        'version': '1.0.0'
    })

@app.route('/upload', methods=['POST', 'OPTIONS'])
def upload_audio():
    if request.method == 'OPTIONS':
        return '', 204
    
    print("\n" + "="*60)
    print("🎵 AUDIO UPLOAD RECEIVED")
    print("="*60)
    
    try:
        if 'audio' not in request.files:
            print("❌ No 'audio' field found")
            return jsonify({'error': 'No audio file provided'}), 400
        
        file = request.files['audio']
        
        if file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400
        
        # Use unique filenames
        unique_id = str(uuid.uuid4())[:8]
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        
        original_path = UPLOAD_FOLDER / f"original_{timestamp}_{unique_id}.webm"
        converted_path = UPLOAD_FOLDER / f"converted_{timestamp}_{unique_id}.wav"
        
        print(f"📁 Saving to: {original_path}")
        file.save(original_path)
        
        file_size = original_path.stat().st_size
        print(f"📊 File size: {file_size:,} bytes")
        
        # FFmpeg conversion with explicit codec
        ffmpeg_command = [
            "ffmpeg", "-y",
            "-i", str(original_path),
            "-ac", "1",
            "-ar", "44100",
            "-acodec", "pcm_s16le",
            str(converted_path)
        ]
        
        print("🔄 Running FFmpeg conversion...")
        result = subprocess.run(
            ffmpeg_command,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=30
        )
        print("✅ Conversion complete")
        
        # Analyze with librosa
        print("🔬 Analyzing audio with librosa...")
        y, sr = librosa.load(str(converted_path), sr=None)
        duration = librosa.get_duration(y=y, sr=sr)
        
        # Extract features
        rms = float(np.mean(librosa.feature.rms(y=y)))
        zcr = float(np.mean(librosa.feature.zero_crossing_rate(y)))
        
        # Tempo detection with error handling
        try:
            tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
            tempo = float(tempo.item()) if tempo is not None and tempo.size > 0 else 0.0
        except Exception as e:
            print(f"⚠️ Tempo detection failed: {e}")
            tempo = 0.0
        
        # Spectral features
        spectral_centroid = float(np.mean(librosa.feature.spectral_centroid(y=y, sr=sr)))
        spectral_rolloff = float(np.mean(librosa.feature.spectral_rolloff(y=y, sr=sr)))
        
        print(f"⏱️  Duration: {duration:.2f}s")
        print(f"🎯 RMS: {rms:.4f}")
        print(f"〰️  ZCR: {zcr:.4f}")
        print(f"🎵 Tempo: {tempo:.1f} BPM")
        print(f"📊 Spectral Centroid: {spectral_centroid:.1f} Hz")
        
        # Clean up temporary files
        os.remove(original_path)
        os.remove(converted_path)
        print("🧹 Temporary files cleaned up")
        
        # Build response
        response = {
            'success': True,
            'metrics': {
                'duration': round(duration, 2),
                'sample_rate': int(sr),
                'rms': round(rms, 4),
                'zero_crossing_rate': round(zcr, 4),
                'tempo': round(tempo, 1),
                'dominant_frequency': round(spectral_centroid, 2),
                'spectral_rolloff': round(spectral_rolloff, 2),
                'vibration_level': round(rms, 4)
            },
            'issues': [],
            'predicted_issue': 'No significant issues detected',
            'confidence': 0.85
        }
        
        # Simple rule-based diagnostics
        if rms > 0.15:
            response['issues'].append({
                'type': 'high_vibration',
                'severity': 'warning',
                'message': 'Elevated vibration levels detected'
            })
        
        if spectral_centroid > 3000:
            response['issues'].append({
                'type': 'high_frequency_noise',
                'severity': 'info',
                'message': 'High-frequency noise present - possible belt squeal or bearing wear'
            })
        
        if zcr > 0.2:
            response['issues'].append({
                'type': 'irregular_pattern',
                'severity': 'warning',
                'message': 'Irregular acoustic pattern detected'
            })
        
        if response['issues']:
            response['predicted_issue'] = response['issues'][0]['message']
            response['confidence'] = 0.72
        
        print("="*60)
        print("✅ ANALYSIS COMPLETE")
        print("="*60 + "\n")
        
        return jsonify(response)
    
    except subprocess.TimeoutExpired:
        print("❌ FFmpeg timeout")
        return jsonify({'error': 'Audio conversion timeout'}), 500
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 AutoDecX Audio Analysis Backend")
    print("="*60)
    print("📡 Running on http://127.0.0.1:5000")
    print("🔧 Endpoints:")
    print("   GET  /       → Health check")
    print("   POST /upload → Audio analysis")
    print("="*60 + "\n")
    
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=True
    )