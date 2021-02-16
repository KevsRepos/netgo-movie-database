import React, {useContext, useEffect, useRef, useState} from 'react';
import {fetchAPI} from "./components/functions";
import {ErrMsg} from "./components/components";
import {t} from './index';
import { useHistory } from 'react-router-dom';

const LoggedOut = props => {
  const [isOnRegister, setIsOnRegister] = useState(true);
  
  return(
    <main>
      <div className="accountForms">
        {isOnRegister ? <Register setAuthToken={props.setAuthToken} /> : <Login setAuthToken={props.setAuthToken} />}
      </div>
      <button className="switchFormBtn" onClick={() => setIsOnRegister(prevState => !prevState)}>
        {isOnRegister ? "Du hast schon einen Account? Hier einloggen!" : "Oder registriere dir hier einen neuen Account!"}
      </button>
    </main>
  )
}

export default LoggedOut;

const Register = () => {
  const history = useHistory();
  const {toggleToken} = useContext(t);
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const passwordRef = useRef(null);

  const registerUser = e => {
    e.preventDefault();

    if(email.substring(email.length - 9) !== "@netgo.de") {
      setMsg("Nur Mitarbeiter der Netgo GmbH dürfen sich registrieren.");
      return;
    }

    if(!passwordsMatch) {
      setMsg("Passwörter stimmen nicht überein.");
      return;
    }

    fetchAPI('createUserData', {
      email: email,
      name: firstName,
      surname: surname,
      password: passwordRef.current.value
    }).then(data => {
      if(data.success) {
        toggleToken(data.return);
        history.push("/");
      }else {
        setMsg(data.return);
      }
    });
  }


  return(
    <>
    <h2>Registrieren</h2>
    <form onSubmit={e => registerUser(e)}>
      <span className="topInputPlaceholder">Email</span>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" required/>
      <span className="topInputPlaceholder">Vorname</span>
      <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" name="name" required/>
      <span className="topInputPlaceholder">Nachname</span>
      <input value={surname} onChange={e => setSurname(e.target.value)} type="text" name="surname" required/>
      <PasswordInputs passwordRef={passwordRef} onStateChange={setPasswordsMatch}  />
      <ErrMsg message={msg} />
      <input type="submit" value="Registrieren" />
    </form>
    </>
  )
}

const PasswordInputs = props => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
      if(password === password2 && password !=="" && password2 !=="") {
          setMsg("");
          props.onStateChange(true);
      }else if(password ==="" && password2 ==="") {
          setMsg('');
      }else {
          setMsg('Passwords dont match');
          props.onStateChange(false);
      }
  }, [password, password2, props]);
  
  return(
      <>
      <span className="topInputPlaceholder">Password</span>
      <input ref={props.passwordRef} value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="..." id="password" name="password" required />
      <span className="topInputPlaceholder">Repeat Password</span>
      <input value={password2} onChange={e => setPassword2(e.target.value)} type="password" placeholder="..." id="password2" name="password2" required />
      <ErrMsg message={msg} />
      </>
  )
}

const Login = () => {
  const history = useHistory();
  const {toggleToken} = useContext(t);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const loginUser = e => {
    e.preventDefault();

    fetchAPI('login', {
      email: email,
      password: password
    }).then(data => {
      if(data.success === false) {
        setMsg(data.return);
      }else {
        history.push('/');
        toggleToken(data.return);
      }
    });
  }

  return(
    <>
    <h2>Einloggen</h2>
    <form onSubmit={e => loginUser(e)}>
      <span className="topInputPlaceholder">Email</span>
      <input placeholder="..." value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" required/>
      <span className="topInputPlaceholder">Passwort</span>
      <input placeholder="..." value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" required/>
      <ErrMsg message={msg} />
      <input type="submit" value="Einloggen" />
    </form>
    </>
  )
}