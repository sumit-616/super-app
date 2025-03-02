import React from 'react';
import { useState } from 'react';

const Movie = (props) => {

  const isSelected = props.selectedGenres.includes(props.movieGenre);

  return (
    <div
      onClick={() => props.handleClickForGenre(props.movieGenre)}
      style={{ backgroundColor: props.bgColor }}
      className={`box-border w-36 sm:w-48 h-24 sm:h-[7.7rem] flex flex-col items-center justify-center p-2 rounded-lg text-white transition-transform duration-100 hover:scale-105 cursor-pointer ${isSelected?'border-[3px] border-[rgb(114,219,115)]':''}`}
    >
      <p className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{props.movieGenre}</p>
      <img
        src={props.imgPath}
        alt="Movie Image"
        className="w-28 sm:w-[8.5rem] h-16 sm:h-[4.8rem] object-cover rounded-sm"
      />
    </div>
  );
};

export default Movie;