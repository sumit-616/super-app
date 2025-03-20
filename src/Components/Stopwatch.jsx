import { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const totalTime = (parseInt(hours || 0) * 3600) + (parseInt(minutes || 0) * 60) + parseInt(seconds || 0);

  useEffect(() => {
    let timer;
    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        const newRemainingTime = totalTime - elapsedTime;

        if (newRemainingTime <= 0) {
          setRemainingTime(0);
          setIsRunning(false);
        } else {
          setRemainingTime(newRemainingTime);
        }
      }, 1000);
    } else if (!isRunning) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning, startTime, totalTime, remainingTime]);

  const handleToggle = () => {
    if (!isRunning && totalTime > 0) {
      setStartTime(Date.now());
      setRemainingTime(totalTime);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const handleInputChange = (setter, max) => (e) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value) || 0;
    setter(value > max ? max : value);
  };

  const incrementSeconds = () => {
    setSeconds((prev) => {
      if (prev === 59) {
        setMinutes((prevMin) => {
          if (prevMin === 59) {
            setHours((prevHour) => prevHour + 1);
            return 0;
          } else {
            return prevMin + 1;
          }
        });
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const decrementSeconds = () => {
    setSeconds((prev) => {
      if (prev === 0) {
        setMinutes((prevMin) => {
          if (prevMin === 0) {
            setHours((prevHour) => prevHour - 1);
            return 59;
          } else {
            return prevMin - 1;
          }
        });
        return 59;
      } else {
        return prev - 1;
      }
    });
  };

  const incrementMinutes = () => {
    setMinutes((prev) => {
      if (prev === 59) {
        setHours((prevHour) => prevHour + 1);
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const decrementMinutes = () => {
    setMinutes((prev) => {
      if (prev === 0) {
        setHours((prevHour) => prevHour - 1);
        return 59;
      } else {
        return prev - 1;
      }
    });
  };

  const incrementHours = () => {
    setHours((prev) => prev + 1);
  };

  const decrementHours = () => {
    setHours((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  const progress = (remainingTime / totalTime) * 100;

  const getProgressColor = (progress) => {
    if (progress >= 66) {
      return '#4ade80'; // Green
    } else if (progress >= 33) {
      return '#facc15'; // Yellow
    } else {
      return '#ef4444'; // Red
    }
  };

  return (
    <div className="flex items-center justify-center p-8 h-full bg-[#1E2343] text-white rounded-2xl gap-32 overflow-hidden">
      <div className="text-center flex gap-12 relative mb-24">
        <div className="mb-4 relative">
          <svg width="200" height="200" viewBox="0 0 120 120" className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            {/* Outer circle with margin */}
            <circle className='relative' cx="60" cy="60" r="55" fill="#191E39" stroke="#191E39" strokeWidth="8" />
            {/* Progress bar circle */}
            <circle className='relative'
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={getProgressColor(progress)}
              strokeWidth="4"
              strokeDasharray="314.16" // Circumference of the circle (2 * π * r)
              strokeDashoffset={314.16 - (progress / 100) * 314.16}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s linear, stroke 0.5s linear' }}
            />
          </svg>
          <div className='flex mt-14 gap-12 -ml-7'>
            <div>
              <span className="text-3xl font-mono absolute z-10">{String(Math.floor(remainingTime / 3600)).padStart(2, '0')}:</span>
            </div>
            <div>
              <span className="text-3xl font-mono absolute z-10">{String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0')}:</span>
            </div>
            <div>
              <span className="text-3xl font-mono absolute z-10">{String(remainingTime % 60).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <div className="flex justify-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-[#949494] pb-3">Hours</span>
            <button onClick={incrementHours} className="text-xl text-[#949494]">▲</button>
            <input
              type="number"
              min="0"
              value={hours}
              onChange={handleInputChange(setHours, Infinity)}
              className="w-16 p-1.5 text-3xl text-white text-center rounded border-none outline-none bg-transparent"
              placeholder="0"
            />
            <button onClick={decrementHours} className="text-xl text-[#949494]">▼</button>
          </div>
          <div className='pt-17 text-3xl'>:</div>
          <div className="flex flex-col items-center">
          <span className="text-[#949494] pb-3">Minutes</span>
            <button onClick={incrementMinutes} className="text-xl text-[#949494]">▲</button>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={handleInputChange(setMinutes, 59)}
              className="w-12 p-1.5 text-3xl text-center rounded border-none outline-none bg-transparent"
              placeholder="0"
            />
            <button onClick={decrementMinutes} className="text-xl text-[#949494]">▼</button>
          </div>
          <div className='pt-17 text-3xl'>:</div>
          <div className="flex flex-col items-center">
            <span className="text-[#949494] pb-3">Seconds</span>
            <button onClick={incrementSeconds} className="text-xl text-[#949494]">▲</button>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={handleInputChange(setSeconds, 59)}
              className="w-12 p-1.5 text-3xl text-center rounded border-none outline-none bg-transparent"
              placeholder="0"
            />
            <button onClick={decrementSeconds} className="text-xl text-[#949494]">▼</button>
          </div>
        </div>
        <div className='w-[24vw] ml-[1.2rem]'>
          <button
            onClick={handleToggle}
            className="text-2xl font-semibold tracking-wide mt-4 px-6 py-2 w-full bg-red-500 rounded-2xl hover:bg-red-600 cursor-pointer"
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;