import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'

const Navbar = () => {

    let[searchword, setSearchword] = useState("");
    let[movienames, setMovies]= useState([]);
    let[menu, setMenu] = useState(false);

    useEffect(()=>{
        fetch("http://localhost:4000/movies")
        .then((res)=>{return res.json()})
        .then((data)=>{
          let names = data.map((m)=>{return{moviename: m.moviename, id:m.id}})
          let filteredNames = names.filter((movie)=>{return movie.moviename.toLowerCase().includes(searchword.toLowerCase())})
          setMovies(filteredNames);
        })
    },[searchword])

    return ( 
        <nav>
            <div id="logo">
                <Link to="/"><h1>Bright Shows</h1></Link>
            </div>
            
            <div id="search-bar">
                <input type="search" placeholder="search movies" value={searchword}
                 onChange={(e)=>{setSearchword(e.target.value);}}/>

                <Link to={`/search/${searchword}`}>
                    <button id="searchbtn"><i class='bx bx-search-alt'></i></button>
                </Link>
            </div>

            <div>
                <Link to="/fav">
                    <img id="favs" src="./media/heart_white.png" alt="" />
                </Link>
            </div>

            <div id="add-movie">
                <Link to="/add">Add Movie</Link>
            </div>

            <div id="hamburger">
                <span onClick={()=>{setMenu(!menu)}}>
                    {menu==false ?  <i class='bx bx-menu'></i> :
                                    <i class='bx bx-menu-alt-right'></i>}
                </span>

                {
                    menu && <div id='menu'>
                                <div id="menu-fav-movie">
                                    <Link to="/fav">Favorite Movies</Link>
                                </div>

                                <div id="menu-add-movie">
                                    <Link to="/add">Add Movie</Link>
                                </div>
                            </div>
                }
            </div>

            {
                searchword!="" &&   <div className='suggestion-box'>
                                        <ul>
                                            {movienames.map((m)=>{
                                                return(
                                                    <Link to={`/moviedetails/${m.id}`}>
                                                        <li onClick={()=>{setSearchword("")}}>{m.moviename}</li>
                                                    </Link>
                                                )
                                            })}
                                        </ul>
                                    </div>
            }
        </nav>
     );
}
 
export default Navbar;