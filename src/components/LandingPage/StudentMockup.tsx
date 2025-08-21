import React from 'react';
import image from '../../assets/image2.png'

const StudentMockup: React.FC = () => {
    return (
        <div className="w-116 h-full bg-white-200 rounded-4xl ml-26">
            <img src={image} alt="Middle Mockup" className="w-full h-full object-contain " />
        </div>
    );
};

export default StudentMockup;