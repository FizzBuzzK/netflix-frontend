import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

// ------------------------------------------------------------------
export default function DetailPage() 
{
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  // ___________________________________
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`);
      setMovie(request.data);
    }
    fetchData();
  },
  
  [movieId]
  );

  // ___________________________________
  if (!movie) return <div>...loading</div>;

  // ___________________________________
  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  );
}
