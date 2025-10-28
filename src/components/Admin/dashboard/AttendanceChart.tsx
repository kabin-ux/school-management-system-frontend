import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import EmptyState from "../../../common/EmptyState";
import { LineChart } from "lucide-react";
import type { AttendanceItem } from "../../../hooks/useDashboard";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);


interface AttendanceChartProps {
  data: AttendanceItem[];
}

export default function AttendanceChart({ data = [] }: AttendanceChartProps) {
  if (!data.length) {
    return (
      <div className='bg-white border border-gray-200 flex justify-center'>
        <EmptyState
          title='No Attendance Data Found'
          description='There are currently no attendance records.'
          icon={<LineChart className='w-14 h-14' />}
        />
      </div>

    );
  }

  // Prepare chart data
  const labels = data.map((d) =>
    new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Present",
        data: data.map((d) => Number(d.present)),
        borderColor: "#34D399",
        backgroundColor: "rgba(52, 211, 153, 0.3)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Absent",
        data: data.map((d) => Number(d.absent)),
        borderColor: "#F87171",
        backgroundColor: "rgba(248, 113, 113, 0.3)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Leave",
        data: data.map((d) => Number(d.leave)),
        borderColor: "#60A5FA",
        backgroundColor: "rgba(96, 165, 250, 0.3)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: { size: 13 },
          color: "#374151",
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#6B7280" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#6B7280", stepSize: 1 },
        grid: { color: "#E5E7EB" },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h3>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
