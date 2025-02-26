import React, { useState } from 'react';
import loginImage from "../images/login.png";
import "../index.css";
import "./Home.css"

const green = {
  color: "#72DB73"
}


const Home = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  function handleName(event){
    const name = event.target.value;
    setName(name);
  }

  function handleUserName(event){
    const userName = event.target.value;
    setUserName(userName);
  }

  function handleEmail(event){
    const email = event.target.value;
    setEmail(email);
  }

  function handleMobileNumber(event){
    const mobileNumber = event.target.value;
    setMobileNumber(mobileNumber);
  }

  function handleSubmit(event){
    event.preventDefault();
    setIsSubmitted(true);
  }

  function handleCheck(event){
    const checked = event.target.checked;
    setIsChecked(checked);
  }

  return (
    <div className='flex w-screen h-screen overflow-hidden bg-black text-white'>
      <div className='relative w-1/2 h-screen overflow-hidden'>
        <img className='w-full h-full object-cover' src={loginImage} alt="Login Image" />
        <h1 className="absolute bottom-[11vh] left-[3vw] text-5xl font-black leading-14">
          Discover new things on <br/> Superapp
        </h1>
      </div>
      <div className='flex flex-col w-1/2 h-screen py-auto px-[11vw]'>
        <div className='flex flex-col justify-center items-center gap-2 py-5'>
          <h1 style={{green, fontFamily: "Single Day", color: "#72DB73"}} className='text-5xl'>Super app</h1>
          <p className='text-2xl font-bold'>Create your new account</p>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-[1vh]'>
          <input onChange={handleName} className='border border-[#72DB73] hover:border-[#5BB95C] border-[0.667px]  rounded-[6.82px] focus:outline-none py-2.5 px-4.5 bg-[#292929]' type="text" placeholder='Name' value={name}/>
          <p className='text-[#ff0000] text-center'>{isSubmitted && name.length===0?`Name is required`:""}</p>
          <input onChange={handleUserName} className='border border-[#72DB73] hover:border-[#5BB95C] border-[0.667px]  rounded-[6.82px] focus:outline-none py-2.5 px-4.5 bg-[#292929]' type="text" placeholder='UserName' value={userName}/>
          <p className='text-[#ff0000] text-center'>{isSubmitted && userName.length===0?`UserName is required`:""}</p>
          <input onChange={handleEmail} className='border border-[#72DB73] hover:border-[#5BB95C] border-[0.667px]  rounded-[6.82px] focus:outline-none py-2.5 px-4.5 bg-[#292929]' type="email" placeholder='Email' value={email}/>
          <p className='text-[#ff0000] text-center'>{isSubmitted && email.length===0?`Email is required`:""}</p>
          <input onChange={handleMobileNumber} className='border border-[#72DB73] hover:border-[#5BB95C] border-[0.667px]  rounded-[6.82px] focus:outline-none py-2.5 px-4.5 bg-[#292929]' type="number" placeholder='Mobile' value={mobileNumber}/>
          <p className='text-[#ff0000] text-center'>{isSubmitted && mobileNumber.length===0?`Mobile Number is required`:""}</p>
          <div className='flex gap-3 my-2'>
            <input onChange={handleCheck} className='cursor-pointer' type="checkbox" name="terms_conditions" id="terms" checked={isChecked}/>
            <label className='text-[0.92rem] cursor-pointer' htmlFor="terms">I agree to the <span style={green}>Terms of Service</span> and <span style={green}>Privacy Policy</span></label>
          </div>
            <p className='text-[#ff0000] text-center'>{isSubmitted && !isChecked?`Please Accept Terms and Conditions`:""}</p>
          <button className='bg-[#72DB73] rounded-[28px] py-2 text-[22px] font-bold my-0.5 font-[Roboto] cursor-pointer' type='submit'>SIGN UP</button>
        </form>
        <div className='flex flex-col text-[#7c7c7c] gap-1.5 my-2'>
        <p>By clicking on Sign up. You agree to Superapp <span style={green}>Terms and Conditions of Use</span></p>
        <p>To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp <span style={green}>Privacy Policy</span></p>
        </div>
      </div>
    </div>
  );
};

export default Home;
