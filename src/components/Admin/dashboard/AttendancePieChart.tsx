import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import EmptyState from "../../../common/EmptyState";
import { PieChart } from "lucide-react";
import type { AttendanceData } from "../../../hooks/useDashboard";

// Register components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface AttendancePieChartProps {
  data?: AttendanceData[];
}

export default function AttendancePieChart({ data = [] }: AttendancePieChartProps) {
  if (!data.length) {
    return (
      <div className='bg-white border border-gray-200 flex justify-center'>
        <EmptyState
          title='No Grade wise Attendance Data Found'
          description='There are currently no gradewise attendance records.'
          icon={<PieChart className='w-14 h-14' />}
        />
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
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Attendance Graph By Grade</h3>
      <div className="h-80">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
