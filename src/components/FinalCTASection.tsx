import React from 'react';
import footer1 from '../assets/footer1.png';
import footer2 from '../assets/footer2.png';

const FinalCTASection: React.FC = () => {
  return (
    <section className="bg-[#D1DD37] py-12 md:py-16 rounded-t-3xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              INTRODUCING<br />
              <span className="text-5xl md:text-6xl">Edu-Sikshya</span>
            </h2>
            <p className="text-white text-lg md:text-xl mb-6 max-w-md mx-auto lg:mx-0">
              Transform your learning experience with our innovative platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition">
                Download Now
              </button>
              <button className="bg-white text-[#CBD72B] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right side - will be covered by absolute positioned images */}
          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* Phones positioned relative to section */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Phone (bottom aligned) */}
        <img
          src={footer1}
          alt="App screenshot 1"
          className="absolute right-10 lg:right-100 bottom-0 w-48 md:w-56 lg:w-64 object-contain"
        />

        {/* Right Phone (top aligned) */}
        <img
          src={footer2}
          alt="App screenshot 2"
          className="absolute right-10 lg:right-20 top-0 w-48 md:w-56 lg:w-64 object-contain"
        />
      </div>
    </section>
  );
};

export default FinalCTASection;