import React, { useState } from 'react';

interface VoiceFeedbackProps {
  audioUrl?: string;
  transcript?: string;
  createdAt?: string;
  isLoading?: boolean;
  error?: string;
  voiceType?: 'motivational' | 'empathetic' | 'professional' | 'friendly';
}

export const VoiceFeedback: React.FC<VoiceFeedbackProps> = ({
  audioUrl,
  transcript,
  createdAt,
  isLoading = false,
  error,
  voiceType = 'motivational'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAudioPlay = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    setIsPlaying(true);
  };

  const handleAudioPause = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    setIsPlaying(false);
  };

  const handleAudioEnded = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    setIsPlaying(false);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <svg
            className="h-5 w-5 text-red-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!audioUrl) {
    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No feedback available</h3>
          <p className="mt-1 text-sm text-gray-500">Check back soon for your personalized voice feedback.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Your Weekly Feedback</h3>
        {createdAt && (
          <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
        )}
      </div>

      <div className={`
        p-4 rounded-lg
        ${isPlaying ? 'bg-indigo-50 ring-2 ring-indigo-200' : 'bg-gray-50'}
        transition-all duration-300 ease-in-out
      `}>
        <div className="flex items-center space-x-3 mb-3">
          <div className={`
            w-2 h-2 rounded-full
            ${isPlaying ? 'bg-indigo-600 animate-pulse' : 'bg-gray-400'}
          `}></div>
          <span className="text-sm font-medium text-gray-700">
            {isPlaying ? 'Playing feedback...' : 'Ready to play'}
          </span>
        </div>

        <audio
          controls
          className="w-full"
          onPlay={handleAudioPlay}
          onPause={handleAudioPause}
          onEnded={handleAudioEnded}
        >
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
          <span>{voiceType.charAt(0).toUpperCase() + voiceType.slice(1)} Voice</span>
          <button
            type="button"
            onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {isTranscriptOpen ? 'Hide' : 'Show'} Transcript
          </button>
        </div>
      </div>

      {transcript && isTranscriptOpen && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="prose prose-sm max-w-none text-gray-600">
            {transcript}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceFeedback; 