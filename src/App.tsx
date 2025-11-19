import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App_CHATGPT.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const MANUFACTURERS = [
  'Toyota', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi', 'Ford', 'Nissan',
  'Honda', 'Mazda', 'Hyundai', 'Kia', 'Chevrolet', 'Renault', 'Peugeot',
  'Volvo', 'Land Rover', 'Jeep', 'Mitsubishi', 'Suzuki', 'Isuzu', 'Fiat',
  'Opel', 'Citroen', 'Subaru', 'Lexus', 'Infiniti', 'Jaguar', 'Porsche'
].sort()

const YEARS = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString())

function App() {
  const [step, setStep] = useState<'home' | 'vehicle' | 'context' | 'analyzing' | 'results'>('home')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [textInput, setTextInput] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [year, setYear] = useState('')
  const [model, setModel] = useState('')
  const [models, setModels] = useState<string[]>([])
  const [loadingModels, setLoadingModels] = useState(false)
  const [soundLocation, setSoundLocation] = useState('')
  const [occurrence, setOccurrence] = useState('')
  const [description, setDescription] = useState('')
  const [results, setResults] = useState<any>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [chatInput, setChatInput] = useState('')
  const [isChatLoading, setIsChatLoading] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    const fetchModels = async () => {
      if (!manufacturer || !year) {
        setModels([])
        setModel('')
        return
      }
      setLoadingModels(true)
      try {
        const response = await fetch(`${API_URL}/api/vehicle-models?manufacturer=${encodeURIComponent(manufacturer)}&year=${year}`)
        const data = await response.json()
        if (data.models && Array.isArray(data.models) && data.models.length > 0) {
          setModels(data.models)
        } else {
          setModels([])
        }
      } catch (err) {
        console.error('Error:', err)
        setModels([])
      } finally {
        setLoadingModels(false)
      }
    }
    fetchModels()
  }, [manufacturer, year])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      setIsRecording(true)
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      const chunks: Blob[] = []
      
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        setAudioBlob(blob)
        stream.getTracks().forEach(track => track.stop())
        setIsRecording(false)
      }
      
      mediaRecorder.start()
      
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 0.1)
      }, 100)
      
      setTimeout(() => {
        clearInterval(interval)
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop()
        }
      }, 10000)
      
    } catch (err) {
      console.error('Microphone error:', err)
      alert('Could not access microphone')
      setIsRecording(false)
    }
  }

  const submitForAnalysis = async () => {
    setStep('analyzing')
    
    try {
      const formData = new FormData()
      if (audioBlob) {
        formData.append('audio', audioBlob, 'recording.webm')
      }
      formData.append('manufacturer', manufacturer)
      formData.append('year', year)
      formData.append('model', model)
      formData.append('soundLocation', soundLocation)
      formData.append('occurrence', occurrence)
      formData.append('description', description)
      
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        setResults(data)
        setSessionId(data.session_id)
        setStep('results')
      } else {
        alert(data.error || 'Analysis failed')
        setStep('context')
      }
    } catch (err) {
      console.error('Analysis error:', err)
      alert('Connection error')
      setStep('context')
    }
  }

  const sendChatMessage = async () => {
    if (!chatInput.trim() || !sessionId) return

    const userMessage = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsChatLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: userMessage
        })
      })

      const data = await response.json()

      if (data.success) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      } else {
        setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }])
      }
    } catch (err) {
      console.error('Chat error:', err)
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Connection error.' }])
    } finally {
      setIsChatLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <button className="menu-btn">☰</button>
        <div className="header-title">AutoDecX</div>
        <button className="theme-toggle-btn">🌙</button>
      </header>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {step === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="home-container">
              <div className="content-area">
                <p className="app-description">
                  AI-powered vehicle diagnostics to help you identify and solve car issues quickly
                </p>

                <div className="quick-prompts">
                  <button className="prompt-pill" onClick={() => { setDescription('Squealing brake noise'); setTextInput('Squealing brake noise'); }}>
                    Squealing brake noise
                  </button>
                  <button className="prompt-pill" onClick={() => { setDescription('Engine knocking sound'); setTextInput('Engine knocking sound'); }}>
                    Engine knocking sound
                  </button>
                  <button className="prompt-pill" onClick={() => { setDescription('Grinding when turning'); setTextInput('Grinding when turning'); }}>
                    Grinding when turning
                  </button>
                  <button className="prompt-pill" onClick={() => { setDescription('Rattling from exhaust'); setTextInput('Rattling from exhaust'); }}>
                    Rattling from exhaust
                  </button>
                  <button className="prompt-pill" onClick={() => { setDescription('Whistling at high speeds'); setTextInput('Whistling at high speeds'); }}>
                    Whistling at high speeds
                  </button>
                  <button className="prompt-pill" onClick={() => { setDescription('Clunking over bumps'); setTextInput('Clunking over bumps'); }}>
                    Clunking over bumps
                  </button>
                </div>
              </div>

              <div className="bottom-nav">
                <input
                  type="text"
                  className="bottom-text-input"
                  placeholder="Describe your vehicle issue..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
                
                <div className="nav-actions">
                  <button className="nav-icon-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>

                  <button 
                    className={`record-btn ${isRecording ? 'recording' : ''} ${audioBlob ? 'recorded' : ''}`}
                    onClick={isRecording ? () => {} : audioBlob ? () => setStep('vehicle') : startRecording}
                  >
                    {isRecording ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#ef4444">
                        <circle cx="12" cy="12" r="8"/>
                      </svg>
                    ) : audioBlob ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" y1="19" x2="12" y2="22"/>
                      </svg>
                    )}
                  </button>

                  <button className="nav-icon-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                    </svg>
                  </button>
                </div>

                {isRecording && (
                  <div className="recording-indicator">
                    Recording: {recordingTime.toFixed(1)}s
                  </div>
                )}

                {audioBlob && !isRecording && (
                  <div className="recording-indicator">
                    ✓ Recording captured: {recordingTime.toFixed(1)}s
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 'vehicle' && (
            <motion.div key="vehicle" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="selection-card">
                <h2>Vehicle Information</h2>
                <p className="subtitle">A few more details will help improve accuracy</p>
                
                <div className="form-group">
                  <label>Manufacturer</label>
                  <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}>
                    <option value="">Select manufacturer</option>
                    {MANUFACTURERS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Year</label>
                  <select value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="">Select year</option>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Model</label>
                  <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!year || models.length === 0}>
                    <option value="">{loadingModels ? 'Loading...' : !year ? 'Select year first' : 'Select model'}</option>
                    {models.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <button className="btn-primary" onClick={() => setStep('context')} disabled={!manufacturer || !year || !model}>
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 'context' && (
            <motion.div key="context" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="selection-card">
                <h2>Additional Context</h2>
                <p className="subtitle">These details help improve diagnosis accuracy</p>
                
                <div className="form-group">
                  <label>Where's the sound from?</label>
                  <div className="chip-group">
                    {['Engine', 'Brakes', 'Wheels', 'Exhaust', 'Transmission', 'Suspension', 'Steering'].map(loc => (
                      <button key={loc} className={`chip ${soundLocation === loc ? 'active' : ''}`} onClick={() => setSoundLocation(soundLocation === loc ? '' : loc)}>
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>When does it occur?</label>
                  <div className="chip-group">
                    {['Cold start', 'When running', 'Accelerating', 'Braking', 'Turning', 'Constantly'].map(occ => (
                      <button key={occ} className={`chip ${occurrence === occ ? 'active' : ''}`} onClick={() => setOccurrence(occurrence === occ ? '' : occ)}>
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Additional notes</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the sound..." rows={3} />
                </div>

                <button className="btn-primary" onClick={submitForAnalysis}>
                  Analyze Issue
                </button>
              </div>
            </motion.div>
          )}

          {step === 'analyzing' && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                <h2>Analyzing your recording...</h2>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>This may take a few moments</p>
              </div>
            </motion.div>
          )}

          {step === 'results' && results && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="results-container">
                <span className="confidence-badge">{Math.round(results.confidence * 100)}% confidence</span>
                <h2 className="diagnosis-title">{results.predicted_issue}</h2>

                <div className="chat-section">
                  <h3>Ask Follow-up Questions</h3>
                  
                  {chatMessages.length > 0 && (
                    <div className="chat-messages">
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`chat-message ${msg.role}`}>
                          <div className="message-content">{msg.content}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="chat-input-wrapper">
                    <input
                      type="text"
                      className="chat-input"
                      placeholder="Ask about repairs, costs..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      disabled={isChatLoading}
                    />
                    <button className="action-btn send-btn" onClick={sendChatMessage} disabled={!chatInput.trim() || isChatLoading}>
                      ➤
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App