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
import { useDispatch, useSelector } from "react-redux";
import { getLeads } from "../redux-store/leads/leadsSlice";
import { toast } from "sonner";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);










const LeadsByStatusChart = () => {

   const dispatch = useDispatch();
const leads = useSelector((state) => state.leads?.leads) || [];

useEffect(() => {
    dispatch(getLeads()).unwrap().then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        toast.success(res.message
        )
      }
    })
      .catch((err) => {
        console.log("err", err);
      });
  }, [dispatch]);


  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});


  const data = {
    labels: [
      "DNP",
      "Not Interested",
      "New",
      "Follow-up",
      "Contacted",
      "Wrong Number",
      "Proposal Sent",
    ],
    datasets: [
      {
        label: "Leads",
        data: [1706, 954, 514, 140, 106, 105, 35],
        backgroundColor: [
          "#3b82f6",
          "#22c55e",
          "#facc15",
          "#ef4444",
          "#a855f7",
          "#ec4899",
          "#6366f1",
        ],
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  };

  const options = {
    indexAxis: "y", // 👈 makes it horizontal
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
    <div className="bg-white p-6 rounded-2xl shadow-md  h-[400px] ">
      <h2 className="text-lg font-semibold mb-4 " >Leads by Status</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default LeadsByStatusChart;
