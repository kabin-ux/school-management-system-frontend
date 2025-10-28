import React, { useState } from 'react';
import { Info, CheckCircle } from 'lucide-react';
import { FileWarning as Warning } from 'lucide-react';
import type { Note } from '../../../types/fee-salary.types';
import { NoteItem } from './NoteItem';

export const StudentNotes: React.FC = () => {
    const [newNote, setNewNote] = useState('');
    const [selectedNoteType, setSelectedNoteType] = useState<'info' | 'warning' | 'success'>('info');

    const notes: Note[] = [
        {
            id: '1',
            author: 'Accountant',
            date: 'Dec 15, 2024',
            content: 'Student requested payment extension due to family financial situation. Granted 15-day extension.',
            type: 'info'
        },
        {
            id: '2',
            author: 'Admin User',
            date: 'Dec 16, 2024',
            content: 'Merit scholarship approved for 20% discount on tuition fees. Valid for current academic year.',
            type: 'success'
        },
        {
            id: '3',
            author: 'Accountant',
            date: 'Dec 18, 2024',
            content: 'Parent contacted regarding pending hostel fee payment. Follow-up scheduled for next week.',
            type: 'warning'
        }
    ];

    const handleAddNote = () => {
        if (newNote.trim()) {
            // Add note logic here
            setNewNote('');
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h4 className="font-medium text-gray-900">Student Notes & Remarks</h4>
                    <p className="text-sm text-gray-600">Track important information and communications</p>
                </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setSelectedNoteType('info')}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedNoteType === 'info' ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                    >
                        <Info className="h-3 w-3 text-white" />
                    </button>
                    <span className="text-sm text-gray-700">Info</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setSelectedNoteType('warning')}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedNoteType === 'warning' ? 'bg-orange-500' : 'bg-gray-300'
                            }`}
                    >
                        <Warning className="h-3 w-3 text-white" />
                    </button>
                    <span className="text-sm text-gray-700">Warning</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setSelectedNoteType('success')}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedNoteType === 'success' ? 'bg-green-600' : 'bg-gray-300'
                            }`}
                    >
                        <CheckCircle className="h-3 w-3 text-white" />
                    </button>
                    <span className="text-sm text-gray-700">Success</span>
                </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note about this student"
                    rows={3}
                    className="w-full border-0 resize-none focus:outline-none text-sm"
                />
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{newNote.length}/500 characters</span>
                    <button
                        onClick={handleAddNote}
                        className="px-4 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                    >
                        + Add Note
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {notes.map((note) => (
                    <NoteItem key={note.id} note={note} />
                ))}
            </div>
        </div>
    );
};
