import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Movieslist.css';

const Movieslist = ({movies, title}) => {
    let[favId,setFavid]=useState([]);
    let[altered, setaltered]=useState(0);

    console.log("altered value changed"+altered);

    useEffect(()=>{
        let fav=JSON.parse(localStorage.getItem("fav"))
        setFavid(fav.map((m)=>{return m.id}));
    },[altered]);

    let addmovie = (movie)=>{
        let fav = JSON.parse(localStorage.getItem("fav"));
        fav.push(movie);
        fav=JSON.stringify(fav);
        localStorage.setItem("fav", fav);
        setaltered(altered+1);
    }

    let removemovie=(id)=>{
        let fav=JSON.parse(localStorage.getItem("fav"));
        fav=fav.filter((n)=>{return n.id!=id})
        localStorage.setItem("fav", JSON.stringify(fav));
        setaltered(altered+1);
    }

    return ( 
        <div className='movieContainer'>
            <h1 id='header'>{title}</h1>
            <div className="movies">
                {movies.map((movie)=>{
                    return(
                        <div className="movie">
                            <Link to= {`/moviedetails/${movie.id}`}>
                                <img src={movie.poster} alt="poster" width="200px" height="250px" />
                                <h2>{movie.moviename}</h2>
                                <p>{movie.genre}</p>
                            </Link>  

                            {
                                favId.includes(movie.id)?
                                <button id="remove" onClick={ ()=>{removemovie(movie.id)} }> <i className='bx bxs-heart' ></i></button>:
                                <button id="add" onClick={ ()=>{addmovie(movie)} }><i className='bx bx-heart' ></i> </button>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Movieslist;