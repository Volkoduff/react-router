import {useContext, useRef} from "react";
import classes from './ProfileForm.module.css';
import AuthContext from "../../store/auth-context";
const API_KEY = 'AIzaSyDGQy6mk2Mo-HA70WCC_B24-Wi3B7kKQYc';
const PASSWORD_RESET_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`
const ProfileForm = () => {
    const authCtx = useContext(AuthContext);
    const newPasswordInputRef = useRef();
    const submitHandler = async (evt) => {
        evt.preventDefault();
        const enteredNewPassword = newPasswordInputRef.current.value;

        // TO DO add validation
        const response = await fetch(PASSWORD_RESET_URL, {
            method: "POST",
            body: JSON.stringify({
                idToken: authCtx.token,
                password: enteredNewPassword,
                returnSecureToken: false
            }), headers: {
                'Content-type': 'application/json',
            }
        })

        if (response.ok) {
            const data = await response.json()
            debugger
        } else {
            const data = await response.json()
            alert(data.error)
        }
    }

    return (
        <form className={classes.form}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' ref={newPasswordInputRef}/>
            </div>
            <div className={classes.action}>
                <button onClick={submitHandler}>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
