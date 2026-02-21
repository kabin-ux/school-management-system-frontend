import { motion, type Variants } from 'framer-motion'; // Import Variants type
import playStore from '../../assets/Play store.png';
import appStore from '../../assets/apple store.png';

const DownloadCTA = () => {
  // Explicitly type the variants object
  const pulseVariants: Variants = {
    initial: {
      scale: 0.95,
      opacity: 0.5
    },
    animate: {
      scale: [0.95, 1.05, 0.95],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut", // This should now be accepted as an Easing literal
      },
    },
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <motion.div
        variants={pulseVariants}
        initial="initial"
        animate="animate"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#5D3FD3] rounded-full blur-[100px] z-0 opacity-20"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto bg-[#F3F0FF]/80 backdrop-blur-md rounded-[40px] p-12 text-center border-8 border-white shadow-2xl relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Download The <span className="text-[#5D3FD3]">Gurukul-Setu</span> SMS App
        </h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto text-lg">
          Register as a Student, Teacher, or Parent and stay virtually connected with your school ecosystem 24/7.
        </p>

        <div className="flex flex-wrap gap-6 mt-8 justify-center items-center">
          <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
            <img src={playStore} alt="Play Store" className="w-40 md:w-48 h-auto cursor-pointer" />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
            <img src={appStore} alt="App Store" className="w-40 md:w-48 h-auto cursor-pointer" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default DownloadCTA;