import React, { useContext, useEffect, useRef, useState } from "react";
import { fetchAPI } from "./functions";
import { Link, useHistory } from 'react-router-dom';
import {t} from '../index';

const Header = () => {
  const {token} = useContext(t);
  return(
    <header>
      <Link to="/">Netgo's Filmdatenbank</Link>
      <span className="rightBtnsHeader">
        <SearchButton />
        {
          token ? 
          <ProfileButton /> :
          <Link to={"/Login/"}>Einloggen/Registrieren</Link>
        }
      </span>
    </header>
  )
}

const SearchButton = () => {
  const history = useHistory();
  const [toggleSearchbar, setToggleSearchbar] = useState(false);
  const [movieData, setMovieData] = useState();
  const [search, setSearch] = useState("");

  const openSeachbar = () => {
    toggleSearchbar ? 
    setToggleSearchbar(false) :
    setToggleSearchbar(true);

    if(toggleSearchbar && search !== "") {
      history.push(`/Search/${search}`);
    }
  }

  const searchMovies = e => {
    setSearch(e.target.value);
    
    fetchAPI('getSearchValue', {value: e.target.value}).then(data => {
      if(data.success) {
        setMovieData(data.return);
      }else {
        setMovieData(false);
      }
    });
  }

  return(
    <>
    {
      toggleSearchbar ?
      <>
      <input placeholder="z.B. V wie Vendetta..." className="searchInput" value={search} onChange={e => searchMovies(e)} />
      {
         movieData ? <SuggestionsCont movies={movieData} setMovies={setMovieData} /> : null
      }
      </> :
      null
    }
    <button className="headerBtn" onClick={openSeachbar}>
      🔍
    </button>
    </>
  )
}

const SuggestionsCont = props => {
  const closeSuggestions = () => {
    props.setMovies(null);
  }
  return(
    <div className="suggestions">
      {
        props.movies.map(data => <span key={data.movieId}><Link to={`/Movie/${data.name}`} onClick={closeSuggestions}>{data.name}</Link></span>)
      }
    </div>
  )
}

const ProfileButton = () => {
  const [toggleMenu, setToggleMenu] = useState();
  const menuRef = useRef();

  const openMenu = () => {
    toggleMenu ? setToggleMenu(false) : setToggleMenu(true);
  }

  useEffect(() => {
    const closeMenu = e => {
      if(toggleMenu && e.target !== menuRef) {
        setToggleMenu(false);
      }
    }

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [toggleMenu]);

  return(
    <>
    <button className="headerBtn" onClick={openMenu}>
      👤
    </button>
    {
      toggleMenu ? <Menu menuRef={menuRef} /> : null
    }
    </>
  )
}

const Menu = props => {
  return(
    <div ref={props.menuRef} className="menu">
      <Link to="/Profile/">Profil</Link>
      <Link to="/Favorites/">Favoriten</Link>
      <LogOutButton />
    </div>
  )
}

const LogOutButton = () => {
  const {deleteToken} = useContext(t);

  const fetchLogOut = () => {
    fetchAPI('logOut').then(() => {
     deleteToken();
    });
  }
  
  return(
    <button className="logOutBtn" onClick={fetchLogOut}>Ausloggen</button>
  )
}

export default Header;