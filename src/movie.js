import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchAPI } from './components/functions';
import {ConfirmCont} from './components/components';
import Overlay from './components/movieInputs';

const MovieCont = () => {
  const [editing, setEditing] = useState(false);
  const {name} = useParams();
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    fetchAPI('getMovie', {name: name}).then(data => {
      const movie = data.return;

      setMovieData({
        movieId: movie.movieId,
        name: movie.name,
        releaseDate: movie.releaseDate,
        movieLength: movie.movieLength,
        category: movie.category,
        description: movie.description,
        metaData: true
      });
    });
  }, [name]);

  const updateMovie = e => {
    e.preventDefault();

    fetchAPI('editMovie', {
      movieId: movieData.movieId,
      toUpdate: {
        name: movieData.name,
        releaseDate: movieData.releaseDate,
        movieLength: movieData.movieLength,
        category: movieData.category,
        description: movieData.description
      }
    }).then(data => {
      setEditing(false);
    });
  }

  if(editing === false) {
    return(
      <main>
        <div className="movieCont">
          <h2 className="title">{movieData.name}</h2>
          <div className="headline">Filmdaten:</div>
            <div className="flexedMetaCont">
              <label>
                <span>Release:</span>
                <span>{movieData.releaseDate}</span>
              </label>
              <label>
                <span>Genre:</span>
                <span>{movieData.category}</span>
              </label>
              <label>
                <span>Länge:</span>
                <span>{movieData.movieLength} Minuten</span>
              </label>
            </div>
            <div className="headline">Beschreibung:</div>
            <div className="descriptionCont">
              {movieData.description}
            </div>
          {
            window.localStorage.getItem('authToken') ?
            <ActionBtns movieId={movieData.movieId} setEditing={setEditing} /> : 
            null
          }
        </div>
      </main>
    )
  }else {
    return(
      <main>
        <Overlay values={movieData} setValues={setMovieData} onSave={updateMovie} />
      </main>
    )
  }

}

export default MovieCont;

const ActionBtns = props => {
  const history = useHistory();
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteMovie = () => {
    fetchAPI('deleteMovie', {movieId: props.movieId}).then(() => {
      history.push("/");
    });
  }

  const openEdit = () => {
    props.setEditing(true);
  }

  return(
    <div className="editBtns">
      <FavoriteBtn movieId={props.movieId} />
      <button onClick={openEdit}>Bearbeiten</button>
      <button onClick={() => setShowConfirm(true)}>Löschen</button>
      <ConfirmCont msg={'Möchtest Du diesen Eintrag wirklich löschen?'} doSubmit={deleteMovie} showConfirm={showConfirm} setShowConfirm={setShowConfirm} />
    </div>
  )
}

const FavoriteBtn = props => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if(props.movieId > 0) {
      fetchAPI('getFavoriteFromMovie', {movieId: props.movieId}).then(data => {
        if(data.success) {
          setIsFavorite(true);
        }else {
          setIsFavorite(false);
        }
      });
    }
  }, [props.movieId]);

  const addToFavorites = () => {
    fetchAPI('addFavorite', {movieId: props.movieId}).then(data => {
      if(data.success) {
        setIsFavorite(true);
      }
    });
  }

  const deleteFromFavorites = () => {
    fetchAPI('removeFavorite', {movieId: props.movieId}).then(data => {
      if(data.success) {
        setIsFavorite(false);
      }
    });
  }

  return(
    <>
    {
      isFavorite ?
        <button onClick={deleteFromFavorites}>Favorisiert</button> :
        <button onClick={addToFavorites}>Favorisieren</button>
    }
    </>
  )
}