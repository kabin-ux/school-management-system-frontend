export default function FeeChart() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Fee Collection Trend</h3>
          <p className="text-gray-600 text-sm">Last 7 Month performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Monthly Collection</span>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>
      </div>
      
      {/* Chart Area */}
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 600 200">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Chart line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            points="50,150 100,120 150,100 200,110 250,80 300,70 350,90 400,60 450,80 500,75 550,85"
          />
          
          {/* Data points */}
          {[
            {x: 50, y: 150}, {x: 100, y: 120}, {x: 150, y: 100}, {x: 200, y: 110},
            {x: 250, y: 80}, {x: 300, y: 70}, {x: 350, y: 90}, {x: 400, y: 60},
            {x: 450, y: 80}, {x: 500, y: 75}, {x: 550, y: 85}
          ].map((point, index) => (
            <circle key={index} cx={point.x} cy={point.y} r="4" fill="#3b82f6" />
          ))}
          
          {/* Y-axis labels */}
          <text x="20" y="50" className="text-xs fill-gray-500">60,000</text>
          <text x="20" y="90" className="text-xs fill-gray-500">40,000</text>
          <text x="20" y="130" className="text-xs fill-gray-500">20,000</text>
          <text x="20" y="170" className="text-xs fill-gray-500">0</text>
          
          {/* X-axis labels */}
          <text x="50" y="190" className="text-xs fill-gray-500">Jun</text>
          <text x="150" y="190" className="text-xs fill-gray-500">Jul</text>
          <text x="250" y="190" className="text-xs fill-gray-500">Aug</text>
          <text x="350" y="190" className="text-xs fill-gray-500">Sep</text>
          <text x="450" y="190" className="text-xs fill-gray-500">Oct</text>
          <text x="550" y="190" className="text-xs fill-gray-500">Nov</text>
        </svg>
      </div>
    </div>
  );
}