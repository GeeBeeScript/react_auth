import { useRef, useContext } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const newPasswordInputRef = useRef()
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    const newEnteredPassword = newPasswordInputRef.current.value
    

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=", {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: newEnteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      // assuming it always succeeds
      console.log(response);
      navigate('/')
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
