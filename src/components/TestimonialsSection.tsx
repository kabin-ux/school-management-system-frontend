import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection: React.FC = () => {
    const testimonials = [
        {
            rating: 5,
            text: "EduMaster transformed our school operations. The intuitive design makes managing 500+ students effortless. Highly recommended for modern education management.",
            name: "Dr. Patricia Williams",
            position: "Principal, Greenwood Academy"
        },
        {
            rating: 5,
            text: "EduMaster transformed our school operations. The intuitive design makes managing 500+ students effortless. Highly recommended for modern education management.",
            name: "Dr. Patricia Williams",
            position: "Principal, Greenwood Academy"
        },
        {
            rating: 5,
            text: "EduMaster transformed our school operations. The intuitive design makes managing 500+ students effortless. Highly recommended for modern education management.",
            name: "Dr. Patricia Williams",
            position: "Principal, Greenwood Academy"
        }
    ];

    return (
        <section className="bg-gradient-to-br bg-[#E8F261] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-white text-center mb-4">What Our Community Says</h2>
                <p className='text-lg text-white text-center mb-12'>Trusted by educators, administrators, and families across the country</p>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            rating={testimonial.rating}
                            text={testimonial.text}
                            name={testimonial.name}
                            position={testimonial.position}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;