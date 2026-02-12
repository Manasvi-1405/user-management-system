import React from 'react'
import UserPerformanceChart from "../../../components/userPerformanceChart";


const Performance = () => {
  return (
   //main div
   <div>

      <div>
      <UserPerformanceChart />
      </div>

    <div className="border  border-gray-300 rounded-xl shadow-md px-4 py-6 hover:shadow-xl mt-5 ">
      <h2 className="text-xl font-semibold text-gray-900">
    All Team Members
  </h2>

  <div>
    <div className="grid grid-cols-6 text-sm text-black  border-gray-700 pb-3">
      {/* <p className="text-gray-700 text-[1rem] font-semibold">Member</p> */}
    </div>

    
       <div className="grid grid-cols-5 text-sm text-black  font-semibold border-gray-700 pb-3">
        <p className="text-gray-700 text-[1rem]">Rank</p>
        <p className="text-gray-700 text-[1rem]">Team Member</p>
        <p className="text-gray-700 text-[1rem]">Leads Assigned</p>
        <p className="text-gray-700 text-[1rem]">Leads Converted</p>
        <p className="text-gray-700 text-[1rem]">Conversion Rate</p>
      
      </div>
    


    <div className="mt-4 space-y-3">
        <div className="grid grid-cols-5 items-center bg-gray-200 p-4 rounded-xl hover:bg-gray-300 transition">
             <div>
            <p className="font-medium">1</p>
          </div>
           <div>
            <p className="font-medium">Sandeep</p>
          </div>
          
        </div>

         <div className="grid grid-cols-5 items-center bg-gray-200 p-4 rounded-xl hover:bg-gray-300 transition">
            <div>
            <p className="font-medium">2</p>
          </div>
           <div>
            <p className="font-medium">Bhavesh</p>
          </div>
          
        </div>

         <div className="grid grid-cols-5 items-center bg-gray-200 p-4 rounded-xl hover:bg-gray-300 transition">
            <div>
            <p className="font-medium">3</p>
          </div>
           <div>
            <p className="font-medium">steve</p>
          </div>
          
        </div>

         <div className="grid grid-cols-5 items-center bg-gray-200 p-4 rounded-xl hover:bg-gray-300 transition">
            <div>
            <p className="font-medium">4</p>
          </div>
           <div>
            <p className="font-medium">ravikant</p>
          </div>
          
        </div>

         <div className="grid grid-cols-5 items-center bg-gray-200 p-4 rounded-xl hover:bg-gray-300 transition">
            <div>
            <p className="font-medium">5</p>
          </div>
           <div>
            <p className="font-medium">harshit </p>
          </div>
          
        </div>

         <div className="grid grid-cols-5 items-center bg-gray-200 p-4 rounded-xl hover:bg-gray-300 transition">
            <div>
            <p className="font-medium">6</p>
          </div>
           <div>
            <p className="font-medium">vikas</p>
          </div>
          
        </div>

         <div className="grid grid-cols-5 items-center bg-gray-200 p-4 rounded-xl hover:bg-gray-300 transition">
            <div>
            <p className="font-medium">7</p>
          </div>
           <div>
            <p className="font-medium">shashank</p>
          </div>
          
        </div>

         <div className="grid grid-cols-5 items-center bg-gray-200 p-4 rounded-xl hover:bg-gray-300 transition">
            <div>
            <p className="font-medium">8</p>
          </div>
           <div>
            <p className="font-medium">habiba</p>
          </div>
          
        </div>

        <div className="grid grid-cols-5 items-center bg-gray-200 p-4 rounded-xl hover:bg-gray-300 transition">
            <div>
            <p className="font-medium">9</p>
          </div>
           <div>
            <p className="font-medium">rishabh</p>
          </div>
          
        </div>
    </div>
    
  </div>

    </div>
  

    </div>
    


  )
}


// all members


  




export default Performance
