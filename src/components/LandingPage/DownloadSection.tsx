const DownloadCTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto bg-[#F3F0FF] rounded-[40px] p-12 text-center border-8 border-white shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Download The Gurukul-Setu SMS App</h2>
        <p className="text-gray-500 mb-8">Register as Student, Teacher, Parents and get connected with your school virtually.</p>
        <div className="flex gap-4 mt-8 justify-center">
          <button className="bg-black text-white px-6 py-2 rounded-xl flex items-center gap-3 transition-transform hover:scale-105">
            <div className="text-left leading-tight">
              <p className="text-[10px] uppercase opacity-70">Get it on</p>
              <p className="text-lg font-bold">Google Play</p>
            </div>
          </button>
          <button className="bg-black text-white px-6 py-2 rounded-xl flex items-center gap-3 transition-transform hover:scale-105">
            <div className="text-left leading-tight">
              <p className="text-[10px] uppercase opacity-70">Download on the</p>
              <p className="text-lg font-bold">App Store</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;