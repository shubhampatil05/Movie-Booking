import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Data } from "./Data";

const Movies = () => {
  const navigate = useNavigate();

  const handleMovies = (title) => {
    navigate("/movie/" + title);
  };

  return (
    <div className="city-pune mt-3">
      <div className="cards">
        {Data.map((item, index) => {
          return (
            <div key={index} className="content">
              <img className="posters" src={item.img} />
              <h3 className="title">{item.title}</h3>
              <button
                style={{ width: "135px", marginBottom: "10px" }}
                className="btn btn-warning"
                onClick={() => handleMovies(item.title)}
              >
                Watch Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
