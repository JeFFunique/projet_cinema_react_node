import React, { useReducer, useEffect } from "react";
import { useState } from "react";
import Header from "./Header";
import Movie from "./Movie";
import spinner from "../assets/ajax-loader.gif";
import Search from "./Search";
import { initialState, reducer } from "../store/reducer";
import axios from "axios";
import '../App.css'


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [add, setadd] = useState('')
  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search
      });
    });
  }, []);

  
 

  const deleteMovie = (id) => {
    const spot=document.getElementById('spot')       // On peut supprimer les films qu'en spammant le bouton(delete movie) le plus en haut à gauche
    spot.addEventListener('click', () => { 
      const film2=state.movies.filter((film) => 
      film.imdbID !== id,
    )
    dispatch({
      type: "SEARCH_MOVIES_SUCCESS",
      payload: film2
    });
  },
    
    )
    
  }
       
         
       
       
       
     
     
     
    
   
   const addFilmMovie = () => {
    const input = document.getElementById("film")
    input.addEventListener("input", (e) => {
      setadd(e.target.value)
    })
   }
   const addMovie = (names) => {  
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search
      });
    });
    axios(`https://www.omdbapi.com/?s=${names}&apikey=4a3b711b`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
   }
  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
  };

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : ( 
      movies.map((movie, index) => (
        <> <div ><Movie key={`${movie.imdbID}`} movie={movie} /> 
        
        
        <button type ="button" id='spot' onClick={() => deleteMovie(movie.imdbID)}> Delete Movie </button>
        </div>
        </>
      ))
    );

  return (
    <div className="App">
      <div className="m-container">
        <Header text="Bienvenue sur votre application" />

        <Search search={search} />

        <p className="App-intro">Sharing a few of our favourite movies</p>

        <div className="container">{retrievedMovies}

        </div>
      </div>
      <div className="added">
        <input type="text" id="film" defaultValue={add} onChange={() => addFilmMovie()}  />
        <button type="button" onClick={() => addMovie(add) }> Add Movie</button>
      </div>
    </div>
  );
};

export default App;
