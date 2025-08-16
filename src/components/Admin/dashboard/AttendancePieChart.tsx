
export default function AttendancePieChart() {
  const grades = [
    { name: 'Grade 3', percentage: 10, color: '#10b981' },
    { name: 'Grade 2', percentage: 11, color: '#06b6d4' },
    { name: 'Grade 4', percentage: 13, color: '#f59e0b' },
    { name: 'Grade 1', percentage: 11, color: '#8b5cf6' },
    { name: 'Grade 5', percentage: 11, color: '#ef4444' },
    { name: 'Others', percentage: 44, color: '#6b7280' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Attendance Graph</h3>
      
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            {grades.map((grade, index) => {
              const startAngle = grades.slice(0, index).reduce((sum, g) => sum + g.percentage, 0) * 3.6;
              const endAngle = startAngle + grade.percentage * 3.6;
              const largeArcFlag = grade.percentage > 50 ? 1 : 0;
              
              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
              
              return (
                <path
                  key={grade.name}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={grade.color}
                  stroke="white"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {grades.map((grade) => (
          <div key={grade.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: grade.color }}
              ></div>
              <span className="text-sm text-gray-700">{grade.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{grade.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}