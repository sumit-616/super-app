/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const url = 'https://imdb-com.p.rapidapi.com/news/get-by-category?category=TOP';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'd4a639ab78msh9d966cffff2d94cp133f3fjsn5b0deaab3330',
    'x-rapidapi-host': 'imdb-com.p.rapidapi.com'
  }
};

const News = ({ handleClick }) => {
  const [news, setNews] = useState([]);
  const [randomNews, setRandomNews] = useState(null);
  const [newsDate, setNewsDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedNews = sessionStorage.getItem("newsData");
        const cachedRandomNews = sessionStorage.getItem("randomNews");
        const cachedDate = sessionStorage.getItem("newsDate");

        if (cachedNews && cachedRandomNews && cachedDate) {
          setNews(JSON.parse(cachedNews));
          setRandomNews(JSON.parse(cachedRandomNews));
          setNewsDate(cachedDate);
          console.log("Loaded from sessionStorage");
          return;
        }

        console.log("Fetching from API...");
        const response = await fetch(url, options);
        const data = await response.json();
        const fetchedNews = data?.data?.news?.edges || [];

        if (fetchedNews.length > 0) {
          sessionStorage.setItem("newsData", JSON.stringify(fetchedNews));

          const randomItem =
            fetchedNews[Math.floor(Math.random() * fetchedNews.length)];
          setRandomNews(randomItem);
          sessionStorage.setItem("randomNews", JSON.stringify(randomItem));

          const dateStr = randomItem?.node?.date;
          if (dateStr) {
            const formattedDate = dateStr
              .split("T")
              .join(" | ")
              .split("Z")
              .join(" ");
            setNewsDate(formattedDate);
            sessionStorage.setItem("newsDate", formattedDate);
          }
        }

        setNews(fetchedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-full bg-black flex flex-col gap-1">
      <div className="h-[95%] rounded-2xl overflow-hidden">
        {randomNews ? (
          <div className="h-full">
            <div className="h-[50%] relative">
              <img
                className="h-full w-full object-cover"
                src={randomNews?.node?.image?.url || "Loading..."}
                alt="News"
              />
              <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end items-start gap-1 p-4 w-fit text-gray-200 bg-black/50 rounded-lg">
                <h1 className="text-xl font-medium leading-tight">
                  {randomNews?.node?.articleTitle?.plainText}
                </h1>
                <p>{newsDate}</p>
              </div>
            </div>
            <div className="flex flex-col custom-html overflow-y-auto h-[50%] py-4 px-6 bg-white inline-block">
              {randomNews?.node?.text?.plainText || "Loading content..."}
            </div>
          </div>
        ) : (
          <h1 className="font-bold p-6 text-3xl text-gray-300">Loading...</h1>
        )}
      </div>
      <div className="flex justify-end mx-2">
        <button
          onClick={() => handleClick()}
          className="bg-[#148A08] w-32 h-8 rounded-2xl text-white font-semibold tracking-wide cursor-pointer"
        >
          Browse
        </button>
      </div>
    </div>
  );
};

export default News;

import PropTypes from 'prop-types';

News.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
