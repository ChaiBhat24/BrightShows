import { useEffect,useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Editmovie = () => {
    let {id} = useParams();

    let navigate = useNavigate();
    let moviename= useRef();
    let hero=useRef();
    let heroine=useRef();
    let director=useRef();
    let genre=useRef();
    let poster=useRef();
    let trailer=useRef();
    let release=useRef();
    let rating=useRef();
    let synopsis=useRef();

    useEffect(()=>{
        fetch("http://localhost:4000/movies/"+id)
        .then((res)=>{return res.json()})
        .then((data)=>{
            moviename.current.value= data.moviename;
            hero.current.value = data.hero;
            heroine.current.value = data.heroine;
            director.current.value =data.director;
            genre.current.value = data.genre;
            poster.current.value = data.poster;
            trailer.current.value = data.trailer;
            release.current.value =data.release;
            rating.current.value = data.rating;
            synopsis.current.value = data.synopsis;
        })
    },[])

    let handleEditmovie = (e)=>{
        e.preventDefault()

        let updatedMovie={
            moviename: moviename.current.value,
            trailer:trailer.current.value,
            hero: hero.current.value,
            heroine: heroine.current.value,
            director: director.current.value,
            genre: genre.current.value,
            poster:poster.current.value,
            release:release.current.value,
            rating:rating.current.value,
            languages:[],
            synopsis:synopsis.current.value
        }

        let options = document.getElementsByName("lang");
        for (let i = 0; i < options.length; i++) {
            if(options[i].checked == true){
                updatedMovie.languages.push(options[i].value)
            }
        }

        //update movie object to database
        fetch("http://localhost:4000/movies/"+id ,
                                            {
                                                method: "PUT",
                                                headers: {"Content-Type":"application/json"},
                                                body: JSON.stringify(updatedMovie)
                                            })
        .then(()=>{
                alert("Movie details updated")
                navigate("/moviedetails/"+id)
        })                                    
    
    }

    return ( 
        <div className="add-movie">
            <h1>Edit Movie Details</h1>

            <form onSubmit={ handleEditmovie }>
            <input type="text" placeholder="moviename" ref={moviename}/>
                <input type="text" placeholder="hero" ref={hero}/>
                <input type="text" placeholder="heroine" ref={heroine}/>
                <input type="text" placeholder="director" ref={director}/>
                <input type="text" placeholder="genre" ref={genre}/>
                <input type="url" placeholder="poster" ref={poster}/>
                <input type="url" placeholder="trailer" ref={trailer}/>
                <input type="number" min="1950" max="2024" placeholder="release" ref={release}/>
                <input type="number" min="1" max="10" step="0.1" placeholder="rating" ref={rating}/>
                <fieldset>
                    <legend>Select Languages</legend>
                    <input type="checkbox" name="lang" /><label>Kannada</label>
                    <input type="checkbox" name="lang" /><label>English</label>
                    <input type="checkbox" name="lang" /><label>Hindi</label>
                    <input type="checkbox" name="lang" /><label>Marathi</label>
                    <input type="checkbox" name="lang" /><label>Tamil</label>
                    <input type="checkbox" name="lang" /><label>Telugu</label>
                    <input type="checkbox" name="lang" /><label>Malayalam</label>
                </fieldset>

                <div>Plot</div>
                <textarea cols="70" rows="6" ref={synopsis}></textarea>
                <br/>
                <input type="submit" value="Edit movie"/>
            </form>
        </div>
     );
}
 
export default Editmovie;