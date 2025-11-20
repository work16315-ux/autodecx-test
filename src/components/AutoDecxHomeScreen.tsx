import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import SettingsScreen from './SettingsScreen'
import NotificationsScreen from './NotificationsScreen'

// Icon components (using simple SVG for now, can be replaced with actual custom icons)
const HeadphonesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
)

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

// Custom AutoDecx Icon Component - Clean SVG version
const AutoDecxIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="autoDecxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    {/* Outer circle */}
    <circle cx="12" cy="12" r="10" stroke="url(#autoDecxGradient)" strokeWidth="2" fill="none" />
    {/* Middle circle */}
    <circle cx="12" cy="12" r="6" stroke="url(#autoDecxGradient)" strokeWidth="2" fill="none" />
    {/* Center dot */}
    <circle cx="12" cy="12" r="2.5" fill="url(#autoDecxGradient)" />
  </svg>
)

const DXAvatarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="url(#dx-gradient)" />
    <defs>
      <linearGradient id="dx-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
  </svg>
)

const GridIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"></rect>
    <rect x="14" y="3" width="7" height="7" rx="1"></rect>
    <rect x="14" y="14" width="7" height="7" rx="1"></rect>
    <rect x="3" y="14" width="7" height="7" rx="1"></rect>
  </svg>
)

// Menu Icons
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
)

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
)

const NewChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
)

const GalleryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
)

const ShoppingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
)

const ProjectIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
)

// Dropdown Menu Icons
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const MessageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
)

// Attachment Menu Icons
const VoiceNoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" x2="12" y1="19" y2="22"></line>
  </svg>
)

const ImageVideoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="9" cy="9" r="2"></circle>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
  </svg>
)

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" x2="8" y1="13" y2="13"></line>
    <line x1="16" x2="8" y1="17" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
)

const MileageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
)

const StopIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="12" height="12" rx="2"></rect>
  </svg>
)

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
)

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
)

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
)

// Post Action Icons
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
)

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
)

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
)

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
)

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" y1="2" x2="12" y2="15"></line>
  </svg>
)

const ThumbsUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
  </svg>
)

const ThumbsDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
  </svg>
)

// Sound Wave Animation Component
const SoundWaveAnimation = ({ isActive, analyser }: { isActive: boolean; analyser: AnalyserNode | null }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      if (!isActive) {
        // Draw flat line when not active
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = '#9ca3af'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)
        ctx.lineTo(canvas.width, canvas.height / 2)
        ctx.stroke()
        return
      }

      if (analyser) {
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        analyser.getByteTimeDomainData(dataArray)

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.lineWidth = 2
        ctx.strokeStyle = '#8b5cf6'
        ctx.beginPath()

        const sliceWidth = canvas.width / bufferLength
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0
          const y = (v * canvas.height) / 2

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }

          x += sliceWidth
        }

        ctx.stroke()
      } else {
        // Simulated wave animation when no analyser
        const time = Date.now() / 500
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = '#8b5cf6'
        ctx.lineWidth = 2
        ctx.beginPath()

        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + Math.sin((x / 20) + time) * 15 * Math.sin(time * 2)
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, analyser])

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={40}
      className="w-full h-full"
      style={{ maxWidth: '100%' }}
    />
  )
}

const AutoDecxHomeScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isHeadphonesDropdownOpen, setIsHeadphonesDropdownOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(8) // Number of unread notifications
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false)
  
  // Audio recording states
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'stopped'>('idle')
  const [showSendButton, setShowSendButton] = useState(false)
  const [isNewChat, setIsNewChat] = useState(false)
  const [audioMessages, setAudioMessages] = useState<Array<{ id: string; duration: string; timestamp: Date }>>([])
  const [showHomeContent, setShowHomeContent] = useState(true)
  const [chatSessions, setChatSessions] = useState<Array<{ id: string; title: string; timestamp: Date }>>([])
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)
  const [hasDXResponded, setHasDXResponded] = useState(false) // Track if DX has responded
  const [showVehicleForm, setShowVehicleForm] = useState(false) // Show vehicle details form
  const [vehicleDetails, setVehicleDetails] = useState({ manufacturer: '', year: '', model: '' })
  const [hasSubmittedVehicleDetails, setHasSubmittedVehicleDetails] = useState(false)
  const [isEditingAudio, setIsEditingAudio] = useState(false)
  const [isEditingVehicle, setIsEditingVehicle] = useState(false)
  const [manufacturers, setManufacturers] = useState<string[]>([])
  const [years, setYears] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [loadingModels, setLoadingModels] = useState(false)

  // Sample diagnosis history data
  const diagnosisHistory = [
    "Insurance package recommendations",
    "Lyric transcription assistance",
    "AI vehicle diagnosis apps",
    "December budget plan",
    "Dream rewrite feedback",
    "Choral song lyrics",
    "SME point of sale app",
    "Structure tables request"
  ]

  // Calculate sidebar width as 2/3 of viewport width
  const sidebarWidthPercent = 66.666; // 2/3 of screen
  
  // Recording timer
  const recordingTimerRef = useRef<number | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  
  // Haptic feedback simulation
  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10) // Short haptic feedback
    }
  }
  
  // Handle DX button click - Start/Stop recording
  const handleDXButtonClick = async () => {
    triggerHaptic()
    
    if (recordingState === 'idle') {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        setAudioStream(stream)
        
        // Set up audio context and analyser for waveform
        const context = new AudioContext()
        const source = context.createMediaStreamSource(stream)
        const analyserNode = context.createAnalyser()
        analyserNode.fftSize = 2048
        source.connect(analyserNode)
        
        setAudioContext(context)
        setAnalyser(analyserNode)
        
        // Set up media recorder
        const recorder = new MediaRecorder(stream)
        audioChunksRef.current = []
        
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data)
          }
        }
        
        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
          setAudioBlob(blob)
        }
        
        recorder.start()
        setMediaRecorder(recorder)
        setRecordingState('recording')
        setRecordingDuration(0)
        
        // Start timer
        recordingTimerRef.current = window.setInterval(() => {
          setRecordingDuration((prev) => prev + 1)
        }, 1000)
        
      } catch (err) {
        console.error('Microphone access error:', err)
        alert('Could not access microphone')
      }
    } else if (recordingState === 'recording') {
      // Stop recording
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop()
      }
      
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop())
      }
      
      if (audioContext) {
        audioContext.close()
      }
      
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
      
      setRecordingState('stopped')
      setShowSendButton(true)
    }
  }
  
  // Handle send button click
  const handleSendClick = () => {
    triggerHaptic()
    
    // Close attachment menu if open
    setIsAttachmentMenuOpen(false)
    
    // Create new chat session
    const newSession = {
      id: `session_${Date.now()}`,
      title: 'New Diagnosis',
      timestamp: new Date()
    }
    
    setChatSessions([newSession, ...chatSessions])
    
    // Add audio message
    const minutes = Math.floor(recordingDuration / 60)
    const seconds = recordingDuration % 60
    const durationString = `${minutes}:${seconds.toString().padStart(2, '0')}`
    
    const newAudioMessage = {
      id: `audio_${Date.now()}`,
      duration: durationString,
      timestamp: new Date()
    }
    
    setAudioMessages([newAudioMessage])
    
    // Trigger home content removal animation
    setShowHomeContent(false)
    
    // After animation, show chat and trigger DX response
    setTimeout(() => {
      setIsNewChat(true)
      // Show vehicle form after initial DX message (simulating DX response delay)
      setTimeout(() => {
        setShowVehicleForm(true)
      }, 800)
    }, 300)
    
    // Reset recording state
    setRecordingState('idle')
    setShowSendButton(false)
    setAudioBlob(null)
    setRecordingDuration(0)
  }
  
  // Fetch manufacturers and years on mount
  useEffect(() => {
    // Fetch manufacturers from backend
    const fetchManufacturers = async () => {
      try {
        const response = await fetch('/api/manufacturers')
        if (response.ok) {
          const data = await response.json()
          setManufacturers(data.manufacturers || [])
        } else {
          // Fallback manufacturers
          setManufacturers(['BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Ford', 'Volkswagen', 'Chevrolet', 'Nissan', 'Hyundai'])
        }
      } catch (error) {
        console.error('Error fetching manufacturers:', error)
        setManufacturers(['BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Ford', 'Volkswagen', 'Chevrolet', 'Nissan', 'Hyundai'])
      }
    }
    
    // Generate years (current year down to 30 years ago)
    const currentYear = new Date().getFullYear()
    const yearList = Array.from({length: 30}, (_, i) => (currentYear - i).toString())
    setYears(yearList)
    
    fetchManufacturers()
  }, [])
  
  // Fetch models when manufacturer and year change
  useEffect(() => {
    const fetchModels = async () => {
      if (vehicleDetails.manufacturer && vehicleDetails.year) {
        setLoadingModels(true)
        try {
          const response = await fetch(`/api/vehicle-models?manufacturer=${encodeURIComponent(vehicleDetails.manufacturer)}&year=${vehicleDetails.year}`)
          if (response.ok) {
            const data = await response.json()
            setModels(data.models || [])
          } else {
            setModels([])
          }
        } catch (error) {
          console.error('Error fetching models:', error)
          setModels([])
        } finally {
          setLoadingModels(false)
        }
      } else {
        setModels([])
      }
    }
    
    fetchModels()
  }, [vehicleDetails.manufacturer, vehicleDetails.year])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop())
      }
      if (audioContext) {
        audioContext.close()
      }
    }
  }, [])
  
  // Format recording duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  // Handle vehicle details form submission
  const handleVehicleSubmit = () => {
    if (vehicleDetails.manufacturer && vehicleDetails.year && vehicleDetails.model) {
      setHasSubmittedVehicleDetails(true)
      setShowVehicleForm(false)
      setIsEditingVehicle(false)
      setHasDXResponded(true) // Mark that DX has now responded
    }
  }
  
  // Handle edit audio
  const handleEditAudio = () => {
    setIsEditingAudio(true)
    // Reset to recording state
    setRecordingState('idle')
    setShowSendButton(false)
    setAudioBlob(null)
    setRecordingDuration(0)
  }
  
  // Handle edit vehicle details
  const handleEditVehicle = () => {
    setIsEditingVehicle(true)
    setShowVehicleForm(true)
    setHasSubmittedVehicleDetails(false)
  }

  // Show settings screen if active
  if (showSettings) {
    return <SettingsScreen onBack={() => setShowSettings(false)} />
  }

  // Show notifications screen if active
  if (showNotifications) {
    return <NotificationsScreen onBack={() => setShowNotifications(false)} />
  }

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Sidebar Menu - slides in from left, positioned absolutely */}
      <motion.div
        initial={{ x: `-${sidebarWidthPercent}vw` }}
        animate={{ x: isSidebarOpen ? 0 : `-${sidebarWidthPercent}vw` }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute left-0 top-0 h-full z-40"
        style={{
          width: `${sidebarWidthPercent}vw`,
          backgroundColor: '#E8E8E8',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)'
        }}
      >
            <div className="w-full h-full flex flex-col">
              {/* Search bar and new chat button */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  {/* Search input */}
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60">
                    <div className="text-gray-500">
                      <SearchIcon />
                    </div>
                    <input
                      type="text"
                      placeholder="Search"
                      className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
                    />
                  </div>
                  
                  {/* New chat button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-white/60"
                  >
                    <div className="text-gray-700">
                      <EditIcon />
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Menu items */}
              <div className="flex-1 overflow-y-auto px-3">
                {/* New Chat */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/40 transition-colors"
                >
                  <div className="text-gray-700">
                    <NewChatIcon />
                  </div>
                  <span className="text-sm font-medium text-gray-800">New chat</span>
                </motion.button>

                {/* Gallery */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/40 transition-colors"
                >
                  <div className="text-gray-700">
                    <GalleryIcon />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Gallery</span>
                </motion.button>

                {/* Shopping for parts */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/40 transition-colors"
                >
                  <div className="text-gray-700">
                    <ShoppingIcon />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Shopping for parts</span>
                </motion.button>

                {/* New Diagnosis Project */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/40 transition-colors"
                >
                  <div className="text-gray-700">
                    <ProjectIcon />
                  </div>
                  <span className="text-sm font-medium text-gray-800">New diagnosis project</span>
                </motion.button>

                {/* Separator */}
                <div className="my-4 border-t border-gray-400/30"></div>

                {/* Chat List - All chat sessions including new diagnosis */}
                <div className="space-y-1">
                  {/* New Diagnosis Sessions - Dynamically created chats (appear at top of chat list) */}
                  {chatSessions.map((session) => (
                    <motion.button
                      key={session.id}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/40 transition-colors"
                    >
                      <span className="text-sm text-gray-700">{session.title}</span>
                    </motion.button>
                  ))}

                  {/* Diagnosis History */}
                  {diagnosisHistory.map((item, index) => (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/40 transition-colors relative"
                    >
                      <span className="text-sm text-gray-700">{item}</span>
                      {/* Show unread dot on first 3 items to match 8 unread notifications */}
                      {index < 3 && (
                        <span className="absolute top-1/2 right-3 -translate-y-1/2 w-2 h-2 bg-purple-600 rounded-full"></span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* User profile at bottom */}
              <div className="p-4 border-t border-gray-300/50">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: '#8B7AA8' }}
                  >
                    V
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Vusisizwe Shange</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 rounded-lg hover:bg-white/40 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
      </motion.div>

      {/* Main Content Area - FULL SCREEN, slides to the right when sidebar opens */}
      <motion.div
        animate={{ x: isSidebarOpen ? `${sidebarWidthPercent}vw` : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full h-full relative"
        style={{ overflow: 'hidden' }}
      >
        {/* Scrollable content area */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden" onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
        {/* Top padding to clear the app bar */}
        <div style={{ paddingTop: '95px', paddingBottom: '100px', paddingLeft: '20px', paddingRight: '20px' }}>
          
          {/* Chat View - New Diagnosis */}
          {isNewChat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">New Diagnosis</h2>
              
              {/* Audio Message Bubble */}
              {audioMessages.map((audioMsg, index) => (
                <motion.div
                  key={audioMsg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mb-4"
                >
                  <div className="flex justify-end">
                    <div 
                      className="max-w-[80%] p-4 rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Play/Pause Button */}
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"
                        >
                          <div className="text-white">
                            <PlayIcon />
                          </div>
                        </motion.button>
                        
                        {/* Waveform Preview */}
                        <div className="flex-1 h-8 flex items-center">
                          <div className="w-full flex items-center gap-1">
                            {[...Array(20)].map((_, i) => (
                              <div
                                key={i}
                                className="w-1 bg-white/60 rounded-full"
                                style={{
                                  height: `${Math.random() * 20 + 10}px`
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* Duration */}
                        <span className="text-sm font-medium text-white flex-shrink-0">
                          {audioMsg.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Post-Action Icons for User Audio Message */}
                  <div className="flex justify-end mt-2">
                    <div className="flex items-center gap-4 px-2">
                      {/* Copy */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy"
                      >
                        <CopyIcon />
                      </motion.button>
                      
                      {/* Download */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Download"
                      >
                        <DownloadIcon />
                      </motion.button>
                      
                      {/* Edit */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleEditAudio}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Edit"
                      >
                        <EditIcon />
                      </motion.button>
                      
                      {/* Refresh (placeholder) */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Refresh"
                      >
                        <RefreshIcon />
                      </motion.button>
                      
                      {/* Delete - Only show if this is the latest message and DX hasn't responded */}
                      {index === audioMessages.length - 1 && !hasDXResponded && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <DeleteIcon />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* DX Initial Response - Thank you message */}
              {audioMessages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="mb-4"
                >
                  <div className="flex justify-start">
                    <div 
                      className="max-w-[80%] p-4 rounded-2xl bg-gray-100"
                      style={{
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {/* DX Avatar */}
                        <div className="flex-shrink-0 w-8 h-8">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)'
                            }}
                          >
                            <span className="text-white text-xs font-semibold">DX</span>
                          </div>
                        </div>
                        
                        {/* DX Message Content */}
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">
                            Thank you very much for your audio. Let's begin the analysis. Please give me the model of your vehicle.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Post-Action Icons for DX Message */}
                  <div className="flex justify-start mt-2">
                    <div className="flex items-center gap-4 px-2">
                      {/* Copy */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy"
                      >
                        <CopyIcon />
                      </motion.button>
                      
                      {/* Share */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Share"
                      >
                        <ShareIcon />
                      </motion.button>
                      
                      {/* Like */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-green-600 transition-colors"
                        title="Like"
                      >
                        <ThumbsUpIcon />
                      </motion.button>
                      
                      {/* Dislike */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                        title="Dislike"
                      >
                        <ThumbsDownIcon />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Vehicle Details Form - Appears as DX message bubble */}
              {showVehicleForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className="flex justify-start">
                    <div 
                      className="max-w-[85%] p-4 rounded-2xl bg-gray-100"
                      style={{
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        minWidth: '320px'
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {/* DX Avatar */}
                        <div className="flex-shrink-0 w-8 h-8">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)'
                            }}
                          >
                            <span className="text-white text-xs font-semibold">DX</span>
                          </div>
                        </div>
                        
                        {/* Vehicle Form */}
                        <div className="flex-1">
                          <div className="space-y-3">
                            {/* Manufacturer */}
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Manufacturer</label>
                              <select
                                value={vehicleDetails.manufacturer}
                                onChange={(e) => {
                                  setVehicleDetails({...vehicleDetails, manufacturer: e.target.value, model: ''})
                                  setModels([])
                                }}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
                              >
                                <option value="">Select manufacturer</option>
                                {manufacturers.map(manufacturer => (
                                  <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Year */}
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Year Model</label>
                              <select
                                value={vehicleDetails.year}
                                onChange={(e) => {
                                  setVehicleDetails({...vehicleDetails, year: e.target.value, model: ''})
                                  setModels([])
                                }}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
                              >
                                <option value="">Select year</option>
                                {years.map(year => (
                                  <option key={year} value={year}>{year}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Vehicle Model */}
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Model</label>
                              <select
                                value={vehicleDetails.model}
                                onChange={(e) => setVehicleDetails({...vehicleDetails, model: e.target.value})}
                                disabled={!vehicleDetails.manufacturer || !vehicleDetails.year || loadingModels}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                              >
                                <option value="">
                                  {loadingModels ? 'Loading models...' : 
                                   !vehicleDetails.manufacturer || !vehicleDetails.year ? 'Select manufacturer and year first' : 
                                   models.length === 0 ? 'No models available' : 
                                   'Select model'}
                                </option>
                                {models.map(model => (
                                  <option key={model} value={model}>{model}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Submit Button */}
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              onClick={handleVehicleSubmit}
                              disabled={!vehicleDetails.manufacturer || !vehicleDetails.year || !vehicleDetails.model}
                              className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
                              style={{
                                background: vehicleDetails.manufacturer && vehicleDetails.year && vehicleDetails.model
                                  ? 'linear-gradient(135deg, #8B5CF6 0%, #a78bfa 100%)'
                                  : '#d1d5db',
                                cursor: vehicleDetails.manufacturer && vehicleDetails.year && vehicleDetails.model ? 'pointer' : 'not-allowed'
                              }}
                            >
                              Continue
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* User's Vehicle Details Submission - Appears as user message */}
              {hasSubmittedVehicleDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className="flex justify-end">
                    <div 
                      className="max-w-[80%] p-4 rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                      }}
                    >
                      <p className="text-sm font-medium text-white">
                        {vehicleDetails.manufacturer} {vehicleDetails.year} {vehicleDetails.model}
                      </p>
                    </div>
                  </div>
                  
                  {/* Post-Action Icons for Vehicle Details Message */}
                  <div className="flex justify-end mt-2">
                    <div className="flex items-center gap-4 px-2">
                      {/* Copy */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy"
                      >
                        <CopyIcon />
                      </motion.button>
                      
                      {/* Download */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Download"
                      >
                        <DownloadIcon />
                      </motion.button>
                      
                      {/* Edit */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleEditVehicle}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Edit"
                      >
                        <EditIcon />
                      </motion.button>
                      
                      {/* Refresh */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Refresh"
                      >
                        <RefreshIcon />
                      </motion.button>
                      
                      {/* Delete - Only show if DX hasn't responded after this message */}
                      {!hasDXResponded && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <DeleteIcon />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* DX Follow-up Response - After vehicle details submitted */}
              {hasSubmittedVehicleDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="mb-4"
                >
                  <div className="flex justify-start">
                    <div 
                      className="max-w-[80%] p-4 rounded-2xl bg-gray-100"
                      style={{
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {/* DX Avatar */}
                        <div className="flex-shrink-0 w-8 h-8">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)'
                            }}
                          >
                            <span className="text-white text-xs font-semibold">DX</span>
                          </div>
                        </div>
                        
                        {/* DX Message Content */}
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">
                            Thank you very much for giving me the vehicle model. Now please tell me more about the problem.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Post-Action Icons for DX Message */}
                  <div className="flex justify-start mt-2">
                    <div className="flex items-center gap-4 px-2">
                      {/* Copy */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Copy"
                      >
                        <CopyIcon />
                      </motion.button>
                      
                      {/* Share */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Share"
                      >
                        <ShareIcon />
                      </motion.button>
                      
                      {/* Like */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-green-600 transition-colors"
                        title="Like"
                      >
                        <ThumbsUpIcon />
                      </motion.button>
                      
                      {/* Dislike */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                        title="Dislike"
                      >
                        <ThumbsDownIcon />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
          
          {/* Home Content - with exit animation */}
          <AnimatePresence>
          {showHomeContent && !isNewChat && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
          {/* Most Used Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Most Used</h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Card 1 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">🔧</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Engine Diagnosis</h3>
                <p className="text-xs text-gray-600">Quick check for engine sounds and issues</p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">🚗</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Brake Analysis</h3>
                <p className="text-xs text-gray-600">Identify brake system problems quickly</p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">⚙️</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Transmission Check</h3>
                <p className="text-xs text-gray-600">Diagnose transmission issues fast</p>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">🔊</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Unusual Sounds</h3>
                <p className="text-xs text-gray-600">Analyze strange vehicle noises</p>
              </motion.div>
            </div>
          </div>

          {/* Engine Issues Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Engine Issues</h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Card 1 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">💨</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Exhaust Issues</h3>
                <p className="text-xs text-gray-600">Check for exhaust system problems</p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">🌡️</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Overheating</h3>
                <p className="text-xs text-gray-600">Diagnose engine overheating causes</p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">⛽</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Fuel System</h3>
                <p className="text-xs text-gray-600">Identify fuel delivery problems</p>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">🔌</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Ignition Problems</h3>
                <p className="text-xs text-gray-600">Check spark plugs and ignition</p>
              </motion.div>
            </div>
          </div>

          {/* Wheel Issues Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Wheel Issues</h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Card 1 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">🛞</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Tire Pressure</h3>
                <p className="text-xs text-gray-600">Check tire pressure issues</p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">⚖️</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Wheel Alignment</h3>
                <p className="text-xs text-gray-600">Diagnose alignment problems</p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">🔄</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Wheel Bearing</h3>
                <p className="text-xs text-gray-600">Identify wheel bearing issues</p>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">🔩</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Suspension</h3>
                <p className="text-xs text-gray-600">Check suspension components</p>
              </motion.div>
            </div>
          </div>

          {/* Electrical Issues Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Electrical Issues</h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Card 1 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">🔋</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Battery Check</h3>
                <p className="text-xs text-gray-600">Test battery health and charge</p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">💡</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Light Problems</h3>
                <p className="text-xs text-gray-600">Diagnose headlight and signal issues</p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">⚡</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Alternator Test</h3>
                <p className="text-xs text-gray-600">Check alternator output</p>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl">🔌</div>
                  <div className="text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Wiring Issues</h3>
                <p className="text-xs text-gray-600">Identify electrical wiring faults</p>
              </motion.div>
            </div>
          </div>
          </motion.div>
          )}
          </AnimatePresence>

        </div>
        </div>

        {/* Absolute Top App Bar - moves with content */}
        <div className="absolute top-0 left-0 right-0 z-50">
        <div 
          className="backdrop-blur-lg bg-white/0"
          style={{
            paddingTop: '50px',
            paddingBottom: '10px',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          <div className="flex items-center justify-between">
            {/* Left: AutoDecx Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-lg"
              style={{
                backgroundColor: 'rgba(230, 230, 250, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div className="text-purple-600">
                <AutoDecxIcon />
              </div>
              <span className="text-base font-semibold text-gray-600">AutoDecx</span>
            </motion.button>

            {/* Right: Icons */}
            <div className="flex items-center gap-3">
              {/* Headphones Icon with Dropdown */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsHeadphonesDropdownOpen(!isHeadphonesDropdownOpen)}
                  className="relative w-10 h-10 rounded-full backdrop-blur-lg flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div className="text-gray-400">
                    <HeadphonesIcon />
                  </div>
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isHeadphonesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-48 rounded-xl backdrop-blur-lg overflow-hidden z-50"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      {/* Call Mechanic */}
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsHeadphonesDropdownOpen(false)
                          // Add call mechanic logic here
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/60 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                        <span className="text-xs font-medium text-gray-800">Call Mechanic</span>
                      </motion.button>

                      {/* Text Mechanic */}
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsHeadphonesDropdownOpen(false)
                          // Add text mechanic logic here
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/60 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                        <span className="text-xs font-medium text-gray-800">Text Mechanic</span>
                      </motion.button>

                      {/* Call Roadside Assistance */}
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsHeadphonesDropdownOpen(false)
                          // Add call roadside assistance logic here
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/60 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0"></div>
                        <span className="text-xs font-medium text-gray-800">Call Roadside Assistance</span>
                      </motion.button>

                      {/* Text Roadside Assistance */}
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsHeadphonesDropdownOpen(false)
                          // Add text roadside assistance logic here
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/60 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0"></div>
                        <span className="text-xs font-medium text-gray-800">Text Roadside Assistance</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Profile */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(true)}
                className="w-10 h-10 rounded-full backdrop-blur-lg flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(220, 208, 255, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
                }}
              >
                <div className="text-white">
                  <UserIcon />
                </div>
              </motion.button>

              {/* Notification Count */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(true)}
                className="relative w-10 h-10 rounded-full backdrop-blur-lg flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
                }}
              >
                <span className="text-sm font-bold text-gray-600">{unreadNotifications}</span>
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full border border-white"></span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Recording Bar - moves with content */}
      <div className="absolute bottom-8 left-5 right-5 z-50">
        <motion.div
          className="backdrop-blur-lg rounded-full px-4 py-3"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Left: DX Button with state changes */}
            <motion.button
              whileTap={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={handleDXButtonClick}
              className="flex-shrink-0 relative"
            >
              <AnimatePresence mode="wait">
                {recordingState === 'idle' ? (
                  // Idle state - gradient DX icon
                  <motion.div
                    key="idle"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)',
                      boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                    }}
                  >
                    <div className="text-white">
                      <DXAvatarIcon />
                    </div>
                  </motion.div>
                ) : recordingState === 'recording' ? (
                  // Recording state - solid red with pulsing dot
                  <motion.div
                    key="recording"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: '#ef4444',
                      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.5)'
                    }}
                  >
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-3 h-3 rounded-full bg-white"
                    />
                  </motion.div>
                ) : (
                  // Stopped state - stop icon
                  <motion.div
                    key="stopped"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: '#6b7280',
                      boxShadow: '0 2px 8px rgba(107, 114, 128, 0.3)'
                    }}
                  >
                    <div className="text-white">
                      <StopIcon />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Center: Message bar content */}
            <div className="flex-1 px-3 flex items-center justify-center" style={{ height: '40px' }}>
              <AnimatePresence mode="wait">
                {recordingState === 'idle' ? (
                  <motion.p
                    key="idle-text"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="text-sm text-gray-600 text-center"
                  >
                    Tap on the DX to start recording...
                  </motion.p>
                ) : recordingState === 'recording' ? (
                  // Show live sound wave animation
                  <motion.div
                    key="recording-wave"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="w-full h-full flex items-center"
                  >
                    <SoundWaveAnimation isActive={true} analyser={analyser} />
                  </motion.div>
                ) : (
                  // Show static waveform bars in stopped state
                  <motion.div
                    key="stopped-waveform"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="w-full h-full flex items-center justify-center gap-1 px-2"
                  >
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-purple-500 rounded-full"
                        style={{
                          height: `${Math.random() * 24 + 8}px`,
                          maxWidth: '4px'
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Send button (appears in stopped state) */}
            <AnimatePresence>
              {showSendButton && (
                <motion.button
                  key="send"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ 
                    duration: 0.25,
                    ease: [0.4, 0, 0.2, 1], // Custom easing curve
                    delay: 0.1 // Slight delay for better visual flow
                  }}
                  whileTap={{ scale: 1.05 }}
                  onClick={handleSendClick}
                  className="flex-shrink-0"
                  style={{ marginRight: '8px' }}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #a78bfa 100%)',
                      boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                    }}
                  >
                    <div className="text-white">
                      <SendIcon />
                    </div>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Grid Icon - always visible */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAttachmentMenuOpen(true)}
              className="flex-shrink-0"
            >
              <div className="text-gray-400">
                <GridIcon />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
      </motion.div>

      {/* Attachment Popup Menu */}
      <AnimatePresence>
        {isAttachmentMenuOpen && (
          <>
            {/* Backdrop/Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/15 z-50"
              onClick={() => setIsAttachmentMenuOpen(false)}
            />

            {/* Popup Menu */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ duration: 0.25, type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-32 left-0 right-0 z-50 mx-auto"
              style={{
                width: 'min(320px, 90vw)',
                background: 'linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%)',
                borderRadius: '24px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                padding: '24px',
              }}
            >
              {/* 2x2 Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Voice Note */}
                <motion.button
                  whileTap={{ scale: 1.05 }}
                  transition={{ duration: 0.075 }}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <div className="text-white">
                      <VoiceNoteIcon />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-800 text-center">Voice Note</span>
                </motion.button>

                {/* Image / Video */}
                <motion.button
                  whileTap={{ scale: 1.05 }}
                  transition={{ duration: 0.075 }}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <div className="text-white">
                      <ImageVideoIcon />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-800 text-center">Image / Video</span>
                </motion.button>

                {/* Documents */}
                <motion.button
                  whileTap={{ scale: 1.05 }}
                  transition={{ duration: 0.075 }}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <div className="text-white">
                      <DocumentIcon />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-800 text-center">Documents</span>
                </motion.button>

                {/* Add Mileage */}
                <motion.button
                  whileTap={{ scale: 1.05 }}
                  transition={{ duration: 0.075 }}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <div className="text-white">
                      <MileageIcon />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-800 text-center">Add Mileage</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AutoDecxHomeScreen
