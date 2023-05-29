import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Addmovie.css';

const Addmovie = () => {
    let navigate=useNavigate();
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

    let handleAddnewmovie = (e)=>{
        e.preventDefault();
        //create new movie object
        let newMovie={
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
            // console.log(options[i].value); 
            if(options[i].checked==true){
                newMovie.languages.push(options[i].value)
            } 
        }
        //send the movie obj to the database
        fetch("http://localhost:4000/movies", 
                {
                    method: "POST",
                    headers : {"Content-Type": "application/json"},
                    body: JSON.stringify(newMovie)
                })
        .then(()=>{
            alert("New movie added to database")
            navigate("/");
        })
    }

    return ( 
        <div className='add-movie'>
            <h1>Add New Movie</h1>

            <form onSubmit={handleAddnewmovie}>
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
                <input id="addmovie" type="submit" value="Add movie"/>
            </form>
        </div>
     );
}
 
export default Addmovie;