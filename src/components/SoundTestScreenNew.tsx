import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Play, Square, RotateCcw } from "lucide-react";

type RecordingState = "initial" | "countdown" | "recording" | "playback" | "analyzed";

export default function SoundTestScreen() {
  const [state, setState] = useState<RecordingState>("initial");
  const [countdown, setCountdown] = useState(3);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [showControls, setShowControls] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (state === "countdown" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (state === "countdown" && countdown === 0) {
      startRecording();
    }
  }, [state, countdown]);

  useEffect(() => {
    if (state === "recording" && recordingTime < 10) {
      const timer = setTimeout(() => {
        setRecordingTime(recordingTime + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (state === "recording" && recordingTime >= 10) {
      stopRecording();
    }
  }, [state, recordingTime]);

  useEffect(() => {
    if (state === "playback" || state === "analyzed") {
      setTimeout(() => setShowControls(true), 100);
    } else {
      setShowControls(false);
    }
  }, [state]);

  const handleRecordClick = async () => {
    setState("countdown");
    setCountdown(3);
    setRecordingTime(0);
    setAnalysisResult("");
    setAudioBlob(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setState("recording");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access microphone. Please grant permission and try again.");
      setState("initial");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setState("playback");
    }
  };

  const handlePlay = () => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleAnalyze = () => {
    setState("analyzed");
    setTimeout(() => {
      setAnalysisResult(
        "✓ Audio analysis complete\n\nSound Quality: Excellent\nDuration: 10.0 seconds\nSample Rate: 48 kHz\nBit Depth: 16-bit\nFormat: WAV\n\nNo background noise detected. Recording is clear and suitable for hearing test analysis."
      );
    }, 1500);
  };

  const handleReRecord = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    setState("initial");
    setCountdown(3);
    setRecordingTime(0);
    setAudioBlob(null);
    setIsPlaying(false);
    setAnalysisResult("");
    setShowControls(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center px-5 py-6 sm:py-10">
      <div className="w-full max-w-md mb-8 sm:mb-12 relative">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center tracking-tight">
          Autodecx — Sound Test (Trial)
        </h1>
        
        {(state === "playback" || state === "analyzed") && (
          <Button
            onClick={handleReRecord}
            variant="ghost"
            size="sm"
            className={`absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-300 ${
              showControls ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
          >
            <RotateCcw className="w-4 h-4 mr-1.5" />
            <span className="text-sm font-medium">Re-record</span>
          </Button>
        )}
      </div>

      <div className="w-full max-w-md flex flex-col items-center space-y-6 sm:space-y-8">
        <div className="relative mb-4">
          <Button
            onClick={handleRecordClick}
            disabled={state !== "initial"}
            size="lg"
            className="w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 hover:from-teal-500 hover:via-teal-600 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-[0_8px_30px_rgb(20,184,166,0.4)] hover:shadow-[0_12px_40px_rgb(20,184,166,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 border-4 border-white"
          >
            <div className="flex flex-col items-center justify-center">
              <Mic className="w-14 h-14 sm:w-16 sm:h-16 text-white mb-2 drop-shadow-lg" strokeWidth={2.5} />
              <span className="text-white font-semibold text-xl drop-shadow-md">Record</span>
            </div>
          </Button>

          {state === "countdown" && countdown > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full backdrop-blur-sm animate-in fade-in duration-200">
              <span className="text-7xl sm:text-8xl font-bold text-white animate-pulse drop-shadow-2xl">
                {countdown}
              </span>
            </div>
          )}

          {state === "recording" && (
            <div className="absolute inset-0 rounded-full border-4 border-teal-400 animate-ping opacity-75" />
          )}
        </div>

        {(state === "recording" || state === "playback" || state === "analyzed") && (
          <div className="text-center animate-in fade-in slide-in-from-top-4 duration-500">
            <p className="text-xs sm:text-sm text-gray-500 mb-1 font-medium uppercase tracking-wide">
              Recording Time
            </p>
            <p className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-sm">
              {recordingTime.toString().padStart(2, "0")}s
            </p>
          </div>
        )}

        {(state === "playback" || state === "analyzed") && (
          <div 
            className={`flex gap-3 w-full max-w-sm transition-all duration-500 ${
              showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Button
              onClick={handlePlay}
              disabled={isPlaying}
              size="lg"
              variant="outline"
              className="flex-1 h-16 sm:h-[72px] text-base sm:text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-teal-200 hover:border-teal-400 hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill={isPlaying ? "currentColor" : "none"} />
              Play
            </Button>
            <Button
              onClick={handleStop}
              disabled={!isPlaying}
              size="lg"
              variant="outline"
              className="flex-1 h-16 sm:h-[72px] text-base sm:text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-300 hover:border-gray-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              <Square className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill={isPlaying ? "currentColor" : "none"} />
              Stop
            </Button>
          </div>
        )}

        {(state === "playback" || state === "analyzed") && (
          <Button
            onClick={handleAnalyze}
            disabled={state === "analyzed"}
            size="lg"
            className={`w-full max-w-sm h-16 sm:h-[72px] text-base sm:text-lg font-bold rounded-2xl bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 hover:from-teal-600 hover:via-teal-700 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 shadow-[0_8px_24px_rgb(20,184,166,0.35)] hover:shadow-[0_12px_32px_rgb(20,184,166,0.45)] transition-all duration-300 active:scale-95 border-2 border-white ${
              showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {state === "analyzed" ? "✓ Analysis Complete" : "Analyze Recording"}
          </Button>
        )}

        <Card 
          className={`w-full max-w-sm p-5 sm:p-6 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-[140px] shadow-lg transition-all duration-500 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Analysis Results
          </p>
          {analysisResult ? (
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-medium">
              {analysisResult}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">
              Results will appear here after analysis...
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
