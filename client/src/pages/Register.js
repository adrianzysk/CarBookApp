import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { navigate } from '@reach/router';
import '../App.css';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [createUser, { data }] = useMutation(gql`
    mutation createUser($username: String!, $password: String!, $email: String!) {
        createUser(username: $username, password: $password, email: $email) 
    }
  `);
  async function submitLogin(e) {
    e.preventDefault();
    const { data } = await createUser({ variables: {username,password,email} });
    if(data.createUser=="Username already exist"){
      alert("Username already exist")
      return
    }
    if(data.createUser=="Account Created"){
      alert("Account created")
      navigate('./')
    }
  }
  function handleClick() {
    navigate('./')
  }
  function handleClick1() {
    navigate('./register')
  }
  return (
    <div className="wrapper fadeInDown">
  <div id="formContent">

    <h2 className="inactive underlineHover" onClick={handleClick}> Sign In </h2>
    <h2 className="active" onClick={handleClick1}> Sign Up </h2>

 
    <div className="fadeIn first">
        <DriveEtaIcon/>
    </div>

 
    <form onSubmit={submitLogin}> 
      <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" onChange={event => setUsername(event.target.value)}/>
      <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" onChange={event => setPassword(event.target.value)}/>
      <input type="text" id="email" className="fadeIn third" name="login" placeholder="email" onChange={event => setEmail(event.target.value)}/>
      <input type="submit" className="fadeIn fourth" value="Sign Up"/>
    </form>


    <div id="formFooter">
         <h2 className="inactive underlineHover" onClick={handleClick}> Already signed in. Log in! </h2>
    </div>

  </div>
    </div>
  )
}

export default App