import React from 'react';

const PartnerLogos: React.FC = () => {
    return (
        <div className="mt-16">
            <div className="flex justify-between items-center px-28 opacity-60">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-[#888888] bg-opacity-30 rounded"></div>
                        <span className="text-[#888888] font-medium">Partner {i}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnerLogos;