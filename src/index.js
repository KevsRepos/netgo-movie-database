import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {fetchAPI} from "./components/functions";
import { BrowserRouter } from 'react-router-dom';
import { AllRouters } from './routers';
import Footer from './components/footer';
import Header from './components/header';
import './css/index.css';

export const t = React.createContext(null);

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('authToken'));

  const toggleToken = t => {
    window.localStorage.setItem('authToken', t)
    setToken(t);
  }

  const deleteToken = () => {
    window.localStorage.removeItem('authToken');
    setToken(false);
  }

  useEffect(() => {
    if(token) {
      fetchAPI('refreshToken',  {authToken: token}).then(data => {
        data.success ? 
          toggleToken(data.return) :
          deleteToken();
      });
    }
  }, []);

  return (
    <div id="App">
    <t.Provider value={{token, toggleToken, deleteToken}} >
      <Header />
      <AllRouters />
    </t.Provider>
    <Footer />
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
