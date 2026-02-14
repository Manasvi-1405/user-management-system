import React, { useEffect } from 'react'
import { getLeads } from '../../../redux-store/leads/leadsSlice'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'

const AllLeads = () => {
  const dispatch=useDispatch()





  useEffect(()=>{
    dispatch(getLeads()).unwrap().this((res)=>{
      console.log("res",res)
      if(res.status===200){
        toast.success(res.data.message)
      }
    }).catch((err)=>{
      console.log("err",err)
      if(err.status===500){
    toast.err()

      }
    })
  },[dispatch])





  return (
    <div>
      <h1>AllLeads</h1>
    </div>
  )
}

export default AllLeads
