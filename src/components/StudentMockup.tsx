import React from 'react';
import image from '../assets/image2.png'

const StudentMockup: React.FC = () => {
    return (
        <div className="w-96 h-full bg-gray-200 p-16 rounded-4xl">
            <img src={image} alt="Middle Mockup" className="w-full h-full object-contain bottom-0 right-4" />
        </div>
    );
};

export default StudentMockup;