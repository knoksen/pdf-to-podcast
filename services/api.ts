import axios from 'axios';
import { EpisodeMeta, Provider } from '../types';

export interface UploadResponse {
  id: string;
  status: string;
}

const api = axios.create({
  baseURL: (typeof process !== 'undefined' && (process as any).env && (process as any).env.API_BASE_URL) || '/'
});

export async function uploadPDF(file: File, title: string, provider: Provider, voice?: string): Promise<UploadResponse> {
  const form = new FormData();
  form.append('file', file);
  form.append('title', title);
  form.append('provider', provider);
  if (voice) {
    form.append('voice', voice);
  }
  const { data } = await api.post<UploadResponse>('/api/upload', form);
  return data;
}

export async function listEpisodes(): Promise<EpisodeMeta[]> {
  try {
    const { data } = await api.get<{ episodes: EpisodeMeta[] }>('/api/episodes');
    // Sort by creation date descending
    return data.episodes.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (error) {
    console.error("Failed to fetch episodes:", error);
    return [];
  }
}