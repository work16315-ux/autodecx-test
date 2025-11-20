import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App_CHATGPT.css'
import AutoDecxHomeScreen from './components/AutoDecxHomeScreen'

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
    <AutoDecxHomeScreen />
  )
}

export default App