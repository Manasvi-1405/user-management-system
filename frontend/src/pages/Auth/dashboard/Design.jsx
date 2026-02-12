import React, { useState } from "react";
import Members from "./Members";
import LeadTimelineChart from "../../../components/LeadTimelineChart";
import { employeeData } from "../../../utils/employeeData";

const Design = () => {
  const [selectedUser, setSelectedUser] = useState(employeeData[0]?.name);

  return (
    <div className="p-4 space-y-6">
      {/*component render member matlab jb setselecteduser prop pass kr rhe hai agar jb user us component pr click kre ga  to  ye function call hoga  userupdate ho jye ga  */}
      <Members setSelectedUser={setSelectedUser} />

      <div>
        <h3 className="text-white text-2xl mb-4">
          Lead Chart for: {selectedUser}
        </h3>

        <LeadTimelineChart
          selectedUser={selectedUser}
          employeeData={employeeData}
        />
      </div>
    </div>
  );
};

export default Design;

// // import React from 'react'
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Tooltip,
// //   Legend,
// //   TimeScale,} from "chart.js";
// // import { Bar } from "react-chartjs-2";
// // import "chartjs-adapter-date-fns";

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   TimeScale,
// //   Tooltip,
// //   Legend
// // );

// // const Design = ({selectUser, leadData}) => {
// //   const userData = leadData.filter(
// //     (item)=>item.user ===selectUser);

// //   const data = {
// //     labels: userData.map((item) => item.user),
// //     datasets: [
// //       {
// //         label: "Assigned Leads Duration",
// //         data: leadData.map((item) => [
// //           new Date(item.startDate),
// //           new Date(item.endDate),
// //         ]),
// //         backgroundColor: "#4ade80",
// //         borderRadius: 6,
// //         barPercentage: 0.6,
// //       },
// //     ],
// //   };

// //   const options = {
// //     indexAxis: "y", // horizontal bar
// //     responsive: true,
// //     scales: {
// //       x: {
// //         type: "time",
// //         time: {
// //           unit: "day",
// //         },
// //         title: {
// //           display: true,
// //           text: "Timeline",
// //         },
// //       },
// //       y: {
// //         title: {
// //           display: true,
// //           text: "Users",
// //         },
// //       },
// //     },
// //     plugins: {
// //       legend: {
// //         display: false,
// //       },
// //     },
// //   };

// //   return (
// //     <>

// //      {/* <div className='text-white'>Graph Representation</div> */}
// //      <div>
// //       <h3 className="text-white mb-4 text-3xl">Lead Assignment Timeline</h3>
// //       <Bar data={data} options={options} />
// //     </div>

// //     </>
// //   )
// // }

// // export default Design
