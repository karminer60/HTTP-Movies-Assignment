import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Route, NavLink, useHistory } from "react-router-dom";




  


function Movie({ addToSavedList },props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/movies/${movie}`)
      .then(res => {
        // res.data
        props.setItems(res.data);
        push("/movie-list");
      })
      .catch(err => console.log(err));
  };

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button
        className="md-button"
        onClick={() => push(`/update-movie/:id${movie.id}`)}
      >
        Edit
      </button>
      <button className="md-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
