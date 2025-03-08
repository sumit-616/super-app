import React, { useEffect, useState } from 'react'
import userDp from '/card_img/userImg_dp.png';

const Movies = () => {
  const [data, setData] = useState([]);
  
  useEffect(()=>{
    fetch()
  })

  return (
    <div className='flex flex-col md:gap-3 min-h-screen w-full bg-black text-white overflow-x-scroll'>
    <div className='flex justify-between pt-8 px-10'>
      <h1 style={{fontFamily: 'Single Day'}} className='md:text-4xl text-6xl text-[#72DB73]'>Super App</h1>
      <img className='w-12 h-12 rounded-[40px]' src={userDp} alt=""/>
    </div>
    <div className='flex md:px-20 px-10'>
      <h1 style={{fontFamily: 'Roboto'}} className='text-2xl font-bold '>Entertainment according to your choice</h1>
      <div>

      </div>
    </div>
    </div>
  )
}

export default Movies;
