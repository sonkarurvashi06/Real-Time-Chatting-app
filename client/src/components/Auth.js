import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import signinImage from '../assets/signup.jpg';
const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    avatarURL:'',


}
const Auth = () => {
    const [form, setform] = useState(initialState);

    const [isSignup, setIsSignup] = useState(true);
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
        
    }
    
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
      const { fullName, username, password, phoneNumber, avatarURL } = form;
      const URL ='http://localhost:5000/auth';
      const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
        username, password, fullName, phoneNumber, avatarURL
      });
      cookies.set('token', token);
      cookies.set('username', username);
      cookies.set("fullName", fullName);
      cookies.set("userId", userId);

      

      


      if (isSignup) {
        cookies.set('phoneNumber', phoneNumber);
        cookies.set('avatarURL', avatarURL);
        cookies.set("hashedPassword", hashedPassword);
      }
      window.location.reload();

      }

    return (
      <div className="auth__form-container">
        <div className="auth__form-container_fields">
          <div className="auth__form-container_fields-content">
            <p>{isSignup ? "Sign Up" : "Sign In"}</p>
                    <form onSubmit={handleSubmit}>
              {isSignup && (
                <div className="auth__form-container_fields-content_input">
                  <label htmlfor="fullname">Full Name</label>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="auth__form-container_fields-content_input">
                <label html="username">User Name</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                  required
                />
              </div>
              {isSignup && (
                <div className="auth__form-container_fields-content_input">
                  <label html="phoneNumber">Phone Number</label>
                  <input
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              {isSignup && (
                <div className="auth__form-container_fields-content_input">
                  <label html="avatarURL">Avatar URL</label>
                  <input
                    name="avatarURL"
                    type="text"
                    placeholder="Avatar URL"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              
                <div className="auth__form-container_fields-content_input">
                  <label html="password">Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>
              
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_button'>
                            <button>{isSignup? "Sign in": "Sign In" }</button>


                        </div>
                   

            </form>
            <div className="auth__form-container_field-account">
              <p>
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account"}
                <span onClick={switchMode}>
                  {isSignup ? "sign In" : "Sign up"}
                </span>
              </p>
            </div>
          </div>
            </div>
            <div className='auth__form-container-image'>
            <img src={signinImage}  alt="sign in"/>

            </div>
      </div>
    );

    
}
export default Auth