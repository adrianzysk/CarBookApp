import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { saveToken } from "./tokenService/tokens";
import { navigate } from '@reach/router';
import './App.css';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, { data }] = useMutation(gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) 
    }
  `);
  async function submitLogin(e) {
    e.preventDefault();
    const { data } = await login({ variables: {username,password} });
    if(data.login=="No user with that username"){
      alert("No user with that username")
      return
    }
    if(data.login=="Bad password"){
      alert("Bad password")
      return
    }
    else{
        saveToken(data.login);
        navigate('./private')
    }
  }
  function handleClick() {
    navigate('./private')
  }
  function handleClick1() {
    navigate('./register')
  }
  return (
    <div className="wrapper fadeInDown">
  <div id="formContent">

    <h2 className="active" onClick={handleClick}> Sign In </h2>
    <h2 className="inactive underlineHover" onClick={handleClick1}> Sign Up </h2>

 
    <div className="fadeIn first">
        <DriveEtaIcon/>
    </div>

 
    <form onSubmit={submitLogin}> 
      <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" onChange={event => setUsername(event.target.value)}/>
      <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" onChange={event => setPassword(event.target.value)}/>
      <input type="submit" className="fadeIn fourth" value="Log In"/>
    </form>


    <div id="formFooter">
         <h2 className="inactive underlineHover" onClick={handleClick1}> Create history of your cars. Sign Up! </h2>
    </div>

  </div>
    </div>
  )
}

export default App
