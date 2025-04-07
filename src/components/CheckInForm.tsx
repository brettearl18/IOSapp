import React, { useState } from 'react';

type MoodType = 'positive' | 'neutral' | 'negative';
type ResponseType = 'green' | 'yellow' | 'red';

interface CheckInFormProps {
  goalId: string;
  questions: string[];
  onSubmit: (data: CheckInData) => Promise<void>;
}

interface CheckInData {
  goalId: string;
  responses: Record<string, ResponseType>;
  mood: MoodType;
  notes: string;
}

const initialState = {
  responses: {},
  mood: 'neutral' as MoodType,
  notes: ''
};

const MOOD_OPTIONS: { value: MoodType; label: string }[] = [
  { value: 'positive', label: '😊 Positive' },
  { value: 'neutral', label: '😐 Neutral' },
  { value: 'negative', label: '😔 Negative' }
];

const RESPONSE_OPTIONS: { value: ResponseType; label: string; color: string }[] = [
  { value: 'green', label: '✅ On Track', color: 'bg-green-100 text-green-800' },
  { value: 'yellow', label: '⚠️ Need Help', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'red', label: '❌ Off Track', color: 'bg-red-100 text-red-800' }
];

export const CheckInForm: React.FC<CheckInFormProps> = ({ goalId, questions, onSubmit }) => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (question: string, value: ResponseType) => {
    setFormData((prev) => ({
      ...prev,
      responses: {
        ...prev.responses,
        [question]: value
      }
    }));
  };

  const handleMoodChange = (value: MoodType) => {
    setFormData((prev) => ({
      ...prev,
      mood: value
    }));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const notes = e.target.value;
    if (notes.length <= 500) {
      setFormData((prev) => ({
        ...prev,
        notes
      }));
    }
  };

  const validateForm = (): boolean => {
    if (questions.length === 0) return true;
    return questions.every((q) => formData.responses[q]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      setError('Please answer all questions');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        goalId,
        ...formData
      });
      setFormData(initialState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit check-in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={index} className="question-container">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {q}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {RESPONSE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleChange(q, option.value)}
                  className={`
                    ${option.color}
                    ${formData.responses[q] === option.value ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}
                    p-3 rounded-lg text-sm font-medium w-full
                    transition-all duration-200 ease-in-out
                    hover:opacity-90 focus:outline-none
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mood-section">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How are you feeling?
        </label>
        <div className="grid grid-cols-3 gap-2">
          {MOOD_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleMoodChange(option.value)}
              className={`
                ${formData.mood === option.value ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}
                p-3 rounded-lg text-sm font-medium
                transition-all duration-200 ease-in-out
                hover:opacity-90 focus:outline-none
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="notes-section">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes <span className="text-gray-500">({formData.notes.length}/500)</span>
        </label>
        <textarea
          value={formData.notes}
          onChange={handleNotesChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={4}
          placeholder="Share any additional thoughts or context..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !validateForm()}
          className={`
            inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm
            text-sm font-medium text-white bg-indigo-600
            ${isSubmitting || !validateForm()
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }
          `}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Check-In'}
        </button>
      </div>
    </form>
  );
};

export default CheckInForm; 