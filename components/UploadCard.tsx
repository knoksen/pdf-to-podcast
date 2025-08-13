import React, { useState, useCallback, ChangeEvent } from 'react';
import { uploadPDF } from '../services/api';
import { Provider } from '../types';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';

interface UploadCardProps {
  onUploaded: () => void;
}

const providerOptions: { id: Provider; name: string }[] = [
    { id: 'gtts', name: 'gTTS (Free)' },
    { id: 'openai', name: 'OpenAI' },
    { id: 'azure', name: 'Azure' },
];

export default function UploadCard({ onUploaded }: UploadCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [provider, setProvider] = useState<Provider>('gtts');
  const [voice, setVoice] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
        // Pre-fill title from filename, removing extension
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
    } else {
        setTitle('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setError(null);
    try {
      await uploadPDF(file, title || 'Untitled Episode', provider, voice || undefined);
      onUploaded();
      // Reset form
      setFile(null);
      setTitle('');
      setVoice('');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'An unknown error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const isSubmitDisabled = !file || isUploading;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Episode</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-slate-700 mb-1">PDF Document</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {file ? (
                <FileText className="mx-auto h-12 w-12 text-slate-400" />
              ) : (
                <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
              )}
              <div className="flex text-sm text-slate-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" accept="application/pdf" onChange={handleFileChange} className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              {file ? (
                <p className="text-sm text-slate-900 font-medium">{file.name}</p>
              ) : (
                <p className="text-xs text-slate-500">PDF up to 50MB</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">Episode Title</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="e.g., The History of Space Travel" />
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700">TTS Provider</label>
            <div className="mt-2 grid grid-cols-3 gap-3">
                {providerOptions.map(option => (
                     <label key={option.id} className={`flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${provider === option.id ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white hover:bg-slate-50'}`}>
                        <input type="radio" value={option.id} checked={provider === option.id} onChange={() => setProvider(option.id)} className="sr-only" />
                        <span className="text-sm font-semibold">{option.name}</span>
                    </label>
                ))}
            </div>
        </div>

         {(provider === 'openai' || provider === 'azure') && (
            <div>
                <label htmlFor="voice" className="block text-sm font-medium text-slate-700">Voice</label>
                <input type="text" id="voice" value={voice} onChange={e => setVoice(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="e.g., alloy (OpenAI) or en-US-JennyNeural (Azure)" />
                <p className="mt-2 text-xs text-slate-500">Optional. Leave blank to use the server's default voice for the selected provider.</p>
            </div>
        )}
        
        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={isSubmitDisabled} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors">
          {isUploading ? <Loader2 className="animate-spin" /> : 'Generate Episode'}
        </button>
      </form>
    </div>
  );
}