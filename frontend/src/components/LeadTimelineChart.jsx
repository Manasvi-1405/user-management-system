
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import { employeeData } from "../../../utils/employeeData";


// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend
// );

// const LeadTimelineChart = ({ selectedUser }) => {
//   const user = employeeData.find(
//     (item) => item.name === selectedUser
//   );

//   if (!user) return <p className="text-white">No data found</p>;

//   const data = {
//     labels: ["Assigned Leads", "Completed Leads"],
//     datasets: [
//       {
//         label: user.name,
//         data: [
//           Number(user.leadAssigned),
//           Number(user.completedLeads),
//         ],
//         backgroundColor: ["#4ade80", "#60a5fa"],
//         borderRadius: 6,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//     },
//   };

//   return(
//      <div className="w-[400px] h-[250px] flex justify-center">
//     <Bar data={data} options={options} />
//   </div>
//   )
//   //  <Bar data={data} options={options} />;
   
// };

// export default LeadTimelineChart;



import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const DashboardLineChart = () => {
  // Example data (monthly users data)
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Total Members",
        data: [50, 70, 65, 80, 95, 110, 100, 130, 120, 125, 140, 150],
        borderColor: "#a3e635",
        backgroundColor: "rgba(163, 230, 53, 0.2)",
        tension: 0.4, // smooth curve
        fill: true,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f8fafc",
        bodyColor: "#f1f5f9",
      },
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8" },
        grid: { color: "rgba(255, 255, 255, 0.05)" },
      },
      y: {
        ticks: { color: "#94a3b8" },
        grid: { color: "rgba(255, 255, 255, 0.05)" },
      },
    },
  };

  return (
    <div className="w-full h-[350px] md:h-[400px] bg-[#0f172a] p-4 rounded-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default DashboardLineChart;
