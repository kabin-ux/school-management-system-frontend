import React from 'react';

interface NotificationToggleProps {
  label: string;
  isEnabled: boolean;
  onToggle: () => void;
  color?: 'blue' | 'pink';
}

export const NotificationToggle: React.FC<NotificationToggleProps> = ({
  label,
  isEnabled,
  onToggle,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-600',
    pink: 'bg-pink-500'
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${
          isEnabled ? colorClasses[color] : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-4' : 'translate-x-0.5'
          } mt-0.5`}
        />
      </button>
    </div>
  );
};
