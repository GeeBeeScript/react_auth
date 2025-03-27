import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {  
  const [isLogin, setIsLogin] = useState(true);
  const [showResponse, setShowResponse] = useState({value: true, message: "" })
  const [isLoading, setIsLoading] = useState(false)

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    setIsLoading(true)

    let url
    if (isLogin) {
      setShowResponse({value: true, message: ""})
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXB1kwoXm4c5G8lHxAd8Qu7Yga432QwPA"
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        setIsLoading(false)
        if (response.ok) {
          console.log(response)
          // This should not be done
          setShowResponse({value: false, message: "Login Successful"})

        } else {
          return response.json().then((data) => {
            const errorMessage = data.error.message
            setShowResponse({value: false, message: errorMessage})
          })
        }
      })

    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXB1kwoXm4c5G8lHxAd8Qu7Yga432QwPA"
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        setIsLoading(false)
        if (response.ok) {
          console.log(response)
        } else {
          return response.json().then((data) => {
            console.log(data)
            const errorMessage = data.error.message
            setShowResponse({value: false, message: errorMessage})
          })
        }
      })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordInputRef} required />
        </div>
        <div className={classes.control}>
          {!showResponse.value && <p>{showResponse.message}</p>}
          {console.log(showResponse)}
        </div>
        <div className={classes.actions}>
          {!isLoading && <button >{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
