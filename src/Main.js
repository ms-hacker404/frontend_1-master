import './main.css';
import React from "react";
import { getUser, resetUserSession } from './service/AuthService';
import { useNavigate } from "react-router-dom";


const Main = () => {
    const navigate = useNavigate(); 
    const user = getUser();
    console.log(user)
    const user_name = user !== 'undefined' && user ? user.user_name : '';
    

    const logoutHandler = () => {
        resetUserSession();
        navigate('/login');
    }
    return (
        
        // <div>
        // Hello {user_name}! You have been loggined in!!!! Welcome to the home <br />
        // <input type="button" value="Logout" onClick={logoutHandler} />
        // </div>
        <section class="hero">
        <div class="intro-text">
          <h1>
            <span class="hear"> You can use this simple application </span> <br />
            <span class="connecting"> to login and register </span>
          </h1>
          <p>
            This is a website that uses React.js for frontend and node.js for backend.<br />
            It uses AWS lambda function API gateway and is deployed on EC2.
          </p>
          <a class="btn red" href="/login">Login</a>
          <a class="btn blue" href="/register">Register</a>
        </div>
      </section>
    )
} 

export default Main;