import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPI } from './components/functions';
import { Link } from 'react-router-dom';

const Category = props => {
  const [category, setCategory] = useState();
  const {categoryName} = useParams();

  useEffect(() => {
    fetchAPI('getCategory', {category: categoryName}).then(data => {
      setCategory(data.return);
    })
  }, [categoryName]);
  
  if(typeof category === "undefined") {
    return(
      <main>
        Lade...
      </main>
    )
  }else if(typeof category === "string") {
    return(
      <main>
        <h2>{category}</h2>
        <span className="centered"><Link className="btnAppearence" to="/Add/">Erstem Film hinzufügen</Link></span>
      </main>
    )
  }else {
    return(
      <main>
        <h2>{categoryName}</h2>
        <div className="fieldsFlex">
          {
            category.map(values => 
              <Link className="listingField" key={values.movieId} to={`/Movie/${values.name}`} >
                <span className="fieldTitle">{values.name}</span>
                <span className="fieldMeta">Veröffentlicht: {values.releaseDate}</span>
              </Link>
            )
          }
        </div>
      </main>
    )
  }
}

export default Category;