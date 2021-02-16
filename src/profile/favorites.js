import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchAPI } from '../components/functions';

const Favorites = () => {
  const {userId} = useParams();
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    if(!userId) {
      fetchAPI('getFavorites').then(data => {
        if(data.success) {
          setFavorites(data.return);
        }else {
          setFavorites(false);
        }
      });
    }else {
      fetchAPI('getFavorites', {userId: userId}).then(data => {
        if(data.success) {
          setFavorites(data.return);
        }else {
          setFavorites(false);
        }
      });
    }
  }, [userId]);

  if(favorites) {
    return(
      <main>
        <div className="favoritesWrapper">
          <h2 className="title">Favoriten</h2>
          <ol>
            {
              favorites.map(favorites => 
                <li key={favorites.movieId}>
                  <Link className="listLink" to={`/Movie/${favorites.name}/`}>{favorites.name}</Link>
                </li>
              )
            }
          </ol>
        </div>
      </main>
    )
  }else {
    return(
      <main>
        <div className="centered">
          <h2>Du hast noch keine Favoriten!</h2>
          <p>Du möchtest welche?</p>
          <Link className="btnAppearence" to="/Categories/">In Kategorien stöbern</Link>
        </div>
      </main>
    )
  }
}

export default Favorites;