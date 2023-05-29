import { useEffect, useState } from "react";
import Movieslist from "./Movieslist"; 

const Relavent = ({genre}) => {
let[movies, setmovies] = useState(null);

useEffect(()=>{
    fetch("http://localhost:4000/movies")
        .then((res)=>{return res.json()})
        .then((data)=>{setmovies(data)})
},[])

    return (  
        <div className="relavent">
            <h1>{genre}</h1>
            {movies && 
            <Movieslist movies={movies.filter((m)=>{return m.genre.includes(genre)})} title="Relavent Movies"/>}
        </div>
    );
}
 
export default Relavent;