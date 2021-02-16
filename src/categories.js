import React, { useEffect, useState } from 'react';
import { fetchAPI } from './components/functions';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    fetchAPI('getAllCategories').then(data => {
      if(data.success) {
        setCategories(data.return);
      }else {
        setCategories(false);
      }
    });
  }, []);

  return(
    <main>
      <h2>Kategorien</h2>
      <div className="fieldsFlex">
        {
          categories ? categories.map(values => <Link className="listingField" key={values.categoryId} to={`/Categories/${values.category}`}><span className="fieldTitle">{values.category}</span></Link>) :
          <>
          <h2>Leider gibt es noch keine Kategorien!</h2>
          <span className="centered"><Link className="btnAppearence" to="/Add/">Ersten Film hinzufügen</Link></span>
          </>
        }
      </div>
    </main>
  )
}

export default Categories;