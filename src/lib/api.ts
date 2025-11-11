// src/lib/api.ts
export const API_BASE_URL = "http://127.0.0.1:5000";

// Upload audio file or blob to Flask backend safely
export async function uploadAudio(file: File | Blob) {
  const formData = new FormData();
  const fileToSend =
    file instanceof File ? file : new File([file], "recording.wav", { type: "audio/wav" });

  formData.append("audio", fileToSend);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload failed: ${text}`);
  }

  return response.json();
}
