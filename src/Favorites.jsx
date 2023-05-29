import { useEffect } from "react";
import { useState } from "react";
import Movieslist from "./Movieslist";
import '../Styles/Favorites.css'
import { Link } from "react-router-dom";

const Favorites = () => {
    let[favoriteMovies, setFavorites]= useState(null);

    useEffect(()=>{
        setFavorites(JSON.parse(localStorage.getItem("fav")))
    },[])
    return ( 
        <div>
            <h1>Favorite Movies</h1>
                <Link to="/">
                {
                     favoriteMovies &&
                     <Movieslist movies={favoriteMovies} title="Favorite Movies"/>
                }
                </Link>
               
        </div>
     );
}
 
export default Favorites;