// src/components/SoundTestScreen.tsx
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mic, Play, Square, RotateCcw, Car, ChevronDown } from "lucide-react";
import { uploadAudio } from "@/lib/api";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type RecordingState = "initial" | "vehicle_info" | "countdown" | "recording" | "playback" | "analyzed";

interface VehicleInfo {
  manufacturer: string;
  year: string;
  model: string;
  soundLocation: string;
}

// South African car manufacturers
const MANUFACTURERS = [
  "Audi",
  "BMW",
  "Chevrolet",
  "Chery",
  "Datsun",
  "Fiat",
  "Ford",
  "GWM",
  "Haval",
  "Honda",
  "Hyundai",
  "Isuzu",
  "Jaguar",
  "Jeep",
  "Kia",
  "Land Rover",
  "Mahindra",
  "Mazda",
  "Mercedes-Benz",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Peugeot",
  "Renault",
  "Suzuki",
  "Toyota",
  "Volkswagen",
  "Volvo"
];

// Generate years from 1980 to 2025
const YEARS = Array.from({ length: 2025 - 1980 + 1 }, (_, i) => (2025 - i).toString());

// Sound locations
const SOUND_LOCATIONS = [
  { value: "engine", label: "Engine Bay" },
  { value: "front_left_wheel", label: "Front Left Wheel" },
  { value: "front_right_wheel", label: "Front Right Wheel" },
  { value: "rear_left_wheel", label: "Rear Left Wheel" },
  { value: "rear_right_wheel", label: "Rear Right Wheel" },
  { value: "exhaust", label: "Exhaust System" },
  { value: "brakes", label: "Brakes" },
  { value: "transmission", label: "Transmission" },
  { value: "suspension", label: "Suspension" },
  { value: "interior", label: "Interior" },
  { value: "unknown", label: "Unknown/Multiple" }
];

