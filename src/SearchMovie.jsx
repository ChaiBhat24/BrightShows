import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Movieslist from "./Movieslist";
import '../Styles/SearchMovie.css';

const SearchMovie = () => {

    let{searchword}= useParams();
    let[movies, setMovies]=  useState(null);
    let[error, setError]= useState(null);
    let[pending, setPending]= useState(true);

    useEffect(()=>{
        setMovies(null);
        setPending(true);
        setTimeout(() => {
            fetch("http://localhost:4000/movies")
            .then((res)=>{return res.json()})
            .then((data)=>{
                let d= data.filter((m)=>{
                    return (m.moviename.toLowerCase().startsWith(searchword.toLowerCase()))||
                           (m.genre.toLowerCase()=== searchword.toLowerCase())||
                           (m.languages.includes(searchword))
                })
                setMovies(d);
                setPending(false);
            })

            .catch((err)=>{
                setError("404 Not Found")
                setPending(false);
            })
        }, 3000);
    },[searchword])

    return ( 
        <div className="search-cont">
            <h1>Search</h1>
            {pending==true && <div className="loading"></div>}

            {movies && <Movieslist movies={movies} title="search result"/>}
        </div>
     );
}
 
export default SearchMovie;