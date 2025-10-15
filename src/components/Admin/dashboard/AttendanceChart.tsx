export default function AttendanceChart({ data }) {
  const chartData = data?.last7DaysAttendanceGraphData ?? [];

  // Convert and normalize data
  const normalizedData = chartData.map((d) => ({
    date: d.date,
    count: Number(d.count),
  }));

  // Compute max count to scale the bars/dots - handle empty data case
  const maxValue = Math.max(...(normalizedData.length ? normalizedData.map(d => d.count) : [1]));

  // If no data, show empty state
  if (normalizedData.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Student Attendance Graph</h3>
            <p className="text-sm text-gray-600">Last 7 days performance</p>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">No attendance data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Student Attendance Graph</h3>
          <p className="text-sm text-gray-600">Last 7 days performance</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Attendance Count</span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 w-8">
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.75)}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>{Math.round(maxValue * 0.25)}</span>
          <span>0</span>
        </div>

        {/* Chart bars */}
        <div className="ml-12 h-full flex items-end justify-between gap-2">
          {normalizedData.map((point, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              {/* Bar with minimum height to ensure visibility */}
              <div
                className="bg-blue-500 rounded-t-md w-full max-w-12 transition-all duration-300 hover:bg-blue-600"
                style={{
                  height: `${Math.max((point.count / maxValue) * 100, 2)}%`,
                  minHeight: '4px' // Ensure bar is always visible, even for 0 values
                }}
              ></div>
              <span className="text-xs text-gray-500 mt-2 text-center">
                {new Date(point.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none ml-12">
          <div className="h-full flex flex-col justify-between">
            {[0, 0.25, 0.5, 0.75, 1].map((position) => (
              <div 
                key={position}
                className="border-t border-gray-100"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}