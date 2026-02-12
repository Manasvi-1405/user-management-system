import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const LeadsBySourceChart = () => {
  const data = {
    labels: [
      "Import",
      "Social Media",
      "Manual",
      "Strategy Call",
      "Landing Page",
    ],
    datasets: [
      {
        label: "Leads",
        data: [3449, 149, 13, 4, 1],
        backgroundColor: [
          "#10b981",
          "#06b6d4",
          "#f97316",
          "#f43f5e",
          "#8b5cf6",
        ],
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-[400px]">
      <h2 className="text-lg font-semibold mb-4">Leads by Source</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default LeadsBySourceChart;
