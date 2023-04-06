import './login.css';
import React, {useState} from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { setUserSession } from './service/AuthService'
const loginAPIUrl = 'https://nkllwgqs55.execute-api.us-east-1.amazonaws.com/prod/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); 

  const submitHandler = (event) => {
    event.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Both email and password are required');
      return;
    }
    setErrorMessage(null);

    const requestConfig = {
      headers: {
        'x-api-key': 'VVhDoss8cgat9dH6EypO93Z2JENti8gK3eNUP07g'
      }
    }
    const requestBody = {
      email: email,
      password: password
    }

    axios.post(loginAPIUrl, requestBody, requestConfig).then((response) => {
      
      
      setUserSession(response.data.user, response.data.token);
      navigate('/subscription');
    }).catch((error) => {
        console.log(error)
      if (error.response.status === 401 || error.response.status === 403) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('sorry....the backend server is down. please try again later!!');
      }
    })
  }

  return (
    // <div>
    //   <form onSubmit={submitHandler}>
    //     <h5>Login</h5>
    //     Email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
    //     Password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
    //     <input type="submit" value="Login" />
    //   </form>
    //   <p className = "link"><Link to = "/register">Register instead?</Link></p>
    //   {errorMessage && <p className="message">{errorMessage}</p>}
    // </div>
    <div class="login-page">
      <div class="form">
        <div class="login">
          <div class="login-header">
            <h3>Login</h3>
            <p class= "content" >Please enter your credentials to login.</p>
          </div>
        </div>
        <form class="login-form" onSubmit={submitHandler} >
          <input type="text" placeholder="email" value={email} onChange={event => setEmail(event.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={event => setPassword(event.target.value)} />
          <input type="submit" value="Login" />
          <p className = "link" class= "content"><Link to = "/register">Register instead?</Link></p>
          {errorMessage && <p className="message">{errorMessage}</p>}
        </form>
      </div>
    </div>
    
    
  )
}

export default Login;