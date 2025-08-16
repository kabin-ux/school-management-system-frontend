
export default function AttendanceChart() {
  const chartData = [
    { day: 'Sunday', value: 95 },
    { day: 'Monday', value: 88 },
    { day: 'Tuesday', value: 92 },
    { day: 'Wednesday', value: 75 },
    { day: 'Thursday', value: 85 },
    { day: 'Friday', value: 90 },
    { day: 'Saturday', value: 5 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Student Attendance Graph</h3>
          <p className="text-sm text-gray-600">Last 7 days performance</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Daily Collections</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
        
        <div className="ml-12 h-full flex items-end justify-between">
          {chartData.map((point, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-2">
                <div 
                  className="w-3 h-3 bg-blue-600 rounded-full relative z-10"
                  style={{ marginBottom: `${(point.value / maxValue) * 200}px` }}
                />
                {index < chartData.length - 1 && (
                  <div 
                    className="absolute top-1.5 left-1.5 w-8 border-t-2 border-blue-600"
                    style={{ 
                      transform: `rotate(${Math.atan2(
                        (chartData[index + 1].value - point.value) / maxValue * 200,
                        32
                      )}rad)`
                    }}
                  />
                )}
              </div>
              <span className="text-xs text-gray-500">{point.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}