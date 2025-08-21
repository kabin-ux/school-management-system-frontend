import React from 'react';
import image from '../../assets/image4.png'
const ParentMockup: React.FC = () => {
    return (
        <div className="w-116 h-full bg-white-200 p-16 rounded-4xl">
            <img src={image} alt="Middle Mockup" className="w-full h-full object-contain top-0 right-4" />
        </div>
    );
};

export default ParentMockup;