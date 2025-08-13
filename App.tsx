import React, { useState, useEffect, useCallback } from 'react';
import { BookText, Rss } from 'lucide-react';
import UploadCard from './components/UploadCard';
import EpisodeList from './components/EpisodeList';
import { listEpisodes } from './services/api';
import { EpisodeMeta } from './types';

export default function App() {
  const [episodes, setEpisodes] = useState<EpisodeMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);

  const fetchEpisodes = useCallback(async () => {
    const fetchedEpisodes = await listEpisodes();
    setEpisodes(fetchedEpisodes);
    const isAnyEpisodeProcessing = fetchedEpisodes.some(e => !e.duration_ms);
    setIsPolling(isAnyEpisodeProcessing);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

  useEffect(() => {
    let interval: number | null = null;
    if (isPolling) {
      interval = setInterval(() => {
        fetchEpisodes();
      }, 5000); // Poll every 5 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPolling, fetchEpisodes]);

  const handleUploadSuccess = useCallback(() => {
    setIsLoading(true);
    // Give backend a moment to create the file before fetching
    setTimeout(() => {
        fetchEpisodes();
    }, 1000);
  }, [fetchEpisodes]);

  return (
    <div className="bg-slate-100 min-h-screen font-sans text-slate-800">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-slate-900 text-white p-4 rounded-full mb-4">
            <BookText size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">PDF to Podcast</h1>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto">
            Upload a PDF, choose a voice, and get a podcast-style MP3 automatically. An RSS feed is generated for your podcast app.
          </p>
        </header>
        
        <main className="space-y-12">
          <UploadCard onUploaded={handleUploadSuccess} />
          <EpisodeList episodes={episodes} isLoading={isLoading} onRefresh={fetchEpisodes} />
        </main>
        
        <footer className="text-center mt-12">
          <a
            href="/rss.xml"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
          >
            <Rss size={16} />
            <span>View RSS Feed</span>
          </a>
        </footer>
      </div>
    </div>
  );
}