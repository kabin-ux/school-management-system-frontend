import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import graduation from '../../assets/Vector.png';

const RealSuccessStories = () => {
  const stats = [
    { label: "Partnered Schools", value: "23" },
    { label: "Students Using Gurukul-Setu", value: "5.9k" },
    { label: "Teachers Using Gurukul-Setu", value: "2.2k" },
    { label: "Parents Using Gurukul-Setu", value: "3.3k" },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#2D3142] mb-2">Real Success Stories</h2>
          <p className="text-gray-500 text-sm">Empowering administrators and educators with superior oversight and student engagement.</p>
          <div className="w-12 h-1 bg-red-500 mx-auto mt-4"></div>
        </div>

        {/* Testimonial Content */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          <div className="relative">
            <div className="bg-[#5D3FD3] w-64 h-64 md:w-80 md:h-80 rounded-[40px] relative overflow-visible">
              <img 
                src={graduation} 
                alt="Successful Student" 
                className="absolute bottom-0 scale-110 grayscale"
              />
              {/* Floating avatar group */}
              <div className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-lg flex items-center gap-2 border border-white">
                <div className="flex -space-x-2">
                   {[1,2].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />)}
                </div>
                <span className="text-[10px] font-bold text-gray-400">+1.2k</span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-4xl font-bold text-[#2D3142] mb-6">What Our Clients say <br/> about us</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg">
              The Student App is a personalized companion for students to stay on top of their academic journey. It displays real-time attendance records, upcoming class schedules, homework assignments, exam results.
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                   <img src="/path-to-author.png" alt="Seona palmsmith" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2D3142]">Seona palmsmith</h4>
                  <p className="text-[10px] text-gray-400 mb-1">Dixon Corp</p>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400" />)}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 rounded-full border border-gray-200 text-[#5D3FD3] hover:bg-gray-50"><ChevronLeft className="w-5 h-5"/></button>
                <button className="p-2 rounded-full bg-[#5D3FD3] text-white shadow-lg"><ChevronRight className="w-5 h-5"/></button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-[#5D3FD3] mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold text-[#5D3FD3] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealSuccessStories;