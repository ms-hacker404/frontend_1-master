
import './main.css';
import React from "react";
import { getUser, resetUserSession } from './service/AuthService';
import { useNavigate } from "react-router-dom";


const Subscription = () => {
    const navigate = useNavigate(); 
    const user = getUser();
    console.log(user)
    const user_name = user !== 'undefined' && user ? user.user_name : '';
    

    const logoutHandler = () => {
        resetUserSession();
        navigate('/login');
    }
    return (
        
        // <div class="intro-text">
        // <h1 class="intro-text" >Hello {user_name}! You have been loggined in!!!! Welcome to the home <br /></h1>
        // <input type="button" value="Logout" onClick={logoutHandler} />
        // </div>

        <section class="hero">
        <div class="intro-text">
          <h1>
            <span class="hear">Hello {user_name}! You have been logged in successfully </span> <br />
            <span class="connecting">  Welcome to your Subscriptions </span>
          </h1>
          <input type="button" class="btn red" value="Logout" onClick={logoutHandler} />
        </div>
      </section>
    )
} 

export default Subscription;