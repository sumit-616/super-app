import React, { useState } from 'react'
import Movie from './Movie'
import actionImg from "../../public/card_img/action.png";
import dramaImg from "../../public/card_img/drama.png";
import romanceImg from "../../public/card_img/romance.png";
import thrillerImg from "../../public/card_img/thriller.png";
import westernImg from "../../public/card_img/western.png";
import horrorImg from "../../public/card_img/horror.png";
import fantasyImg from "../../public/card_img/fantasy.png";
import musicImg from "../../public/card_img/music.png";
import fictionImg from "../../public/card_img/fiction.png";
import vectorImg from "../images/Vector.png";
import { Navigate, useNavigate } from 'react-router-dom';

const green = {
  color: "#72DB73"
}

const Genre = () => {

  const [arrayOfMovieGenre, setArrayOfMovieGenre] = useState([]);
  const [nextPageCondition, setNextPageCondition] = useState(true);
  const navigate = useNavigate();

  function handleClickForNextPage(source) {
    if(source==="click"&&arrayOfMovieGenre.length > 2){
      navigate("/widget");
    }
    else if (arrayOfMovieGenre.length > 1) {
      if(source==="click"){
        setNextPageCondition(false);
      }
      else{
        setNextPageCondition(true);
      }
    }
    else if(source==="click" && arrayOfMovieGenre.length<3) {
      setNextPageCondition(false);
    }
  }

  function handleClickForGenre(movieGenre) {
    const index = arrayOfMovieGenre.findIndex((movie) => movie === movieGenre);
    if (index === -1) {
      setArrayOfMovieGenre([...arrayOfMovieGenre, movieGenre]);
    }
    else {
      const updatedGenre = [...arrayOfMovieGenre];
      updatedGenre.splice(index, 1);
      setArrayOfMovieGenre(updatedGenre);
    }
    handleClickForNextPage("");
  }

  return (
    <div className=' flex w-screen h-screen bg-black text-white overflow-hidden'>
      <div className='flex flex-col pl-20 w-[45vw]'>
        <div className='flex flex-col gap-8  pt-28 h-[60vh] box-border'>
          <h1 style={{ ...green, fontFamily: "Single Day" }} className='text-5xl'>Super App</h1>
          <h2 className='text-[2.5rem] font-[Roboto] font-bold leading-[3.25rem]'>Choose your <br /> entertainment <br /> category</h2>
        </div>
        <div className='flex flex-col gap-y-5'>
        <div className='flex flex-wrap text-white gap-x-4 gap-y-4 mt-6'>
          {
            arrayOfMovieGenre.map((movieGenre, index) => (
              <div key={index} className='flex justify-between items-center bg-[#148A08] w-[9rem] h-9  px-4     rounded-[0.6rem] text-[1rem] font-[Roboto]'>
                <span className='cursor-default'>{movieGenre}</span>
                <button onClick={() => handleClickForGenre(movieGenre)} className='cursor-pointer text-[#808080] contrast-200'>X</button>
              </div>
            ))
          }
        </div>
          {
            nextPageCondition ? "" : <div className='flex gap-1.5 text-[#FF0000]'>
            <img className='w-5 h-5' src={vectorImg} alt="" />
            <p className='text-xl'>Minimum 3 categories required</p>
          </div>
          }
        </div>
      </div>
      <div className="flex flex-col w-[55vw]">
        <div className="w-full grid grid-cols-3 gap-x-4 gap-y-8 pr-10 pl-10 h-[80vh] pt-12 relative">
          <button className='cursor-pointer'><Movie handleClickForGenre={handleClickForGenre} bgColor="#FF5209" movieGenre="Action" imgPath={actionImg} /></button>
          <button className='cursor-pointer'><Movie handleClickForGenre={handleClickForGenre} bgColor="#D7A4FF" movieGenre="Drama" imgPath={dramaImg} /></button>
          <button className='cursor-pointer'><Movie handleClickForGenre={handleClickForGenre} bgColor="#11B800" movieGenre="Romance" imgPath={romanceImg} /></button>
          <button className='cursor-pointer'><Movie handleClickForGenre={handleClickForGenre} bgColor="#84C2FF" movieGenre="Thriller" imgPath={thrillerImg} /></button>
          <button className='cursor-pointer'><Movie handleClickForGenre={handleClickForGenre} bgColor="#902500" movieGenre="Western" imgPath={westernImg} /></button>
          <button className='cursor-pointer'><Movie handleClickForGenre={handleClickForGenre} bgColor="#7358FF" movieGenre="Horror" imgPath={horrorImg} /></button>
          <button className='cursor-pointer'><Movie handleClickForGenre={handleClickForGenre} bgColor="#FF4ADE" movieGenre="Fantasy" imgPath={fantasyImg} /></button>
          <button className='cursor-pointer'><Movie handleClickForGenre={handleClickForGenre} bgColor="#E61E32" movieGenre="Music" imgPath={musicImg} /></button>
          <button className='cursor-pointer'><Movie handleClickForGenre={handleClickForGenre} bgColor="#6CD061" movieGenre="Fiction" imgPath={fictionImg} /></button>
        </div>
        <div className="flex h-[12vh] justify-end absolute bottom-0 right-16 ">
          <button onClick={()=>handleClickForNextPage("click")} className='bg-[#148A08] w-40 h-10 rounded-[1.5rem] cursor-pointer transition-all duration-100 hover:bg-[#0E6C06] hover:scale-102' type="submit">Next Page</button>
        </div>
      </div>
    </div>
  )
}

export default Genre;
