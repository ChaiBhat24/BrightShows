import { useEffect, useState } from 'react';
import '../Styles/Movieslist.css'
import Movieslist from './Movieslist.jsx';

const Home = () => {
    let [movies, setmovies]= useState(null);
    let [error, seterror] =useState(null);
    let[pending, setpending]= useState(true);

    useEffect(()=>{
        if(localStorage.getItem("fav")==null){
            localStorage.setItem("fav", "[]")
        }
        
        setTimeout(() => {
            fetch("http://localhost:4000/movies")
            .then((res)=>{ return res.json() })
            .then((data)=>{
                console.log(data);
                setmovies(data);
                setpending(false);
            })

            .catch((err)=>{
                seterror("Network Error!");
                setpending(false);
            })

        }, 3000);
    },[])

    return ( 
        <div className="home">
            {pending== true && <h1>Loading...</h1>}

            {error && <h1>{error}</h1>}
            {/* {movies && 
            <Movieslist movies={movies.filter((m)=>{return m.genre.includes("action")})} />} */}
            {movies && <Movieslist movies={movies} title="All Movies"/> }

            {movies && <Movieslist movies={movies.filter((m)=>{return m.genre.includes("action")})} title="Action movies"/>}

            {movies && <Movieslist movies={movies} title="Top rated movies"/>}

            {movies && <Movieslist movies={movies.filter((m)=>{return m.genre.includes("drama")})} title="Drama"/>}
        </div>
     );
}
 
export default Home;