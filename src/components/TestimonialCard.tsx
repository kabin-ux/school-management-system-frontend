import React from 'react';

interface TestimonialCardProps {
  rating: number;
  text: string;
  name: string;
  position: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ rating, text, name, position }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex mb-4">
        {Array.from({ length: rating }, (_, i) => (
          <div key={i} className="w-4 h-4 rounded-3xl mr-1">⭐</div>
        ))}
      </div>
      <p className="text-gray-900 italic mb-6 text-sm">
        "{text}"
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-orange-400 rounded-full mr-3"></div>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-gray-600 text-sm">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;