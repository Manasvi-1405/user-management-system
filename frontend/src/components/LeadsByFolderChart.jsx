import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LeadsByFolderChart = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.labels, // ["Sandeep", "Bhavesh"]
    datasets: [
      {
        label: "Total Leads",
        data: data.totalLeads,
        backgroundColor: "#3b82f6",
        barThickness: 25,
      },
      {
        label: "Completed Leads",
        data: data.completedLeads,
        backgroundColor: "#22c55e",
        barThickness: 25,
      },
      {
        label: "Conversion %",
        data: data.conversion,
        backgroundColor: "#f97316",
        barThickness: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "User Performance",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-[400px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default LeadsByFolderChart;
