import './App.css';
import {useState } from "react";
import Axios from "axios"
import Film from './Film';

function App() {
  // Degine the use states we need to take in input and display data
  const [filmName, setFilmName] = useState("");
  const [filmList, setFilmList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchFilm = () => {
      // Use Axios to attempt to grab the data about the movie from the Open Movie Database API
      Axios.get(`http://www.omdbapi.com/?apikey=5de43a61&t=${filmName}&plot=full`)
      .then((res) => {
        if (res.data.Response === 'False') {
          // If the user entered an incorrect title, the get will fail, so set the error state accordingly
          setErrorMessage(res.data.Error);
        } else {
          // If the get succeeded, create a new film component and update the list of films
          const newFilm = {
            filmName: res.data.Title,
            filmPlot: res.data.Plot,
            filmActors: res.data.Actors
          };
          setFilmList([...filmList, newFilm]);
          // Make sure to set the error message to null so that the check later doesn't trip
          setErrorMessage("");
        }
      });

  };

  return (
    <div className="App">
      <div className= 'banner'>
        {/*Build the actual Website using JSX */}
          <h1 className = "cursive">CinemaScraper</h1>
        <p><small>Punch in a movie title and learn its cast and plot!</small></p>
        {/* Make the Input box the user enters titles into; update the film title state as needed */}
        <input 
          placeholder="Film Title Here"
          onChange={(event) => {
            setFilmName(event.target.value);
          }}
        /> 
        {/*When the button is clicked, attempt to fetch data from the API using the title state */}
        <button onClick={fetchFilm}> Find Film </button>
      </div> 
      {/*Use a ternary check to verify that the API fetch actually did in fact work, throw error message if not*/}
      {errorMessage ? <p>{errorMessage}</p> : null}
      {/*Pass the data fetched from the API to Film.js to build a new film component, then display the entire film list sequentially*/}
      {filmList.map((film, index) => (
        <Film key = {index} filmName = {film.filmName} filmActors = {film.filmActors} filmPlot= {film.filmPlot}/>
      ))}
    </div>
  );
}

export default App;
