import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const url = "https://imdb237.p.rapidapi.com/news?category=MOVIE";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "3a9abbf379msh7843d8d127fabdap1a71dajsn4b18f609fbe3",
    "x-rapidapi-host": "imdb237.p.rapidapi.com",
  },
};

const News = () => {
  const [news, setNews] = useState([]);
  const [randomNews, setRandomNews] = useState(null);
  const [newsDate, setNewsDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedNews = sessionStorage.getItem("newsData");
        const cachedRandomNews = sessionStorage.getItem("randomNews");

        // if (cachedNews && cachedRandomNews) {
        //   setNews(JSON.parse(cachedNews));
        //   setRandomNews(JSON.parse(cachedRandomNews));
        //   console.log("hi");
        // } else {
          console.log("bye")
          const response = await fetch(url, options);
          const data = await response.json();
          const fetchedNews = data?.data?.news || [];
          console.log(data);

          if (fetchedNews.length > 0) {
            // sessionStorage.setItem("newsData", JSON.stringify(fetchedNews));
            const randomItem = fetchedNews[Math.floor(Math.random() * fetchedNews.length)];
            setRandomNews(randomItem);
            // sessionStorage.setItem("randomNews", JSON.stringify(randomItem));
          }

          setNews(fetchedNews);
        // }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(()=>{
    const dateStr = randomNews?.node?.date;
    if(dateStr?.length>0){
      console.log("falkdj;lf")
      const date = dateStr.split('T').join(' | ').split('Z').join(' ');
      setNewsDate(date);
    }
  },[randomNews]);

  return (
    <div className="h-full">
      {randomNews ? (
        <div className="h-full">
          <div className="h-[50%] relative">
            <img
              className="h-full w-full object-cover"
              src={randomNews?.node?.image?.url || "Loading..."}
              alt="News"
            />
            <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end items-start gap-1 p-4 w-fit text-white bg-black/50 rounded-lg">
              <h1 className="text-2xl font-medium">{randomNews?.node?.articleTitle?.plainText}</h1>
              <p>{newsDate}</p>
            </div>
          </div>
          <div className="custom-html overflow-y-auto h-[50%] py-4 px-6">
            {parse(randomNews?.node?.text?.plaidHtml || "Loading content...")}
          </div>
        </div>
      ) : (
        <h1 className="font-bold p-6 text-3xl">Loading...</h1>
      )}
    </div>
  );
};

export default News;
