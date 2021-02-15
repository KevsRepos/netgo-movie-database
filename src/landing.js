import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return(
    <>
    <Banner />
    <Sites />
    </>
  )
}

export default Landing;

const Banner = () => {
  return(
    <main className="centered">
      <h1>Netgo's Filmedatenbank</h1>
      <p>
        Diese Website bietet eine einfache Filmdatenbank. 
      </p>
    </main>
  );
}

const Sites = () => {
  return(
    <main>
      <p className="centered">
        Was willst Du tun?
      </p>
      <div className="fieldsFlex landingNav">
        <Link className="listingField" to="/Categories/"><span className="fieldTitle">Kategorien</span></Link>
        <Link className="listingField" to="/Add/"><span className="fieldTitle">Film hinzufügen</span></Link>
        {
          window.localStorage.getItem('authToken') ?
          <Link className="listingField" to="/Profile/"><span className="fieldTitle">Profil</span></Link> :
          <Link className="listingField" to="/Login/"><span className="fieldTitle">Einloggen/Registrieren</span></Link>
        }
      </div>
    </main>
  )
}