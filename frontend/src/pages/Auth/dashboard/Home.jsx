import React, { useEffect } from "react";
import Members from "./Members";
import Design from "./Design";
import LeadTimelineChart from "../../../components/LeadTimelineChart";
import { ChartNoAxesColumn, UserRoundSearch ,Target,DollarSign,ChartLine} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux-store/user-reducers/userSlice";
import {  Search  } from "lucide-react";
import LeadsByStatusChart from "../../../components/LeadsByStatusChart";
import LeadsBySourceChart from "../../../components/LeadsBySourceChart";
import LeadsByFolderChart from "../../../components/LeadsByFolderChart";
import { toast } from "sonner";
import { getLeads } from "../../../redux-store/leads/leadsSlice";

const Home = () => {
  const dispatch = useDispatch();
 


  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .then((res) => {
        console.log("res");
        console.log(res);
      })
      .catch((er) => {
        console.log("er");
        console.log(er);
      });
  }, [dispatch]);

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


   
const {leads}=useSelector((state)=>state.leads)
console.log("leads")
console.log(leads)

  return (
    <div className="flex flex-col bg-gray-100 gap-6">

     
      
      
      <div className="border flex justify-between items-center border-gray-300 rounded-xl shadow-md px-4 py-6 hover:shadow-xl">
        <div>
          <h1 className="font-bold text-2xl ">Welcome back, Manasvi !</h1>
          


        
          <p className="text-sm text-gray-500">
            Manage your lead pipeline and team performance
          </p>
        </div>
        <div>


          <p className="flex items-center">
            Last updated{" "}
            <p className="h-2 w-2 ml-2 bg-green-500 rounded-full"></p>
          </p>
          <p className="text-xs text-gray-800">2/11/2026, 11:47:07 PM</p>
        </div>
      </div>
      
      {/* second div */}
      <div>
        <div className="border flex justify-between items-center border-gray-300 rounded-xl shadow-lg px-4 py-6">
          <div className="flex flex-col gap-2 w-64 bg-white border-gray-300 p-4 rounded-xl shadow-lg hover: shadow-md transition duration-300 ">
            <p className="text-xl font-semibold">
              Total Leads <br /> 3,612
            </p>
            <p className="flex items-center text-sm text-green-600">
           
                 <ChartNoAxesColumn size={25} />+1993.8% vs last month
            </p>
            <p></p>

            {/* <div className="inline-flex items-center justify-center bg-blue-600 p-3 rounded-full shadow-md">
              <UserRoundSearch className="w-5 h-5 text-white" />
            </div> */}
          </div>

          <div className="flex flex-col gap-2 w-64 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ">
            <p className="text-xl font-semibold">
              Conversion Rate <br /> 0.8%
            </p>
            <p className="flex items-center text-sm text-green-600">
              <Target size={25} />
              29 won / 3616 total
            </p>
            <p></p>

            {/* <div className="inline-flex items-center justify-center bg-blue-600 p-3 rounded-full shadow-md">
              <UserRoundSearch className="w-5 h-5 text-white" />
            </div> */}
          </div>

          <div className="flex flex-col gap-2 w-64 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ">
            <p className="text-xl font-semibold">
              Qualified Leads <br /> 3
            </p>
            <p className="flex items-center text-sm text-green-600">
              <DollarSign size={25} />
              0.1% of total
            </p>
            <p></p>

            {/* <div className="inline-flex items-center justify-center bg-blue-600 p-3 rounded-full shadow-md">
              <UserRoundSearch className="w-5 h-5 text-white" />
            </div> */}
          </div>

          <div className="flex flex-col gap-2 w-64 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ">
            <p className="text-xl font-semibold">
            New Leads <br /> 514
            </p>
            <p className="flex items-center text-sm text-green-600">
              <ChartLine  size={25} />
             Require attention
            </p>
            <p></p>

            {/* <div className="inline-flex items-center justify-center bg-blue-600 p-3 rounded-full shadow-md">
              <UserRoundSearch className="w-5 h-5 text-white" />
            </div> */}
          </div>
        </div>

        {/* //graphs */}

        <div className="flex gap-6 py-5 w-full  h-[80vh]">
          <div className="flex-1 h-full">
            <LeadsByStatusChart />
          </div>

          <div className="flex-1 h-full">
            <LeadsBySourceChart />
          </div>

        </div>


{/* 
        <div>
          <LeadsByFolderChart></LeadsByFolderChart>
        </div> */}

        {/* third div team performance */}

        <div className="border  border-gray-300 rounded-xl shadow-md px-4 py-6 hover:shadow-xl mt-5 ">
          {/* Header */}
          <h2 className="text-xl font-semibold text-gray-900">
            All Team Members
          </h2>
          <p className="text-black text-sm mb-6">Team Members Details</p>

          {/* Members List */}
          <div className="space-y-4">
            <div className="flex items-center bg-gray-300 px-4 py-2 rounded-lg mb-6">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search members"
                className="bg-transparent outline-none text-sm w-full text-gray-300 placeholder-gray-500"
              />
            </div>

            {/* 
   table header */}
            <div>
              <div className="grid grid-cols-6 text-sm text-black border-b border-gray-700 pb-3">
                <p className="text-gray-700 text-[1rem]">Member</p>
                <p className="text-gray-700 text-[1rem]">Status</p>
                <p className="text-gray-700 text-[1rem]">Enrolled</p>
                <p className="text-gray-700 text-[1rem]">Progress</p>
                <p className="text-gray-700 text-[1rem]">Assign</p>
                <p className="text-gray-700 text-[1rem]">Completed</p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-6 items-center bg-gray-200 p-4 rounded-xl hover:bg-gray-300 transition">
                  
                </div>


               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
