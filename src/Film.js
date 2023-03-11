import React from "react";

{/*Define the Film component to build a list of the films the user has searched up*/}
function Film(props) {
  return (
    <div className="film-container">
      <h2>{props.filmName}</h2>
      <h3>{props.filmActors}</h3>
      <p>Plot summary: {props.filmPlot}</p>
    </div>
  );
}

export default Film;
