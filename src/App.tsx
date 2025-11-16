import { useState, useRef } from 'react'
import './App.css'

const API_URL = 'https://autodecx-backend-747131025848.europe-west1.run.app'

// Vehicle manufacturers
const MANUFACTURERS = [
  'Toyota', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi', 'Ford', 'Nissan',
  'Honda', 'Mazda', 'Hyundai', 'Kia', 'Chevrolet', 'Renault', 'Peugeot',
  'Volvo', 'Land Rover', 'Jeep', 'Mitsubishi', 'Suzuki', 'Isuzu', 'Fiat',
  'Opel', 'Citroen', 'Subaru', 'Lexus', 'Infiniti', 'Jaguar', 'Porsche'
].sort()

// Sound locations
const SOUND_LOCATIONS = [
  { id: 'engine', label: 'Engine', icon: '🔧' },
  { id: 'front_left_wheel', label: 'Front Left Wheel', icon: '⚙️' },
  { id: 'front_right_wheel', label: 'Front Right Wheel', icon: '⚙️' },
  { id: 'rear_left_wheel', label: 'Rear Left Wheel', icon: '⚙️' },
  { id: 'rear_right_wheel', label: 'Rear Right Wheel', icon: '⚙️' },
  { id: 'exhaust', label: 'Exhaust', icon: '💨' },
  { id: 'transmission', label: 'Transmission', icon: '⚡' },
  { id: 'other', label: 'Other/Unknown', icon: '❓' }
]

// When does it occur options
const OCCURRENCE_OPTIONS = [
  { id: 'cold_start', label: 'Cold start (first start)' },
  { id: 'warm_engine', label: 'Warm engine' },
  { id: 'accelerating', label: 'When accelerating' },
  { id: 'braking', label: 'When braking' },
  { id: 'turning', label: 'When turning' },
  { id: 'idle', label: 'At idle' },
  { id: 'certain_speeds', label: 'At certain speeds' },
  { id: 'constantly', label: 'Constantly' }
]

// Duration options
const DURATION_OPTIONS = [
  'Just started today',
  'A few days',
  '1-2 weeks',
  '1 month',
  '2-3 months',
  'More than 3 months',
  'Not sure'
]

// Progression options
const PROGRESSION_OPTIONS = [
  { id: 'getting_worse', label: 'Getting worse' },
  { id: 'staying_same', label: 'Staying the same' },
  { id: 'getting_better', label: 'Getting better' },
  { id: 'comes_and_goes', label: 'Comes and goes' }
]

