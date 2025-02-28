import React from 'react'
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

const green = {
  color: "#72DB73"
}

const Genre = () => {



  return (
    <div className=' flex w-screen h-screen bg-black text-white overflow-hidden'>
      <div className='flex flex-col w-[35vw]'>
        <div className='flex flex-col gap-8 pl-24 pt-28 h-[60vh] box-border'>
          <h1 style={{ ...green, fontFamily: "Single Day" }} className='text-5xl'>Super App</h1>
          <h2 className='text-[2.5rem] font-[Roboto] font-bold leading-[3.25rem]'>Choose your <br /> entertainment <br /> category</h2>
        </div>
        <div>

        </div>
      </div>
      <div className="flex flex-col w-[65vw]">
        <div className="w-full grid grid-cols-3 gap-x-0 gap-y-8 pr-10 pl-32 h-[80vh] pt-12 relative">
          <button className='cursor-pointer'><Movie bgColor="#FF5209" movieGenre="Action" imgPath={actionImg} /></button>
          <button className='cursor-pointer'><Movie bgColor="#D7A4FF" movieGenre="Drama" imgPath={dramaImg} /></button>
          <button className='cursor-pointer'><Movie bgColor="#11B800" movieGenre="Romance" imgPath={romanceImg} /></button>
          <button className='cursor-pointer'><Movie bgColor="#84C2FF" movieGenre="Thriller" imgPath={thrillerImg} /></button>
          <button className='cursor-pointer'><Movie bgColor="#902500" movieGenre="Western" imgPath={westernImg} /></button>
          <button className='cursor-pointer'><Movie bgColor="#7358FF" movieGenre="Horror" imgPath={horrorImg} /></button>
          <button className='cursor-pointer'><Movie bgColor="#FF4ADE" movieGenre="Fantasy" imgPath={fantasyImg} /></button>
          <button className='cursor-pointer'><Movie bgColor="#E61E32" movieGenre="Music" imgPath={musicImg} /></button>
          <button className='cursor-pointer'><Movie bgColor="#6CD061" movieGenre="Fiction" imgPath={fictionImg} /></button>
        </div>
        <div className="flex h-[12vh] justify-end absolute bottom-0 right-16 ">
          <button className='bg-[#148A08] w-40 h-10 rounded-[1.5rem] cursor-pointer transition-all duration-100 hover:bg-[#0E6C06] hover:scale-102' type="submit">Next Page</button>
        </div>
      </div>
    </div>
  )
}

export default Genre;
