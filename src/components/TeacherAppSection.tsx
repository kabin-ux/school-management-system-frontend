import React from 'react';
import TeacherMockup from './TeacherMockup';

const TeacherAppSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center lg:order-1">
            <TeacherMockup />
          </div>
          
          <div className="lg:order-2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Teacher App Portal
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              The Teacher App empowers educators with tools for managing 
              daily teaching tasks. Teachers can mark attendance, 
              upload assignments, share results, create class 
              schedules, send announcements, and communicate with 
              parents. The app streamlines administrative duties so 
              teachers can focus more on teaching. It also includes a 
              gradebook, lesson planning tools, and parent 
              notification system to keep everyone informed, and 
              performance analytics to track student progress over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherAppSection;