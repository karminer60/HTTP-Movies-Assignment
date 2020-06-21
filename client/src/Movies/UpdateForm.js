import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Movie from "./Movie";

const initialItem = {
  title: "",
  director: "",
  metascore: 0,
  stars: [],
  
};

const UpdateForm = props => {
  const { push } = useHistory();
  const { id } = useParams();
  const [item, setItem] = useState(initialItem);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        // res.data
        setItem(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then(res => {
        // res.data
        props.setItems(res.data);
        // props.setRefresh(true);
        push(`/movie-list/${id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.imageUrl}
        />
        <div className="baseline" />

        <input
          type="array"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={item.stars}
        />
        <div className="baseline" />

       

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;

