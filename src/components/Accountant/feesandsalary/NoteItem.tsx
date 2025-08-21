import React from 'react';
import type { Note } from '../../../types/fee-salary.types';

interface NoteItemProps {
  note: Note;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const getBgColor = (type: string) => {
    switch (type) {
      case 'info': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-orange-600 bg-orange-50';
      case 'success': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
        <span className="text-xs font-medium text-gray-600">
          {note.author.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-sm text-gray-900">{note.author}</span>
          <span className="text-xs text-gray-500">{note.date}</span>
        </div>
        <p className={`text-sm p-2 rounded ${getBgColor(note.type)}`}>
          {note.content}
        </p>
      </div>
    </div>
  );
};
