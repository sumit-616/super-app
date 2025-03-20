import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Stopwatch from './Stopwatch';
import { useNavigate } from 'react-router-dom';
import News from './News';

const Widget = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedGenres, userData } = location.state || {};
  const [contentWidth, setContentWidth] = useState('100vw');

  const[currentDate, setCurrentDate] = useState(getCurrentDate());
  const[currentTime, setCurrentTime] = useState(getCurrentTime());

  function getCurrentDate(){
    const todayDate = new Date();
    const formattedDate = `${String(todayDate.getDate()).padStart(2, '0')}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${todayDate.getFullYear()}`;
    return formattedDate;
  }

  function getCurrentTime(){
    const latestTime = new Date();
    const hours = latestTime.getHours();
    const minutes = String(latestTime.getMinutes()).padStart(2, '0');
    const seconds = String(latestTime.getSeconds()).padStart(2, '0');

    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = String(hours % 12 || 12).padStart(2, '0');

    const formattedTime = `${formattedHours}:${minutes}:${seconds} ${period}`;
    return formattedTime;
  }

  setInterval(() => {
    setCurrentDate(getCurrentDate());
  }, 10000);

  setInterval(()=>{
    setCurrentTime(getCurrentTime());
  },1000);

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    setContentWidth(`calc(100vw - ${scrollbarWidth}px)`);
  }, []);

  function handleClick(){
    navigate('/movies', {state: {selectedGenres, userData}})
  }

  return (
    <div className="h-screen w-[100vw] bg-black overflow-hidden" style={{ width: contentWidth }}>
      <div className='mx-6 mt-2 mb-2'>
        <div className="h-[98vh] grid md:grid-cols-3 md:grid-rows-5 sm:grid-cols-1 gap-x-12 gap-y-4 overflow-hidden">
          {/* userDp first one */}
          <div className="flex items-center bg-[#5746EA] row-span-2 py-6 rounded-2xl px-6 overflow-hidden">
            <img className='h-full w-28' src="/card_img/boydp.png" alt="" />
            <div className='flex flex-col px-6 gap-4'>
              <div className='text-white'>
                <h3 className='text-xl'>{userData?.name}</h3>
                <h3 className='text-xl'>{userData?.email}</h3>
                <h1 className='text-3xl font-bold'>{userData?.userName}</h1>
              </div>
              <div className='grid md:grid-cols-2 gap-x-6 gap-y-2'>
                {selectedGenres?.map((genre, index) => (
                  <div key={index}>
                    <div className='text-white rounded-2xl text-md h-8 w-24 bg-[#9F94FF] flex justify-center items-center'>{genre}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* notes second one */}
          <div className="flex flex-col gap-2 bg-[#F1C75B] row-span-3 p-4 rounded-2xl">
            <h1 style={{ font: "Roboto" }} className='text-black text-3xl font-bold'>All notes</h1>
            <textarea className='w-full h-full p-2 border-2 rounded-lg' name="notes" id="notes" placeholder='This is how I am going to learn MERN Stack in next 3 months.'></textarea>
          </div>
          {/* news section */}
          <div className="bg-white row-span-5 overflow-hidden">
            <News handleClick={handleClick}/>
          </div>
          {/* weather and time */}
          <div className='rounded-2xl overflow-hidden text-white'>
            <div className='flex items-center justify-around text-2xl font-semibold px-6 h-[27%] bg-[#FF4ADE]'>
              <h1>{currentDate}</h1>
              <h1>{currentTime}</h1>
            </div>
            <div className='h-[70%] bg-[#101744]'></div>
          </div>
          {/* stopwatch */}
          <div className="row-span-2 col-span-2 rounded-2xl">
            <Stopwatch />
          </div>
        </div>
        {/* browse button for navigation */}
        {/* <div className="h-[10vh] flex items-center justify-end">
          <button onClick={handleClick} className="bg-[#148A08] w-32 h-8 rounded-2xl text-white font-semibold tracking-wide cursor-pointer">
            Browse
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Widget;
