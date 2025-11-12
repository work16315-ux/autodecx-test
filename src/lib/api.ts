// src/lib/api.ts

// ============================================================
// TYPE DEFINITIONS (MUST BE FIRST)
// ============================================================

export interface AnalysisResult {
  success: boolean;
  metrics: {
    dominant_frequency: number;
    spectral_rolloff: number;
    vibration_level: number;
    zero_crossing_rate: number;
    duration: number;
    sample_rate: number;
    spectral_bandwidth?: number;
  };
  issues: Array<{
    type: string;
    severity: 'info' | 'warning' | 'error';
    message: string;
  }>;
  predicted_issue: string;
  confidence: number;
  youtube_analysis?: {
    videos_analyzed: number;
    best_match_title: string;
    best_match_similarity: number;
  };
  youtube_matches?: Array<{
    title: string;
    url: string;
    similarity: number;
  }>;
}

export interface VehicleInfo {
  manufacturer: string;
  year: string;
  model: string;
  soundLocation: string;
}

// ============================================================
// CONFIGURATION
// ============================================================

const API_BASE_URL = 'http://127.0.0.1:5000';

// ============================================================
// API FUNCTIONS
// ============================================================

export async function uploadAudio(
  file: File | Blob, 
  vehicleInfo?: VehicleInfo
): Promise<AnalysisResult> {
  
  console.log('📡 uploadAudio called with:', {
    fileSize: file.size,
    fileType: file instanceof File ? file.type : 'blob',
    vehicleInfo: vehicleInfo || 'not provided'
  });

  const formData = new FormData();
  
  const fileToSend = file instanceof File 
    ? file 
    : new File([file], "recording.webm", { type: "audio/webm" });
  
  formData.append('audio', fileToSend);
  
  if (vehicleInfo) {
    formData.append('vehicle_info', JSON.stringify(vehicleInfo));
    console.log('📋 Vehicle info included:', vehicleInfo);
  }

  try {
    console.log(`🌐 Sending POST to ${API_BASE_URL}/upload`);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    console.log('📬 Response received:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('📊 Parsed response data:', data);
    
    return data;

  } catch (error) {
    console.error('🔥 Upload error:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend. Is Flask running on port 5000?');
    }
    
    throw error;
  }
}