import React from 'react';
import image from '../assets/image.png';

const HeroMockup: React.FC = () => {
    return (
        <div className="w-96 h-full">
            <img src={image} alt="Middle Mockup" className="w-full h-full object-contain bottom-0 right-4" />
        </div>
    );
};

export default HeroMockup;