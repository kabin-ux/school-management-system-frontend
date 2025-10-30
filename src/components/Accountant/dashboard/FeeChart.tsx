import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { AccountantDashboard } from "../../../hooks/useDashboard";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface FeeChartProps {
  accountantDashboard: AccountantDashboard;
}

export const FeeChart: React.FC<FeeChartProps> = ({ accountantDashboard }) => {
  const paymentData = accountantDashboard?.paymentGraphData || [];

  const labels = paymentData.map((d) =>
    new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );
  const values = paymentData.map((d) => d.totalAmount);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Collection (Rs)",
        data: values,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        pointBackgroundColor: "#3b82f6",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      x: {
        ticks: { color: "#6b7280" },
        grid: { color: "#f3f4f6" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#6b7280" },
        grid: { color: "#f3f4f6" },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Fee Collection Trend</h3>
          <p className="text-gray-600 text-sm">Last 30 days performance</p>
        </div>
      </div>

      <div className="relative h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
