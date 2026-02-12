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

const UserPerformanceChart = () => {

  const userName = [
    "Sandeep.1",
    "Bhavesh",
    "Steve",
    "Ravikant",
    "Harshit",
    "Vikas",
    "Shashank",
    "Habiba",
    "Rishabh",
  ];

  const totalLeads = [50, 65, 80, 75, 90, 110, 80, 90, 100];
  const completedLeads = [30, 40, 55, 50, 70, 85, 60, 65, 70];

  const conversionRatio = completedLeads.map(
    (c, i) => ((c / totalLeads[i]) * 100).toFixed(1)
  );

  const data = {
    labels: userName,
    datasets: [
      {
        label: "Total Leads",
        data: totalLeads,
        backgroundColor: "#3b82f6",
        stack: "Stack 1",
        categoryPercentage: 0.5,  // 👈 width control
        barPercentage: 0.6,
      },
      {
        label: "Completed Leads",
        data: completedLeads,
        backgroundColor: "#22c55e",
        stack: "Stack 1",
        categoryPercentage: 0.5,
        barPercentage: 0.6,
      },
      {
        label: "Conversion Ratio (%)",
        data: conversionRatio,
        backgroundColor: "#f97316",
        stack: "Stack 1",
        categoryPercentage: 0.5,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 👈 Important for height control
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Performance (Stacked)",
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
    <div className="bg-white p-6 rounded-xl shadow-md h-[350px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default UserPerformanceChart;
