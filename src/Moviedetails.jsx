import { useState , useEffect } from "react";
import {Link, useNavigate, useParams } from "react-router-dom";
import Movieslist from "./Movieslist";
import '../Styles/Moviedetails.css'
import Relavent from "./Relavent";

const Moviedetails = () => {
    let {id}=useParams();
    let navigate = useNavigate();
    let[movie, setmovie]= useState(null);
    let[error, seterror] =useState(null);
    let[pending, setpending]= useState(true);
    
    useEffect(()=>{
        setmovie(null);
        setpending(true);
            setTimeout(() => {
                fetch("http://localhost:4000/movies/"+id)
                .then((res)=>{return res.json()})
                .then((data)=>{
                    console.log(data);
                    setmovie(data);
                    setpending(false);
                })
                .catch((err)=>{
                    seterror("Network Error!");
                    setpending(false);
                })
            }, 3000);
    },[id])

    let deleteMovie =()=>{
        fetch("http://localhost:4000/movies/"+id, {method:"DELETE"})
        .then(()=>{navigate("/")})
    }

    return ( 
        <div className="moviedetails">
            {pending ==true && <div className="loading"></div>}
            {error && <h1>{error}</h1>}
            
            {movie && <div className="movie-details">
                        <h1 id="title">Movie Details</h1>
                        <h2>{movie.moviename}</h2>
                        <img src={movie.poster} alt={movie.moviename} />
                        <iframe width="560" height="315" src={movie.trailer} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        <h3>Cast : {movie.hero}, {movie.heroine}</h3>
                        <h3>Director: {movie.director} </h3><br/>
                        <h4>Genre: {movie.genre}, Released in : {movie.release}, Ratings: {movie.rating}/10</h4><br/>
                        {/* <h4>Languages:{movie.languages.map((l)=>{return(<span>{l}</span>)})}</h4> */}
                        <h4>Languages: {movie.languages.join(", ")}</h4>
                        <h3>Plot: {movie.synopsis}</h3>
                        <br />
                        <button onClick={deleteMovie}>Delete</button>

                        <Link to={`/edit/${id}`}><button>Update</button></Link>
                    </div>}

            {movie && <Relavent genre={movie.genre}/>}

        </div>
     );
}
 
export default Moviedetails;