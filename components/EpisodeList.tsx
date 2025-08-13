import React from 'react';
import { EpisodeMeta } from '../types';
import { RefreshCw, Clock, CheckCircle2, Download, Loader2, Mic, FileText } from 'lucide-react';

interface EpisodeListProps {
  episodes: EpisodeMeta[];
  isLoading: boolean;
  onRefresh: () => void;
}

const formatDuration = (ms?: number) => {
  if (typeof ms !== 'number') return 'N/A';
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short'
    });
};

interface ProviderBadgeProps {
    provider: string;
}

const ProviderBadge: React.FC<ProviderBadgeProps> = ({ provider }) => {
    const style: { [key: string]: string } = {
        gtts: "bg-green-100 text-green-800",
        openai: "bg-blue-100 text-blue-800",
        azure: "bg-purple-100 text-purple-800",
    };
    const providerStyle = style[provider] || "bg-slate-100 text-slate-800";
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${providerStyle}`}>{provider.toUpperCase()}</span>
};

interface EpisodeItemProps {
    episode: EpisodeMeta;
}

const EpisodeItem: React.FC<EpisodeItemProps> = ({ episode }) => {
  const isReady = !!episode.duration_ms;
  const audioUrl = `/api/episodes/${episode.id}/audio`;

  return (
    <li className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all hover:shadow-xl">
        <div className="p-5">
            <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                    <h3 className="font-bold text-lg text-slate-900">{episode.title}</h3>
                    <div className="flex items-center text-xs text-slate-500 mt-1">
                        <FileText size={12} className="mr-1.5"/>
                        <span>{episode.pdf_filename}</span>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <ProviderBadge provider={episode.provider} />
                </div>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-600 mt-4">
                <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{formatDate(episode.created_at)}</span>
                </div>
                {isReady ? (
                     <div className="flex items-center gap-1.5 text-green-600 font-medium">
                        <CheckCircle2 size={14} />
                        <span>{formatDuration(episode.duration_ms)}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 text-amber-600 font-medium">
                        <Loader2 size={14} className="animate-spin" />
                        <span>Processing...</span>
                    </div>
                )}
            </div>

            {isReady && (
                <div className="mt-4 space-y-3">
                    <audio className="w-full" controls src={audioUrl}>
                        Your browser does not support the audio element.
                    </audio>
                    <a href={audioUrl} download={`${episode.title}.mp3`} className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-700 transition-colors">
                        <Download size={16}/>
                        Download MP3
                    </a>
                </div>
            )}
        </div>
    </li>
  );
};


export default function EpisodeList({ episodes, isLoading, onRefresh }: EpisodeListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Episodes</h2>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''}/>
          <span>Refresh</span>
        </button>
      </div>
      {isLoading && episodes.length === 0 ? (
        <div className="text-center text-slate-500">
            <Loader2 className="mx-auto h-8 w-8 animate-spin" />
            <p className="mt-2">Loading episodes...</p>
        </div>
      ) : !episodes.length ? (
        <div className="text-center bg-white rounded-2xl p-12 border border-dashed">
            <Mic size={48} className="mx-auto text-slate-400" />
            <h3 className="mt-4 text-lg font-medium text-slate-900">No episodes yet</h3>
            <p className="mt-1 text-sm text-slate-500">Upload a PDF to create your first episode.</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {episodes.map(e => <EpisodeItem key={e.id} episode={e} />)}
        </ul>
      )}
    </div>
  );
}