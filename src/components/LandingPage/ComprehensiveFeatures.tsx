import cuate from '../../assets/cuate.png';
import rafiki from '../../assets/rafiki.png';
import pana from '../../assets/pana.png';

const ComprehensiveFeatures = () => {
    const features = [
        {
            title: "Student Management",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
            image: cuate, // Replace with your image asset
        },
        {
            title: "Student Management",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
            image: rafiki, // Replace with your image asset
        },
        {
            title: "Student Management",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
            image: pana, // Replace with your image asset
        }
    ];

    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto bg-[#F3F0FF] rounded-[40px] p-12 border-2 border-white shadow-sm">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#2D3142] mb-4">Our Comprehensive Features</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm">
                        List of the features that EduSetu Provides for there users and partnered school over each platform
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#5D3FD3] rounded-[30px] overflow-hidden shadow-lg transition-transform hover:scale-105"
                        >
                            <div className="h-64 flex items-center justify-center p-6 bg-[#5D3FD3]">
                                {/* Illustration would go here */}
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full object-contain opacity-90"
                                />
                            </div>
                            <div className="p-6 text-white bg-white/10 backdrop-blur-sm">
                                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                                <p className="text-white/80 text-xs leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ComprehensiveFeatures;