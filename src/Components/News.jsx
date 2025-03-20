import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const url = 'https://imdb237.p.rapidapi.com/news?category=MOVIE';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '82a9bf644fmshac7cee18755d358p1926a4jsnedf31f1e0e3d',
		'x-rapidapi-host': 'imdb237.p.rapidapi.com'
	}
};

const News = (props) => {
  const [news, setNews] = useState([]);
  const [randomNews, setRandomNews] = useState(null);
  const [newsDate, setNewsDate] = useState("");

  const handleContent = (html) =>
    parse(html, {
      replace: (domNode) => {
        if (domNode.name === "a" && domNode.attribs.href) {
          // Convert relative URLs to absolute URLs
          const imdbBaseURL = "https://www.imdb.com";
          const href = domNode.attribs.href.startsWith("/")
            ? imdbBaseURL + domNode.attribs.href
            : domNode.attribs.href;
  
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {domNode.children[0].data}
            </a>
          );
        }
      },
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const cachedNews = sessionStorage.getItem("newsData");
        // const cachedRandomNews = sessionStorage.getItem("randomNews");

        // if (cachedNews && cachedRandomNews) {
        //   setNews(JSON.parse(cachedNews));
        //   setRandomNews(JSON.parse(cachedRandomNews));
        //   console.log("hi");
        // } else {
        // console.log("bye")
        const response = await fetch(url, options);
        const data = await response.json();
        const fetchedNews = data?.data?.news || [];
        console.log(data);

        if (fetchedNews.length > 0) {
          // sessionStorage.setItem("newsData", JSON.stringify(fetchedNews));
          const randomItem =
            fetchedNews[Math.floor(Math.random() * fetchedNews.length)];
          setRandomNews(randomItem);
          // sessionStorage.setItem("randomNews", JSON.stringify(randomItem));
          const dateStr = randomItem?.node?.date;
          if (dateStr) {
            const formattedDate = dateStr
              .split("T")
              .join(" | ")
              .split("Z")
              .join(" ");
            setNewsDate(formattedDate);
          }
        }

        setNews(fetchedNews);
        // }
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
              {(handleContent(randomNews?.node?.text?.plaidHtml) || "Loading content...")}
            </div>
          </div>
        ) : (
          <h1 className="font-bold p-6 text-3xl text-gray-300">Loading...</h1>
        )}
      </div>
      <div className="flex justify-end mx-2">
        <button
          onClick={props.handleClick}
          className="bg-[#148A08] w-32 h-8 rounded-2xl text-white font-semibold tracking-wide cursor-pointer"
        >
          Browse
        </button>
      </div>
    </div>
  );
};

export default News;
