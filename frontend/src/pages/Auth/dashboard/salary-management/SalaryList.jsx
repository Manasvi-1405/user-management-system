import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllSalaries } from '../../../../redux-store/hr-management/salaryManagemenetSlice'

const SalaryList = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getAllSalaries()).unwrap().then((res)=>{
      console.log("res")
      console.log(res)
    }).catch((er)=>{
      console.log("er")
      console.log(er)
    })
  })
  return (
    <div>
      
    </div>
  )
}

export default SalaryList
