import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchAPI } from '../components/functions';

const Profile = () => {
  const {userId} = useParams();
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    if(!userId) {
      fetchAPI('getProfile').then(data => {
        setProfileData(data.return);
      });
    }else {
      fetchAPI('getProfile', {userId: userId}).then(data => {
        setProfileData(data.return);
      });
    }
  }, [userId]);

  if(profileData) {
    return(
      <main>
        <div className="profileWrapper">
          <h2 className="title"><span>{profileData.name}</span> <span>{profileData.surname}</span></h2>
          <div className="headline">Über {profileData.name}:</div>
          <div className="flexedMetaCont">
            <label>
              <span>Email-Adresse:</span>
              <span>{profileData.email}</span>
            </label>
            <label>
              <span>Dabei seit:</span>
              <span>{profileData.created}</span>
            </label>
          </div>
          {
            userId ? 
              <Link to={`/Favorites/${userId}`}>&#x3e; Zur Favoritenliste von {profileData.name}</Link> :
              <Link to={`/Favorites/`}>&#x3e; Zu meinen Favoriten</Link>
          }
        </div>
      </main>
    )
  }else {
    return(
      <main>
        <h2>Lade...</h2>
      </main>
    )
  }
}

export default Profile;