import type React from "react";
import StudentMockup from "./StudentMockup";


const StudentAppSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Student App Portal
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              The Student App is a personalized companion for students 
              offering easy access to academic resources, assignments, 
              time attendance records, upcoming class schedules, 
              homework assignments, exam results, event notifications, 
              and school announcements. Students can receive 
              updates from teachers, download study materials, and 
              stay connected with their academic community. The app 
              ensures that even younger students can navigate the app 
              easily and stay engaged in their education digitally.
            </p>
          </div>
          
          <div className="flex justify-center">
            <StudentMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentAppSection;