import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Widget = () => {
  const location = useLocation();
  const selectedGenres = location.state?.selectedGenres;
  const [contentWidth, setContentWidth] = useState('100vw');

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    setContentWidth(`calc(100vw - ${scrollbarWidth}px)`);
  }, []);

  return (
    <div className="h-screen bg-black overflow-y-auto" style={{ width: contentWidth }}>
      <div className='mx-3'>
        <div className="h-[140vh] grid md:grid-cols-3 md:grid-rows-5 gap-x-6 gap-y-4">
          <div className="bg-amber-500 row-span-2"></div>
          <div className="bg-green-500 row-span-3"></div>
          <div className="bg-red-500 row-span-5"></div>
          <div className="bg-purple-500"></div>
          <div className="bg-blue-500 row-span-2 col-span-2"></div>
        </div>
        <div className="h-[10vh] flex items-center justify-end">
          <button className="bg-green-600 w-32 h-8" type="submit">
            Browse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Widget;
