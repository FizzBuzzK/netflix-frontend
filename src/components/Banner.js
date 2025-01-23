import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import "./Banner.css";
import styled from "styled-components";

// ------------------------------------------------------------------
export default function Banner() 
{
  const [movie, setMovie] = useState([]);   // >>>>> 1
  const [isClicked, setIsClicked] = useState(false);  // >>>>> 2

  //__________________________________________________________
  // Get a new movie info via fetchData() whenever page refreshes.
  useEffect(() => {
    fetchData();
  }, []);

  //__________________________________
  // Get image info to use as Banner.
  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(여러 영화)
    const request = await axios.get(requests.fetchNowPlaying);

    // 여러 영화 중 영화 하나의 ID를 가져오기
    // Get a random movieId.
    // Math.floor(Math.random() * max)
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

    // Retrieve details of a specific movie.
    // Rename data object that's returned by axios.get() as a result to movieDetail.
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });

    setMovie(movieDetail);  // >>>>> 1
  };

  //__________________________________________________________
  const truncate = (str, n) => 
  {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  //__________________________________________________________
  console.log("movie in Banner -----> ", movie);

  //__________________________________________________________
  // Conditional Rendering
  if (!isClicked) 
  {
    return (
      
      <header // >>>>>
        className="banner"
        style={{
          // backdrop_path: One of the data object's property returned by axios.get()
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`, 
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        {/*__________________________________ */}
        <div className="banner__contents">

          <h1 className="banner__title">
            {movie.title || movie.name || movie.original_name}
          </h1>

          <div className="banner__buttons">
            {/* 
              If "Play" button is clicked,
              make the video play.   
            */}
            <button
              className="banner__button play"
              onClick={() => setIsClicked(true)} // >>>>> 2
            >
              Play
            </button>

            <button className="banner__button info">
              More Information
            </button>
          </div>

          {/* 
            If the length of description is over 100, 
            truncate it with ... at the end. 
          */}
          <h1 className="banner__description">
            {truncate(movie.overview, 100)}
          </h1>
        </div>

        {/*__________________________________ */}
        <div className="banner--fadeBottom" />
      </header>
    );
  }


  //__________________________________________________________
  else 
  {   
    return (
      <Container>
        <HomeContainer>
          {/* 
            IFrame = HTML Inline Frame element.
            효과적으로 다른 HTML 페이지를 현재 페이지에 포함시키는 중첩된 브라우저로
            Iframe 요소를 이용하면 해당 웹 페이지 안에 어떠한 제한 없이 다른 페이지를 불러와서 삽입.
          */}
          <Iframe
            width="640"
            height="360"

            // movie.videos.results[0].key = Id of the first movie out of the fetched movies.
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title="YouTube video player"
            frameborder="0"
            
            allow="autoplay; fullscreen"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
}

// ------------------------------------------------------------------
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

// ------------------------------------------------------------------
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

// ------------------------------------------------------------------
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
