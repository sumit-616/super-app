import React from 'react';

const Movie = (props) => {
  return (
    <div onClick={()=>props.handleClickForGenre(props.movieGenre)} style={{ backgroundColor: props.bgColor }} className="w-48 h-[7.7rem] flex flex-col items-center justify-center p-2 rounded-lg text-white transition-transform duration-100 hover:scale-105">
      <p className="text-xl font-bold mb-2">{props.movieGenre}</p>
      <img src={props.imgPath} alt="Movie Image" className=" w-[8.5rem] h-[4.8rem] object-fill rounded-sm" />
    </div>
  );
}

export default Movie;
