import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface AttendanceData {
  grade: string;
  percentage: number;
}

interface AttendancePieChartProps {
  data?: AttendanceData[];
}

export default function AttendancePieChart({ data = [] }: AttendancePieChartProps) {
  if (!data.length) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">
        No attendance data available
      </div>
    );
  }

  // Filter out zero-percentage grades for cleaner display
  const filteredData = data.filter((item) => item.percentage > 0);

  const chartData = {
    labels: filteredData.map((d) => `Grade ${d.grade}`),
    datasets: [
      {
        data: filteredData.map((d) => d.percentage),
        backgroundColor: [
          "#60A5FA", // Blue
          "#34D399", // Green
          "#FBBF24", // Yellow
          "#F87171", // Red
          "#A78BFA", // Purple
          "#FB923C", // Orange
        ],
        borderWidth: 15,
        borderColor: "#fff",
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows manual height control
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: { size: 13 },
          color: "#374151", // text-gray-700
        },
      },
      // title: {
      //   display: true,
      //   text: "Student Attendance by Grade",
      //   font: { size: 16, weight: "bold" },
      //   color: "#111827", // text-gray-900
      // },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm w-160 h-100" >
      <h3 className="text-lg font-semibold text-gray-900">Student Attendance Graph By Grade</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
}
