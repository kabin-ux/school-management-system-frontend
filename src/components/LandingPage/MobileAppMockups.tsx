import React from 'react';
import image from '../../assets/image.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';

const MobileAppMockups: React.FC = () => {
    return (
        <div className="relative mb-12">
            {/* Phones */}
            <div className="flex justify-center items-end space-x-16">
                {/* Left Phone */}
                <div className="w-56 h-80">
                    <img src={image2} alt="Left Mockup" className="w-full h-full object-contain mt-6" />
                </div>

                {/* Middle Phone (Bigger) */}
                <div className="w-56 h-100">
                    <img src={image} alt="Middle Mockup" className="w-68 h-full object-contain mt-2" />
                </div>

                {/* Right Phone */}
                <div className="w-56 h-80 ml-4">
                    <img src={image3} alt="Right Mockup" className="w-full h-full object-contain mt-6" />
                </div>
            </div>

            {/* White Bar touching images */}
            <div className="bg-white w-full h-[2rem] absolute bottom-0"></div>
        </div>
    );
};

export default MobileAppMockups;
