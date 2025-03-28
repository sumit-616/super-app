import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import userDp from '/card_img/userImg_dp.png';
import toast from 'react-hot-toast';

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
  const selectedGenres = location.state?.selectedGenres || [];
  const selectedGenreMap = new Map(Object.entries(genreMapping));

  useEffect(() => {
    if (selectedGenres.length > 0) {
      fetchMovieByGenre();
    }
  }, [selectedGenres]);

  // Fetch movies by genre
  const fetchMovieByGenre = async () => {
    const moviesData = {};
    const uniqueMovies = new Set();

    for (const genre of selectedGenres) {
      try {
        const genreId = selectedGenreMap.get(genre);
        const res = await fetch(`${BASE_URL}?api_key=${API_KEY}&with_genres=${genreId}`);
        const json = await res.json();

        // Filter unique movies
        const filteredMovies = json.results.filter(movie => {
          if (!uniqueMovies.has(movie.id)) {
            uniqueMovies.add(movie.id);
            return true;
          }
          return false;
        });

        moviesData[genre] = filteredMovies.slice(0, 15);
      } catch (error) {
        console.error(`Error fetching ${genre} movies:`, error);
      }
    }
    setMovieByGenre(moviesData);
  };

  // Redirect to OTT platform (JustWatch) or IMDb
  const redirectToOTT = async (movieId) => {
    try {
      // Fetch external IDs (IMDb ID)
      const externalRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/external_ids?api_key=${API_KEY}`);
      const externalJson = await externalRes.json();
      const imdbId = externalJson.imdb_id;

      // Fetch watch providers (OTT links) without limiting to a region
      const providerRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`);
      const providerJson = await providerRes.json();

      // Try to get providers from multiple regions
      let providers = providerJson.results?.US?.link ||
        providerJson.results?.GB?.link ||
        providerJson.results?.CA?.link ||
        providerJson.results?.KR?.link ||   // For Korean movies
        providerJson.results?.CN?.link ||   // For Chinese movies
        providerJson.results?.global?.link; // Global link

      if (providers) {
        // Redirect to OTT platform (if available)
        window.open(providers, "_blank");
      } else if (imdbId) {
        // Redirect to IMDb as fallback
        window.open(`https://www.imdb.com/title/${imdbId}`, "_blank");
      } else {
        // Show a message when OTT links are unavailable
        toast.error("OTT links not available for this movie.");
      }
    } catch (error) {
      console.error("Error fetching links:", error);
      toast.error("Error fetching movie links");
    }
  };


  return (
    <div className="flex flex-col md:gap-3 h-screen w-full bg-black text-white overflow-y-scroll pb-8">
      <div className="flex justify-between pt-8 px-10">
        <h1 style={{ fontFamily: 'Single Day' }} className="md:text-4xl text-6xl text-[#72DB73]">Super App</h1>
        <img className="w-12 h-12 rounded-[40px]" src={userDp} alt="User" />
      </div>

      <div className="flex md:px-20 px-10">
        <h1 style={{ fontFamily: 'Roboto' }} className="text-2xl font-bold">Entertainment according to your choice</h1>
      </div>

      <div className="flex flex-col md:px-20 gap-6">
        {Object.keys(movieByGenre).map((genre, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div style={{ fontFamily: 'Roboto' }} className="text-2xl text-[#878787] font-medium">{genre}</div>
            <div className="flex flex-wrap gap-4 gap-y-10">
              {movieByGenre[genre].map((movie) => (
                <div
                  key={movie.id}
                  className="flex flex-col w-48 gap-4 transition-transform hover:scale-105 duration-300 ease-in-out cursor-pointer"
                  onClick={() => redirectToOTT(movie.id)}
                >
                  <img className="w-full h-72 rounded-2xl object-contain" src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                  <h2 style={{ fontFamily: 'Roboto' }} className="text-center font-medium mx-2">{movie.title}</h2>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
