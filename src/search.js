import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPI } from './components/functions';
import { Link } from 'react-router-dom';
import { ErrMsg } from './components/components';

const SearchResults = () => {
  const {searchValue} = useParams();
  const [movieData, setMovieData] = useState();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    fetchAPI('getSearchValue', {value: searchValue}).then(data => {
      if(data.success) {
        setMovieData(data.return);
      }else {
        setErrMsg(data.return);
      }
    });
  }, [searchValue]);

  if(movieData) {
    return(
      <main className="searchResults">
        <h2>Suchergebnisse</h2>
          {
            movieData.map(data => <span key={data.movieId}><Link to={`/Movie/${data.name}`}>{data.name}</Link></span>)
          }
      </main>
    )
  }else {
    return(
      <main>
        <h2><ErrMsg message={errMsg} /></h2>
        <span className="centered"><Link className="btnAppearence" to="/Add/">Diesen Film hinzufügen</Link></span>
      </main>
    )
  }
}

export default SearchResults;