import { useState, type FC } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import graduation from '../../assets/Vector.png';

const stories = [
  {
    id: 1,
    title: "What Our Clients say about us",
    content: "The Student App is a personalized companion for students to stay on top of their academic journey. It displays real-time attendance records, upcoming class schedules, homework assignments, exam results.",
    author: "Seona palmsmith",
    role: "Dixon Corp",
    rating: 5,
    image: graduation,
    authorImg: "/path-to-author.png"
  },
  {
    id: 2,
    title: "Revolutionizing Classroom Management",
    content: "Gurukul-Setu has completely changed how we handle our daily administrative tasks. The oversight provided to teachers and parents is unparalleled in the current ed-tech space.",
    author: "Marcus Thorne",
    role: "Green Valley Academy",
    rating: 5,
    image: graduation,
    authorImg: "/path-to-author-2.png"
  }
];

const RealSuccessStories: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextStory = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const prevStory = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const current = stories[currentIndex];

  const stats = [
    { label: "Partnered Schools", value: "23" },
    { label: "Students Using Gurukul-Setu", value: "5.9k" },
    { label: "Teachers Using Gurukul-Setu", value: "2.2k" },
    { label: "Parents Using Gurukul-Setu", value: "3.3k" },
  ];

  // Variants for the sliding animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#2D3142] mb-2">Real Success Stories</h2>
          <p className="text-gray-500 text-sm md:text-base">Empowering administrators and educators with superior oversight.</p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-red-500 mx-auto mt-4 rounded-full"
          />
        </motion.div>

        {/* Testimonial Content */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24 relative">

          {/* Image Section - Animated Floating Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-[#5D3FD3] w-64 h-64 md:w-80 md:h-80 rounded-[40px] relative">
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                src={current.image}
                alt="Successful Student"
                className="absolute bottom-0 scale-110 grayscale"
              />

              {/* Floating Avatar Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-xl flex items-center gap-2 border border-white z-20"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-[#5D3FD3]">+1.2k</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Section - Sliding Transition */}
          <div className="flex-1 overflow-hidden relative min-h-[350px] lg:min-h-[300px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-[#2D3142] mb-6">
                  {current.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
                  {current.content}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-indigo-50 border-2 border-indigo-100 overflow-hidden">
                      <img src={current.authorImg} alt={current.author} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#2D3142]">{current.author}</h4>
                      <p className="text-xs text-gray-400 mb-1">{current.role}</p>
                      <div className="flex gap-0.5">
                        {[...Array(current.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevStory}
                      className="p-3 rounded-full border border-gray-200 text-[#5D3FD3] hover:bg-indigo-50 transition-colors bg-white shadow-sm"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextStory}
                      className="p-3 rounded-full bg-[#5D3FD3] text-white shadow-lg hover:bg-[#4b32ac] transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Stats Grid - Staggered Fade-in */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-4xl font-black text-[#5D3FD3] mb-2 cursor-default"
              >
                {stat.value}
              </motion.div>
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-[#5D3FD3] transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealSuccessStories;