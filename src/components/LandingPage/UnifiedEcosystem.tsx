import { useRef } from 'react';
import { Rocket } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import adminlaptop from '../../assets/adminlaptop.png';
import laptop from '../../assets/laptop.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';

const UnifiedEcosystem = () => {
  const containerRef = useRef(null);

  // 1. Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // 2. Smooth the movement for a premium "flight" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const portals = [
    { title: "Admin Web Portal", color: "bg-red-50", text: "The Admin Web Portal provides complete control over institutional data, staff management, and global school configurations.", image: adminlaptop },
    { title: "Accountant Web Portal", color: "bg-emerald-50", text: "Streamline fee collection, expense tracking, and financial reporting with our specialized accounting interface.", image: laptop },
    { title: "Student App Portal", color: "bg-orange-50", text: "An immersive mobile experience allowing students to track assignments, grades, and schedules on the go.", image: image2 },
    { title: "Teacher App Portal", color: "bg-red-50", text: "Empower educators with mobile tools for attendance, result entry, and direct communication with parents.", image: image3 },
    { title: "Parents App Portal", color: "bg-emerald-50", text: "Keep parents engaged with real-time updates on their child's attendance, fees, and academic performance.", image: image4 }
  ];

  return (
    <section ref={containerRef} className="py-24 px-4 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-28">
          <h2 className="text-4xl font-bold text-slate-800 mb-2">The Unified Educational Ecosystem</h2>
          <p className="text-slate-500">Synchronizing administrators, educators, students, and parents.</p>
          <div className="w-12 h-1 bg-red-500 mx-auto mt-4" />
        </div>

        <div className="relative">
          {/* SVG Container for Path and Rocket */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hidden lg:block pointer-events-none z-20">
            <svg
              width="800"
              height="100%"
              viewBox="0 0 800 1200"
              fill="none"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              {/* The "Track" */}
              <path
                id="rocketPath"
                d="M400 0 C 700 300, 100 500, 400 750 S 700 1100, 400 1200"
                stroke="#8B5CF6"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="opacity-20"
              />

              {/* The Rocket - Optimized for Directional Facing */}
              <motion.g
                style={{
                  offsetPath: "path('M400 0 C 700 300, 100 500, 400 750 S 700 1100, 400 1200')",
                  offsetDistance: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
                  offsetRotate: "auto 90deg", // Automatically faces the direction of the path
                }}
              >
                {/* foreignObject allows using HTML/Lucide components inside SVG */}
                <foreignObject width="40" height="40" x="-20" y="-20">
                  <div className="flex items-center justify-center w-full h-full">
                    <motion.div
                      className="bg-white p-1.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-purple-400"
                      animate={{
                        boxShadow: ["0_0_10px_rgba(139,92,246,0.3)", "0_0_20px_rgba(139,92,246,0.6)", "0_0_10px_rgba(139,92,246,0.3)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Rocket className="w-4 h-4 text-purple-600 fill-purple-500" />
                    </motion.div>
                  </div>
                </foreignObject>
              </motion.g>
            </svg>
          </div>

          {portals.map((portal, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-16 mb-40 last:mb-0 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                }`}
            >
              {/* Text Side */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 text-left"
              >
                <h3 className={`text-4xl font-bold mb-6 ${index % 2 === 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                  {portal.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                  {portal.text}
                </p>
              </motion.div>

              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`w-full lg:w-1/2 p-8 md:p-12 rounded-[50px] ${portal.color} flex justify-center shadow-inner relative group`}
              >
                <div className="bg-white rounded-3xl shadow-xl p-3 overflow-hidden border border-slate-100 transition-all duration-500 group-hover:shadow-2xl">
                  <img
                    src={portal.image}
                    alt={portal.title}
                    className="w-full max-w-sm rounded-xl"
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnifiedEcosystem;