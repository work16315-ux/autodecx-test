// src/components/SoundTestScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Square, RotateCcw, BarChart3 } from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import SpectrogramPlugin from "wavesurfer.js/dist/plugins/spectrogram.esm.js";
import { uploadAudio } from "../lib/api";

type RecordingState = "initial" | "recording" | "playback" | "analyzed";

export default function SoundTestScreen() {
  const [state, setState] = useState<RecordingState>("initial");
  const [audioBlob, setAudioBlob] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const spectrogramRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  // ✅ Generate 256-color colormap for the spectrogram
  const generateColorMap = () => {
    const colorMap = [];
    for (let i = 0; i < 256; i++) {
      const r = Math.floor((i / 255) * 255);
      const g = Math.floor(255 - (i / 255) * 255);
      const b = Math.floor(128 + Math.sin(i / 10) * 127);
      colorMap.push([r / 255, g / 255, b / 255, 1]);
    }
    return colorMap;
  };

  // ✅ Initialize Wavesurfer once
  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#5eead4",
        progressColor: "#14b8a6",
        cursorColor: "#0d9488",
        height: 100,
        normalize: true,
      });

      const spectrogram = SpectrogramPlugin.create({
        container: spectrogramRef.current!,
        labels: true,
        height: 150,
        fftSamples: 512,
        colorMap: generateColorMap(),
      });

      ws.registerPlugin(spectrogram);
      wavesurferRef.current = ws;
    }
  }, []);

  // ✅ Recording logic
  const handleRecord = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const file = new File([blob], "recording.wav", { type: "audio/wav" });
        setAudioBlob(file);

        const url = URL.createObjectURL(file);
        if (audioRef.current) audioRef.current.src = url;

        wavesurferRef.current?.loadBlob(file);
        setState("playback");
      };

      mediaRecorder.start();
      setState("recording");
    } catch (err) {
      console.error("Recording error:", err);
    }
  };

  const handleStop = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
  };

  const handlePlay = () => {
    const ws = wavesurferRef.current;
    if (ws) {
      ws.playPause();
      setIsPlaying((prev) => !prev);
    }
  };

  // ✅ Analyze via Flask API
  const handleAnalyze = async () => {
    if (!audioBlob) return;
    setIsLoading(true);
    try {
      const result = await uploadAudio(audioBlob);
      console.log("Analysis Results:", result);
      setAnalysis(result);
      setState("analyzed");
    } catch (err) {
      console.error("Analysis failed:", err);
      alert("Error analyzing audio. Check Flask console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAudioBlob(null);
    setAnalysis(null);
    setState("initial");
    setIsPlaying(false);
    wavesurferRef.current?.empty();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 overflow-hidden">
      <h1 className="text-3xl font-semibold text-primary mb-6 text-center">
        Autodecx — Reliable Audio Test + Spectrogram
      </h1>

      {/* Record Button */}
      {state === "initial" && (
        <Button
          onClick={handleRecord}
          className="rounded-full w-48 h-48 text-xl bg-teal-500 hover:bg-teal-600 text-white shadow-lg"
        >
          <Mic className="w-6 h-6 mr-2" /> Record
        </Button>
      )}

      {/* Waveform + Spectrogram (visible only after recording) */}
      {(state === "playback" || state === "analyzed") && (
        <div className="w-full max-w-3xl mt-8 flex flex-col items-center gap-3">
          <div
            ref={waveformRef}
            className="w-full bg-card shadow rounded-xl overflow-hidden"
          />
          <div
            ref={spectrogramRef}
            className="w-full bg-card shadow rounded-xl overflow-hidden"
          />
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3 mt-6 flex-wrap justify-center">
        {state === "recording" ? (
          <Button onClick={handleStop} className="bg-red-500 hover:bg-red-600 text-white">
            <Square className="w-5 h-5 mr-2" /> Stop
          </Button>
        ) : (
          <>
            <Button onClick={handlePlay} disabled={!audioBlob}>
              {isPlaying ? (
                <>
                  <Square className="w-5 h-5 mr-2" /> Pause
                </>
              ) : (
                <>
                  <RotateCcw className="w-5 h-5 mr-2" /> Play
                </>
              )}
            </Button>

            <Button
              onClick={handleAnalyze}
              disabled={!audioBlob || isLoading}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              {isLoading ? "Analyzing..." : "Analyze"}
            </Button>

            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </>
        )}
      </div>

      {/* Analysis Results */}
      {(state === "analyzed" || analysis) && (
        <Card className="w-full max-w-md p-5 mt-8 shadow-lg border border-border bg-card">
          <p className="text-base font-semibold text-foreground mb-3 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-teal-600" /> Analysis Results
          </p>
          {analysis ? (
            <div className="text-sm text-foreground space-y-2 font-medium">
              <p>🎧 Duration: {analysis.duration ? analysis.duration.toFixed(2) : "—"} sec</p>
              <p>🔊 RMS: {analysis.rms ? analysis.rms.toFixed(4) : "—"}</p>
              <p>⚡ Zero Crossing Rate: {analysis.zcr ? analysis.zcr.toFixed(4) : "—"}</p>
              <p>🎵 Tempo: {analysis.tempo_bpm ? analysis.tempo_bpm.toFixed(2) : "—"} BPM</p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">Waiting for analysis data…</p>
          )}
        </Card>
      )}

      <audio ref={audioRef} hidden controls />
    </div>
  );
}