function App() {
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 7

  // Vehicle info
  const [manufacturer, setManufacturer] = useState('')
  const [year, setYear] = useState('')
  const [models, setModels] = useState<string[]>([])
  const [loadingModels, setLoadingModels] = useState(false)
  const [model, setModel] = useState('')
  const [soundLocation, setSoundLocation] = useState('')

  // Enhanced context fields
  const [audioDescription, setAudioDescription] = useState('')
  const [occurrence, setOccurrence] = useState<string[]>([])
  const [issueDuration, setIssueDuration] = useState('')
  const [progression, setProgression] = useState('')
  const [recentWork, setRecentWork] = useState('')

  // Audio recording
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number | null>(null)

  // Voice note
  const [isRecordingVoice, setIsRecordingVoice] = useState(false)
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null)
  const [voiceTime, setVoiceTime] = useState(0)
  const voiceRecorderRef = useRef<MediaRecorder | null>(null)
  const voiceChunksRef = useRef<Blob[]>([])
  const voiceTimerRef = useRef<number | null>(null)

  // Analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState('')

  // Fetch models when manufacturer and year are selected
  const fetchModels = async (mfr: string, yr: string) => {
    if (!mfr || !yr) return
    
    setLoadingModels(true)
    try {
      const response = await fetch(
        `${API_URL}/api/vehicle-models?manufacturer=${encodeURIComponent(mfr)}&year=${yr}`
      )
      const data = await response.json()
      
      if (data.models && data.models.length > 0) {
        setModels(data.models)
      } else {
        setModels(['Please type model manually'])
      }
    } catch (err) {
      console.error('Error fetching models:', err)
      setModels(['Error loading models - type manually'])
    } finally {
      setLoadingModels(false)
    }
  }

  // Handle manufacturer change
  const handleManufacturerChange = (value: string) => {
    setManufacturer(value)
    setModels([])
    setModel('')
    if (value && year) {
      fetchModels(value, year)
    }
  }

  // Handle year change
  const handleYearChange = (value: string) => {
    setYear(value)
    setModels([])
    setModel('')
    if (manufacturer && value) {
      fetchModels(manufacturer, value)
    }
  }

  // Toggle occurrence checkbox
  const toggleOccurrence = (id: string) => {
    if (occurrence.includes(id)) {
      setOccurrence(occurrence.filter(o => o !== id))
    } else {
      setOccurrence([...occurrence, id])
    }
  }

  // Start recording audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 10) {
            stopRecording()
            return 10
          }
          return prev + 1
        })
      }, 1000)
    } catch (err) {
      setError('Microphone access denied. Please allow microphone access.')
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  // Start voice note
  const startVoiceNote = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      voiceRecorderRef.current = mediaRecorder
      voiceChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          voiceChunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(voiceChunksRef.current, { type: 'audio/webm' })
        setVoiceBlob(blob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecordingVoice(true)
      setVoiceTime(0)

      voiceTimerRef.current = window.setInterval(() => {
        setVoiceTime(prev => {
          if (prev >= 10) {
            stopVoiceNote()
            return 10
          }
          return prev + 1
        })
      }, 1000)
    } catch (err) {
      setError('Microphone access denied')
    }
  }

  // Stop voice note
  const stopVoiceNote = () => {
    if (voiceRecorderRef.current && isRecordingVoice) {
      voiceRecorderRef.current.stop()
      setIsRecordingVoice(false)
      if (voiceTimerRef.current) {
        clearInterval(voiceTimerRef.current)
      }
    }
  }

  // Analyze audio
  const analyzeAudio = async () => {
    if (!audioBlob) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setError('')
    setCurrentStep(7)

    const formData = new FormData()
    formData.append('audio', audioBlob, 'recording.webm')
    
    const vehicleInfo = {
      manufacturer,
      year: parseInt(year),
      model,
      soundLocation
    }
    formData.append('vehicle_info', JSON.stringify(vehicleInfo))
    
    // Add enhanced context
    if (audioDescription) formData.append('audio_description', audioDescription)
    if (occurrence.length > 0) formData.append('occurrence', JSON.stringify(occurrence))
    if (issueDuration) formData.append('issue_duration', issueDuration)
    if (progression) formData.append('progression', progression)
    if (recentWork) formData.append('recent_work', recentWork)
    if (voiceBlob) formData.append('voice_note', voiceBlob, 'voice.webm')

    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => Math.min(prev + 10, 90))
    }, 1000)

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      clearInterval(progressInterval)
      setAnalysisProgress(100)
      
      if (data.success) {
        setResults(data)
      } else {
        setError(data.error || 'Analysis failed')
      }
    } catch (err: any) {
      clearInterval(progressInterval)
      setError(err.message || 'Network error')
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Navigation
  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const canProceed = () => {
    switch(currentStep) {
      case 1: return manufacturer && year && model
      case 2: return soundLocation
      case 3: return true // Description is optional
      case 4: return occurrence.length > 0
      case 5: return true // All optional
      case 6: return audioBlob !== null
      default: return true
    }
  }

  // Render step content
  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>🚗 Select Your Vehicle</h2>
            
            <div className="form-group">
              <label>Manufacturer</label>
              <select 
                value={manufacturer} 
                onChange={(e) => handleManufacturerChange(e.target.value)}
                className="form-select"
              >
                <option value="">Select manufacturer...</option>
                {MANUFACTURERS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Year</label>
              <select 
                value={year} 
                onChange={(e) => handleYearChange(e.target.value)}
                className="form-select"
                disabled={!manufacturer}
              >
                <option value="">Select year...</option>
                {Array.from({length: 36}, (_, i) => 2025 - i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Model</label>
              {loadingModels ? (
                <div className="loading">Loading models...</div>
              ) : (
                <select 
                  value={model} 
                  onChange={(e) => setModel(e.target.value)}
                  className="form-select"
                  disabled={!year || models.length === 0}
                >
                  <option value="">Select model...</option>
                  {models.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="step-content">
            <h2>📍 Where is the sound coming from?</h2>
            <div className="location-grid">
              {SOUND_LOCATIONS.map(loc => (
                <button
                  key={loc.id}
                  className={`location-btn ${soundLocation === loc.id ? 'selected' : ''}`}
                  onClick={() => setSoundLocation(loc.id)}
                >
                  <span className="icon">{loc.icon}</span>
                  <span className="label">{loc.label}</span>
                </button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="step-content">
            <h2>📝 Describe the sound (optional)</h2>
            <p className="hint">Be specific about what you hear</p>
            <textarea
              value={audioDescription}
              onChange={(e) => setAudioDescription(e.target.value)}
              placeholder="E.g., 'Squealing when I brake' or 'Rattling from engine on cold start'"
              maxLength={200}
              rows={4}
              className="form-textarea"
            />
            <div className="char-count">{audioDescription.length}/200</div>
            
            <div className="voice-note-section">
              <p className="hint">Or record a voice description (10 sec max)</p>
              {!voiceBlob ? (
                <button 
                  onClick={isRecordingVoice ? stopVoiceNote : startVoiceNote}
                  className={`voice-btn ${isRecordingVoice ? 'recording' : ''}`}
                >
                  {isRecordingVoice ? `🔴 Recording... ${voiceTime}s` : '🎤 Record Voice Note'}
                </button>
              ) : (
                <div className="voice-recorded">
                  ✅ Voice note recorded ({voiceTime}s)
                  <button onClick={() => setVoiceBlob(null)} className="btn-small">Re-record</button>
                </div>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="step-content">
            <h2>⏰ When does the sound happen?</h2>
            <p className="hint">Select all that apply</p>
            <div className="checkbox-group">
              {OCCURRENCE_OPTIONS.map(opt => (
                <label key={opt.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={occurrence.includes(opt.id)}
                    onChange={() => toggleOccurrence(opt.id)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="step-content">
            <h2>📅 Additional Information</h2>
            
            <div className="form-group">
              <label>How long have you noticed this?</label>
              <select 
                value={issueDuration} 
                onChange={(e) => setIssueDuration(e.target.value)}
                className="form-select"
              >
                <option value="">Select duration...</option>
                {DURATION_OPTIONS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Has it gotten worse?</label>
              <div className="radio-group">
                {PROGRESSION_OPTIONS.map(opt => (
                  <label key={opt.id} className="radio-label">
                    <input
                      type="radio"
                      name="progression"
                      value={opt.id}
                      checked={progression === opt.id}
                      onChange={(e) => setProgression(e.target.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Any recent repairs or changes? (optional)</label>
              <input
                type="text"
                value={recentWork}
                onChange={(e) => setRecentWork(e.target.value)}
                placeholder="E.g., 'Oil change last week'"
                className="form-input"
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div className="step-content">
            <h2>🎤 Record the Sound</h2>
            <p className="hint">Record for 10 seconds</p>
            
            <div className="recorder-container">
              {!audioBlob ? (
                <>
                  <div className="recorder-display">
                    <div className="mic-icon">🎤</div>
                    <div className="timer">{recordingTime} / 10 seconds</div>
                  </div>
                  <button 
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`record-btn ${isRecording ? 'recording' : ''}`}
                  >
                    {isRecording ? '⏸ Stop Recording' : '● Start Recording'}
                  </button>
                </>
              ) : (
                <>
                  <div className="recorded">
                    ✅ Audio recorded ({recordingTime} seconds)
                  </div>
                  <button onClick={() => setAudioBlob(null)} className="btn-secondary">
                    🔄 Re-record
                  </button>
                </>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}
          </div>
        )

      case 7:
        if (isAnalyzing) {
          return (
            <div className="step-content">
              <h2>🔍 Analyzing...</h2>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${analysisProgress}%`}}></div>
              </div>
              <p>{analysisProgress}%</p>
              <div className="analysis-steps">
                <div className={analysisProgress >= 20 ? 'done' : 'pending'}>• Processing audio...</div>
                <div className={analysisProgress >= 40 ? 'done' : 'pending'}>• Analyzing frequency...</div>
                <div className={analysisProgress >= 60 ? 'done' : 'pending'}>• Matching references...</div>
                <div className={analysisProgress >= 80 ? 'done' : 'pending'}>• AI diagnosis...</div>
              </div>
            </div>
          )
        }

        if (results) {
          return (
            <div className="step-content results">
              <h2>✅ Diagnosis Complete</h2>
              
              <div className="diagnosis-card">
                <h3>🔧 DIAGNOSIS</h3>
                <p className="diagnosis-text">{results.predicted_issue}</p>
                <div className="confidence">
                  <span>Confidence: {Math.round(results.confidence * 100)}%</span>
                  <div className="confidence-bar">
                    <div 
                      className="confidence-fill" 
                      style={{width: `${results.confidence * 100}%`}}
                    ></div>
                  </div>
                </div>
                {results.ai_powered && <div className="ai-badge">✨ AI-Powered</div>}
              </div>

              <div className="technical-details">
                <h3>📊 Technical Details</h3>
                <ul>
                  <li>Frequency: {Math.round(results.metrics.dominant_frequency)} Hz</li>
                  <li>Vibration: {(results.metrics.vibration_level * 100).toFixed(1)}%</li>
                  <li>Duration: {results.metrics.duration}s</li>
                </ul>
              </div>

              {results.issues && results.issues.length > 0 && (
                <div className="issues-list">
                  <h3>⚠️ Issues Detected</h3>
                  <ul>
                    {results.issues.map((issue: any, i: number) => (
                      <li key={i} className={`issue-${issue.severity}`}>
                        {issue.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button onClick={() => window.location.reload()} className="btn-primary">
                🔄 New Diagnosis
              </button>
            </div>
          )
        }

        return null

      default:
        return null
    }
  }

  return (
    <div className="app">
      <header>
        <h1>🚗 AutoDecx</h1>
        <p>AI-Powered Car Diagnostics</p>
      </header>

      <div className="progress-indicator">
        {Array.from({length: totalSteps}, (_, i) => i + 1).map(step => (
          <div 
            key={step} 
            className={`progress-dot ${step === currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}
          >
            {step < currentStep ? '✓' : step}
          </div>
        ))}
      </div>

      <div className="content">
        {renderStep()}
      </div>

      {currentStep < 7 && (
        <div className="navigation">
          {currentStep > 1 && (
            <button onClick={prevStep} className="btn-secondary">
              ← Back
            </button>
          )}
          {currentStep < 6 ? (
            <button 
              onClick={nextStep} 
              disabled={!canProceed()}
              className="btn-primary"
            >
              Continue →
            </button>
          ) : (
            <button 
              onClick={analyzeAudio} 
              disabled={!audioBlob || isAnalyzing}
              className="btn-primary"
            >
              🔍 Analyze Sound
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default App


