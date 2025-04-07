import React from 'react';

type GoalStatus = 'active' | 'completed' | 'overdue' | 'paused';
type GoalCategory = 'fitness' | 'nutrition' | 'mindset' | 'habit' | 'custom';

interface GoalProgress {
  completedCheckins: number;
  totalCheckins: number;
  lastCheckin?: string;
}

interface GoalCardProps {
  title: string;
  category: GoalCategory;
  progress: GoalProgress;
  status: GoalStatus;
  startDate: string;
  endDate: string;
  onClick?: () => void;
}

const categoryIcons: Record<GoalCategory, string> = {
  fitness: '💪',
  nutrition: '🥗',
  mindset: '🧠',
  habit: '⭐',
  custom: '🎯'
};

const statusStyles: Record<GoalStatus, { bg: string; text: string; border: string }> = {
  active: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200'
  },
  completed: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200'
  },
  overdue: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200'
  },
  paused: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200'
  }
};

export const GoalCard: React.FC<GoalCardProps> = ({
  title,
  category,
  progress,
  status,
  startDate,
  endDate,
  onClick
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateProgress = () => {
    const { completedCheckins, totalCheckins } = progress;
    return Math.round((completedCheckins / totalCheckins) * 100);
  };

  const progressPercentage = calculateProgress();
  const statusStyle = statusStyles[status];

  return (
    <div
      onClick={onClick}
      className={`
        rounded-lg border p-4 transition-all duration-200
        ${statusStyle.border} ${statusStyle.bg}
        ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xl" role="img" aria-label={category}>
              {categoryIcons[category]}
            </span>
            <h4 className="font-medium text-gray-900 line-clamp-1">{title}</h4>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.text} ${statusStyle.bg}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              progressPercentage === 100
                ? 'bg-green-500'
                : progressPercentage > 66
                ? 'bg-blue-500'
                : progressPercentage > 33
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Check-ins</p>
          <p className="font-medium">
            {progress.completedCheckins} / {progress.totalCheckins}
          </p>
        </div>
        {progress.lastCheckin && (
          <div>
            <p className="text-gray-500">Last Check-in</p>
            <p className="font-medium">{formatDate(progress.lastCheckin)}</p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Started {formatDate(startDate)}</span>
          <span>Ends {formatDate(endDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard; 