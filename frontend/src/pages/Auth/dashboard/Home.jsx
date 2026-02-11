import React from 'react'
import Members from "./Members"
import Design from "./Design"
import LeadTimelineChart from './LeadTimelineChart'

const Home = () => {
  return (
    <>

     <div className='text-white'>Home Page</div>
     

       <div className="h-56 bg-gradient-to- from-lime-500/20 to-transparent rounded-xl mb-8 relative">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-lime-400" />
      </div> 







{/* <Design></Design> */}

{/* <Members></Members> */}
<LeadTimelineChart></LeadTimelineChart>

     
    
    
    </>
   
  )
}

export default Home