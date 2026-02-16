import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getLeads } from "../redux-store/leads/leadsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const LeadsBySourceChart = () => {

const leads = useSelector((state) => state.leads?.leads) || [];
 const dispatch = useDispatch();




useEffect(() => {
    dispatch(getLeads()).unwrap().then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        toast.success(
        )
      }
    })
      .catch((err) => {
        console.log("err", err);
      });
  }, [dispatch]);






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