export default function SoundTestScreen() {
  const [state, setState] = useState<RecordingState>("initial");
  const [countdown, setCountdown] = useState(3);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [showControls, setShowControls] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    manufacturer: "",
    year: "",
    model: "",
    soundLocation: ""
  });

  // Dropdown states
  const [openManufacturer, setOpenManufacturer] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);

  // Model loading state
  const [loadingModels, setLoadingModels] = useState(false);
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch models when manufacturer and year are selected
  useEffect(() => {
    if (vehicleInfo.manufacturer && vehicleInfo.year) {
      fetchModels(vehicleInfo.manufacturer, vehicleInfo.year);
    } else {
      setAvailableModels([]);
    }
  }, [vehicleInfo.manufacturer, vehicleInfo.year]);

  const fetchModels = async (manufacturer: string, year: string) => {
    setLoadingModels(true);
    try {
      // Call backend API to get models
      const response = await fetch(
        `http://127.0.0.1:5000/api/vehicle-models?manufacturer=${encodeURIComponent(manufacturer)}&year=${encodeURIComponent(year)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setAvailableModels(data.models || []);
      } else {
        console.error("Failed to fetch models");
        setAvailableModels([]);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
      // Fallback: use generic models
      setAvailableModels(["Model not found - please type manually"]);
    } finally {
      setLoadingModels(false);
    }
  };

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

  const handleVehicleInfoSubmit = () => {
    if (!vehicleInfo.manufacturer || !vehicleInfo.year || !vehicleInfo.model || !vehicleInfo.soundLocation) {
      alert("Please fill in all vehicle information fields");
      return;
    }
    
    setState("countdown");
    setCountdown(3);
  };

  const handleRecordClick = async () => {
    setState("vehicle_info");
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
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
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

  const handleAnalyze = async () => {
    if (!audioBlob) {
      alert("No audio to analyze");
      return;
    }

    setState("analyzed");
    setIsAnalyzing(true);
    setAnalysisResult("⏳ Analyzing audio and searching for similar issues...\n\nPlease wait, this may take 30-60 seconds...");

    try {
      console.log("📤 Uploading audio with vehicle info...");
      const result = await uploadAudio(audioBlob, vehicleInfo);
      console.log("✅ Analysis result received:", result);

      const formattedResult = `✓ Audio analysis complete

Vehicle: ${vehicleInfo.manufacturer} ${vehicleInfo.year} ${vehicleInfo.model}
Sound Location: ${vehicleInfo.soundLocation}

${result.youtube_analysis ? `
🎥 YouTube Analysis:
Videos analyzed: ${result.youtube_analysis.videos_analyzed}
Best match: ${result.youtube_analysis.best_match_title}
Match confidence: ${result.youtube_analysis.best_match_similarity}%

` : ''}
Technical Analysis:
Duration: ${result.metrics.duration.toFixed(1)} seconds
Sample Rate: ${(result.metrics.sample_rate / 1000).toFixed(1)} kHz
Dominant Frequency: ${result.metrics.dominant_frequency.toFixed(0)} Hz
Vibration Level: ${(result.metrics.vibration_level * 100).toFixed(1)}%

Diagnosis: ${result.predicted_issue}
Confidence: ${(result.confidence * 100).toFixed(0)}%

${result.issues.length > 0 ? '\n⚠️ Issues Detected:\n' + result.issues.map(issue => `• ${issue.message}`).join('\n') : '✓ No significant issues detected.'}

${result.youtube_matches ? '\n🔗 Reference Videos:\n' + result.youtube_matches.slice(0, 3).map((match, idx) => 
  `${idx + 1}. ${match.title} (${match.similarity}% match)\n   ${match.url}`
).join('\n') : ''}`;

      setAnalysisResult(formattedResult);

    } catch (error) {
      console.error("❌ Analysis failed:", error);
      setAnalysisResult(
        `❌ Analysis Failed\n\n${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease ensure:\n• Flask backend is running on port 5000\n• YouTube API is configured\n• Internet connection is active`
      );
    } finally {
      setIsAnalyzing(false);
    }
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
    setVehicleInfo({
      manufacturer: "",
      year: "",
      model: "",
      soundLocation: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center px-5 py-6 sm:py-10">
      <div className="w-full max-w-md mb-8 sm:mb-12 relative">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center tracking-tight">
          AutoDecX — Sound Test (Trial)
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
        
        {/* VEHICLE INFO FORM */}
        {state === "vehicle_info" && (
          <Card className="w-full p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-semibold text-gray-800">Vehicle Information</h2>
            </div>

            <div className="space-y-4">
              {/* Manufacturer Dropdown */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Manufacturer
                </Label>
                <Popover open={openManufacturer} onOpenChange={setOpenManufacturer}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openManufacturer}
                      className="w-full justify-between"
                    >
                      {vehicleInfo.manufacturer || "Select manufacturer..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search manufacturer..." />
                      <CommandEmpty>No manufacturer found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {MANUFACTURERS.map((manufacturer) => (
                          <CommandItem
                            key={manufacturer}
                            value={manufacturer}
                            onSelect={() => {
                              setVehicleInfo({...vehicleInfo, manufacturer, model: ""});
                              setOpenManufacturer(false);
                            }}
                          >
                            {manufacturer}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Year Dropdown */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Year
                </Label>
                <Popover open={openYear} onOpenChange={setOpenYear}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openYear}
                      className="w-full justify-between"
                    >
                      {vehicleInfo.year || "Select year..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search year..." />
                      <CommandEmpty>No year found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {YEARS.map((year) => (
                          <CommandItem
                            key={year}
                            value={year}
                            onSelect={() => {
                              setVehicleInfo({...vehicleInfo, year, model: ""});
                              setOpenYear(false);
                            }}
                          >
                            {year}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Model Dropdown (Dynamic) */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Model
                </Label>
                <Popover open={openModel} onOpenChange={setOpenModel}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openModel}
                      className="w-full justify-between"
                      disabled={!vehicleInfo.manufacturer || !vehicleInfo.year}
                    >
                      {loadingModels ? "Loading models..." : (vehicleInfo.model || "Select model...")}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search or type model..." />
                      <CommandEmpty>
                        <div className="p-2 text-sm text-gray-500">
                          No models found. Type to add manually.
                        </div>
                      </CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {availableModels.map((model) => (
                          <CommandItem
                            key={model}
                            value={model}
                            onSelect={() => {
                              setVehicleInfo({...vehicleInfo, model});
                              setOpenModel(false);
                            }}
                          >
                            {model}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {!vehicleInfo.manufacturer || !vehicleInfo.year ? (
                  <p className="text-xs text-gray-500 mt-1">Select manufacturer and year first</p>
                ) : null}
              </div>

              {/* Sound Location Dropdown */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Sound Location
                </Label>
                <Popover open={openLocation} onOpenChange={setOpenLocation}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openLocation}
                      className="w-full justify-between"
                    >
                      {SOUND_LOCATIONS.find(loc => loc.value === vehicleInfo.soundLocation)?.label || "Select location..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search location..." />
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {SOUND_LOCATIONS.map((location) => (
                          <CommandItem
                            key={location.value}
                            value={location.value}
                            onSelect={() => {
                              setVehicleInfo({...vehicleInfo, soundLocation: location.value});
                              setOpenLocation(false);
                            }}
                          >
                            {location.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button
              onClick={handleVehicleInfoSubmit}
              className="w-full mt-4 bg-teal-600 hover:bg-teal-700"
            >
              Continue to Recording
            </Button>

            <Button
              onClick={() => setState("initial")}
              variant="ghost"
              className="w-full"
            >
              Cancel
            </Button>
          </Card>
        )}

        {/* REST OF YOUR EXISTING UI (Recording, Playback, etc.) */}
        {state === "initial" && (
          <div className="relative mb-4">
            <Button
              onClick={handleRecordClick}
              size="lg"
              className="w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 hover:from-teal-500 hover:via-teal-600 hover:to-cyan-700 shadow-[0_8px_30px_rgb(20,184,166,0.4)] hover:shadow-[0_12px_40px_rgb(20,184,166,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 border-4 border-white"
            >
              <div className="flex flex-col items-center justify-center">
                <Mic className="w-14 h-14 sm:w-16 sm:h-16 text-white mb-2 drop-shadow-lg" strokeWidth={2.5} />
                <span className="text-white font-semibold text-xl drop-shadow-md">Record</span>
              </div>
            </Button>
          </div>
        )}

        {(state === "countdown" || state === "recording" || state === "playback" || state === "analyzed") && (
          <>
            <div className="relative mb-4">
              <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 border-4 border-white flex items-center justify-center">
                <Mic className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-lg" strokeWidth={2.5} />
              </div>

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
              <>
                <div className={`flex gap-3 w-full max-w-sm transition-all duration-500 ${
                  showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
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

                <Button
                  onClick={handleAnalyze}
                  disabled={state === "analyzed" || isAnalyzing}
                  size="lg"
                  className={`w-full max-w-sm h-16 sm:h-[72px] text-base sm:text-lg font-bold rounded-2xl bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 hover:from-teal-600 hover:via-teal-700 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 shadow-[0_8px_24px_rgb(20,184,166,0.35)] hover:shadow-[0_12px_32px_rgb(20,184,166,0.45)] transition-all duration-300 active:scale-95 border-2 border-white ${
                    showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: '100ms' }}
                >
                  {isAnalyzing ? "⏳ Analyzing..." : state === "analyzed" ? "✓ Analysis Complete" : "Analyze Recording"}
                </Button>
              </>
            )}

            <Card className={`w-full max-w-sm p-5 sm:p-6 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-[140px] shadow-lg transition-all duration-500 ${
              showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '200ms' }}>
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
          </>
        )}
      </div>
    </div>
  );
}