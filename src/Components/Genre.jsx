import React, { useState } from "react";
import GenrePreview from "./GenrePreview";
import vectorImg from "../images/Vector.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Genre = () => {
  const genreCard = [
    { id: 1, title: "Action", image: "/card_img/action.png", bgColor: "#FF5209" },
    { id: 2, title: "Drama", image: "/card_img/drama.png", bgColor: "#D7A4FF" },
    { id: 3, title: "Romance", image: "/card_img/romance.png", bgColor: "#11B800" },
    { id: 4, title: "Thriller", image: "/card_img/thriller.png", bgColor: "#84C2FF" },
    { id: 5, title: "Western", image: "/card_img/western.png", bgColor: "#902500" },
    { id: 6, title: "Horror", image: "/card_img/horror.png", bgColor: "#7358FF" },
    { id: 7, title: "Fantasy", image: "/card_img/fantasy.png", bgColor: "#FF4ADE" },
    { id: 8, title: "Music", image: "/card_img/music.png", bgColor: "#E61E32" },
    { id: 9, title: "Fiction", image: "/card_img/fiction.png", bgColor: "#6CD061" },
  ];

  const location = useLocation();
  const userData = location.state?.userData;

  const [arrayOfMovieGenre, setArrayOfMovieGenre] = useState([]);
  const [nextPageCondition, setNextPageCondition] = useState(true);

  const navigate = useNavigate();

  function handleClickForNextPage(source) {
    if (source === "click" && arrayOfMovieGenre.length > 2) {
      navigate("/widget", { state: { selectedGenres: arrayOfMovieGenre, userData } });
    } else if (arrayOfMovieGenre.length > 1) {
      setNextPageCondition(source !== "click");
    } else if (source === "click") {
      setNextPageCondition(false);
    }
  }

  function handleClickForGenre(movieGenre) {
    const index = arrayOfMovieGenre.indexOf(movieGenre);
    if (index === -1) {
      setArrayOfMovieGenre([...arrayOfMovieGenre, movieGenre]);
    } else {
      setArrayOfMovieGenre(arrayOfMovieGenre.filter((genre) => genre !== movieGenre));
    }
    handleClickForNextPage("");
  }

  return (
    <div className="flex flex-col md:flex-row w-screen sm:min-h-screen h-auto bg-black text-white p-4 md:p-6 sm:overflow-hidden overflow-scroll gap-5">
      {/* Left Section */}
      <div className="flex flex-col md:w-[45%] w-full md:pl-8">
        <div className="flex flex-col gap-4 md:gap-8 pt-4 md:pt-12 items-center md:items-start text-center md:text-left">
          <h1 className="text-[#72DB73] text-3xl md:text-5xl font-bold">Super App</h1>
          <h2 className="text-2xl md:text-4xl font-bold leading-tight">
            Choose your <br /> entertainment <br /> category
          </h2>
        </div>

        {/* Selected Genres */}
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-wrap gap-2 pl-4 sm:pl-0 overflow-x-hidden">
            {arrayOfMovieGenre.map((movieGenre, index) => (
              <div key={index} className="flex items-center bg-[#148A08] w-[8rem] h-9 px-4 rounded-lg text-sm md:text-base">
                <span>{movieGenre}</span>
                <button onClick={() => handleClickForGenre(movieGenre)} className="ml-2 text-[#808080]">
                  X
                </button>
              </div>
            ))}
          </div>

          {!nextPageCondition && (
            <div className="flex gap-2 items-center text-[#FF0000]">
              <img className="w-4 h-4 md:w-5 md:h-5" src={vectorImg} alt="" />
              <p className="text-sm md:text-base">Minimum 3 categories required</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col md:w-[55%] w-full h-full rounded-2xl border-gray-800 sm:border-none pt-1 border-2">
        {/* Scrollable container */}
        <div className="overflow-y-auto h-[calc(100vh-48vh)] md:h-[calc(100vh-100px)]">
          <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 p-4">
            {genreCard.map((genre) => (
              <button key={genre.id} className="cursor-pointer">
                <GenrePreview
                  handleClickForGenre={handleClickForGenre}
                  bgColor={genre.bgColor}
                  movieGenre={genre.title}
                  imgPath={genre.image}
                  selectedGenres={arrayOfMovieGenre}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full bg-black py-4 flex justify-end sm:pr-6 sm:mb-8 pr-11">
          <button
            onClick={() => handleClickForNextPage("click")}
            className="bg-[#148A08] w-32 md:w-40 h-10 rounded-lg transition-all duration-100 hover:bg-[#0E6C06] hover:scale-105"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Genre;
