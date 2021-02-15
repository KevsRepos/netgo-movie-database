import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAPI } from './components/functions';
import Overlay from './components/movieInputs';
import {ErrMsg} from './components/components';

const AddMovie = () => {
  const history = useHistory();
  const [errMsg, setErrMsg] = useState("");
  const [inputData, setInputData] = useState({
    name: "",
    releaseDate: "",
    movieLength: "",
    category: "",
    description: "",
    metaData: false
  });

  const saveMovie = e => {
    e.preventDefault();

    fetchAPI('addMovie', {
      name: inputData.name,
      releaseDate: inputData.releaseDate,
      movieLength: inputData.movieLength,
      category: inputData.category,
      description: inputData.description
    }).then(data => {
      if(data.success) {
        history.push(`/Movie/${inputData.name}`);
      }else {
        setErrMsg(data.return);
      }
    });
  }

  return(
    <main>
      <h2>Film hinzufügen</h2>
      <Overlay values={inputData} setValues={setInputData} onSave={saveMovie} />
      <ErrMsg message={errMsg} />
    </main>
  )
}

export default AddMovie;