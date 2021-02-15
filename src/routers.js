import React, { useContext }  from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import {t} from './index';
import AddMovie from './add';
import Categories from './categories';
import Category from './category';
import Landing from './landing';
import LoggedOut from './login';
import MovieCont from './movie';
import Favorites from './profile/favorites';
import Profile from './profile/profile';
import SearchResults from './search';

export function AllRouters () {
  const {token} = useContext(t);

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      {
        !token && <Route exact path="/Login/" component={LoggedOut} />
      }
      <Route exact path="/Search/:searchValue/" component={SearchResults} />
      <Route exact path="/Movie/:name/" component={MovieCont} />
      <Route exact path={["/Profile/", "/Profile/:userId/"]} component={Profile} />
      <Route path={["/Favorites/", "/Favorites/:userId/"]} component={Favorites} />
      <Route exact path="/Categories/" component={Categories} />
      <Route exact path="/Categories/:categoryName/" component={Category} />
      <Route path="/Add/" component={ token ? AddMovie : LoggedOut } />
    </Switch>
  )
}
