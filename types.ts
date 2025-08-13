export type Provider = "gtts" | "openai" | "azure";

export interface EpisodeMeta {
  id: string;
  title: string;
  created_at: string; // ISO date string
  duration_ms?: number;
  provider: Provider;
  voice?: string;
  pdf_filename: string;
}