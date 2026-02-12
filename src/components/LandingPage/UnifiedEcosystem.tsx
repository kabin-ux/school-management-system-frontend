import adminlaptop from '../../assets/adminlaptop.png';
import laptop from '../../assets/laptop.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';

const UnifiedEcosystem = () => {
  const portals = [
    { title: "Admin Web Portal", color: "bg-red-50", text: "The Admin Web Portal provides complete control over institutional data, staff management, and global school configurations.", image: adminlaptop },
    { title: "Accountant Web Portal", color: "bg-emerald-50", text: "Streamline fee collection, expense tracking, and financial reporting with our specialized accounting interface.", image: laptop },
    { title: "Student App Portal", color: "bg-orange-50", text: "An immersive mobile experience allowing students to track assignments, grades, and schedules on the go.", image: image2 },
    { title: "Teacher App Portal", color: "bg-red-50", text: "Empower educators with mobile tools for attendance, result entry, and direct communication with parents.", image: image3 },
    { title: "Parents App Portal", color: "bg-emerald-50", text: "Keep parents engaged with real-time updates on their child's attendance, fees, and academic performance.", image: image4 }
  ];

  return (
    <section className="py-16 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">The Unified Educational Ecosystem</h2>
          <p className="text-slate-500 text-sm">Synchronizing administrators, educators, students, and parents with a single intelligent management hub.</p>
          <div className="w-12 h-0.5 bg-red-500 mx-auto mt-4" />
        </div>

        <div className="relative">
          {/* S-Curve Path (Background SVG) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hidden lg:block pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 800 1200" fill="none" className="opacity-20">
              <path d="M400 50 C 600 200, 200 400, 400 600 S 600 1000, 400 1150" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="8 8" />
            </svg>
          </div>

          {portals.map((portal, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 mb-24 last:mb-0 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2 text-left px-4">
                <h3 className={`text-4xl font-bold mb-4 ${index % 2 === 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                  {portal.title}
                </h3>
                <p className="text-slate-500 leading-relaxed max-w-md">
                  {portal.text}
                </p>
              </div>

              <div className={`w-full lg:w-1/2 p-8 rounded-[40px] ${portal.color} flex justify-center shadow-sm border border-white`}>
                <div className="bg-white rounded-xl shadow-lg p-2 overflow-hidden border border-slate-100">
                   {/* Replace with your specific mockup images */}
                  <img src={portal.image} alt={portal.title} className="w-full max-w-sm rounded-lg" />
                </div>
              </div>
              
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnifiedEcosystem;