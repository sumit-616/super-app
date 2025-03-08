import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import userDp from '/card_img/userImg_dp.png';

const API_KEY = "0523c2fb9f6531df1b8c89d66c4020e1";
const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const genreMapping = {
  Action: 28,
  Drama: 18,
  Romance: 10749,
  Thriller: 53,
  Western: 37,
  Horror: 27,
  Fantasy: 14,
  Music: 10402,
  Fiction: 878,
};


const Movies = () => {
  const [movieByGenre, setMovieByGenre] = useState({});
  const location = useLocation();
  const selectedGenres = location.state?.selectedGenres;
  const selectedGenreMap = new Map();

  useEffect(() => {
    if (selectedGenres.length > 0) {
      setselectedGenreMap();
    }
  }, [selectedGenres]);

  function setselectedGenreMap() {
    Object.entries(genreMapping).forEach(([genre, id]) => {
      selectedGenreMap.set(genre, id);
    })
  }


  useEffect(() => {
    const fetchMovieByGenre = async () => {
      const moviesData = {};
      const uniqueMovies = new Set();
      for (const genre of selectedGenres) {
        try {
          const res = await fetch(`${BASE_URL}?api_key=${API_KEY}&with_genres=${selectedGenreMap.get(genre)}`);
          console.log(selectedGenreMap.get(genre));
          const json = await res.json();
          const filteredMovies = json.results.filter(movie => {
            if (!uniqueMovies.has(movie.id)) {
              uniqueMovies.add(movie.id);
              return true;
            }
            else {
              return false;
            }
          });
          moviesData[genre] = filteredMovies.slice(0, 8);
        }
        catch (error) {
          console.error(`Error while fetching ${genre} movies:`, error);
        }
      }
      setMovieByGenre(moviesData);
    }
    console.log(selectedGenres);
    fetchMovieByGenre();
  }, []);

  return (
    <div className='flex flex-col md:gap-3 h-screen w-full bg-black text-white overflow-y-scroll pb-8'>
      <div className='flex justify-between pt-8 px-10'>
        <h1 style={{ fontFamily: 'Single Day' }} className='md:text-4xl text-6xl text-[#72DB73]'>Super App</h1>
        <img className='w-12 h-12 rounded-[40px]' src={userDp} alt="" />
      </div>
      <div className='flex md:px-20 px-10'>
        <h1 style={{ fontFamily: 'Roboto' }} className='text-2xl font-bold '>Entertainment according to your choice</h1>
      </div>
      <div className='flex flex-col md:px-20 gap-6'>
        {Object.keys(movieByGenre).map((genre, index) => {
          return (
            <div key={index} className='flex flex-col gap-4'>
              <div style={{ fontFamily: 'Roboto' }} className='text-2xl text-[#878787] font-medium'>{genre}</div>
              <div className='flex flex-wrap gap-4 gap-y-10'>
                {movieByGenre[genre].map((movie, id) => {
                  return (
                    <div key={id} className='flex flex-col w-48 gap-4 transition-transform hover:scale-105 duration-300 ease-in-out cursor-pointer'>
                      <img className='w-full h-72 rounded-2xl object-contain' src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt="" />
                      <h2 style={{ fontFamily: 'Roboto' }} className='text-center font-medium mx-2'>{movie.title}</h2>
                      {/* {console.log(movieByGenre[genre])} */}
                    </div>
                  );
                })}
                <br />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Movies;
