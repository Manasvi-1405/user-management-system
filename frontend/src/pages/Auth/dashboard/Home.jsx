import React, { useEffect } from 'react'
import Members from "./Members"
import Design from "./Design"
import LeadTimelineChart from './LeadTimelineChart'
import { ChartNoAxesColumn, UserRoundSearch } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../../redux-store/user-reducers/userSlice'

const Home = () => {

  const dispatch=useDispatch()


  useEffect(()=>{
    dispatch(getUsers()).unwrap().then((res)=>{
      console.log("res")
      console.log(res)
    }).catch((er)=>{
      console.log("er")
      console.log(er)
    })
  },[])
  return (
    <div className='flex flex-col gap-6'>
      <div className='border flex justify-between items-center border-gray-300 rounded-xl shadow-md px-4 py-6'>
        <div>
          <h1 className='font-bold text-2xl '>Welcome back, Manasvi !</h1>
          <p className='text-sm text-gray-800'>Manage your lead pipeline and team performance</p>
        </div>
        <div>
          <p className='flex items-center'>Last updated <p className='h-2 w-2 ml-2 bg-green-500 rounded-full'></p></p>
          <p className='text-xs text-gray-800'>2/11/2026, 11:47:07 PM

          </p>
        </div>

      </div>

      <div>
        <div className='border flex justify-between items-center border-gray-300 rounded-xl shadow-md px-4 py-6'>
          <div className='flex flex-col gap-2 '>
            <p className='text-xl font-semibold'>Total Leads <br /> 3,612</p>
            <p className='flex text-sm text-green-600'><ChartNoAxesColumn size={15} />+1993.8% vs last month</p>
            <p></p>
          </div>
          <div className="inline-flex items-center justify-center bg-blue-600 p-3 rounded-full shadow-md">
            <UserRoundSearch className="w-5 h-5 text-white" />
          </div>


        </div>
      </div>
    </div>

  )
}

export default Home