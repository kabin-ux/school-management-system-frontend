import React from 'react';
import image from  '../../assets/image3.png'

const TeacherMockup: React.FC = () => {
    return (
        <div className="w-116 h-full bg-white-200 rounded-4xl">
            <img src={image} alt="Middle Mockup" className="w-full h-full object-contain" />
        </div>
    );
};

export default TeacherMockup;