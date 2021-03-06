import { useState, useRef, useContext } from 'react';
import { useHistory } from "react-router-dom";
import classes from './AuthForm.module.css';
import AuthContext from "../../store/auth-context";

const API_KEY = 'AIzaSyDGQy6mk2Mo-HA70WCC_B24-Wi3B7kKQYc';
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

const AuthForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [isLogin, setIsLogin] = useState(false);
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async (evt) => {
        evt.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true);
        const url = isLogin ? SIGN_UP_URL : LOGIN_URL;

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        setIsLoading(false);

        if (response.ok) {
            const { idToken, expiresIn } = await response.json();

            const expirationTime = new Date(new Date().getTime() + (+expiresIn * 1000))
            authCtx.login(idToken, expirationTime.toISOString() );
            history.replace('/');
        } else {
            const data = await response.json();
            let errorMessage = 'Authentication failed';
            if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
            }
            alert(errorMessage)
        }
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Sign Up' : 'Login'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' ref={emailInputRef} required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' minLength="7" id='password' ref={passwordInputRef} required/>
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>{!isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p className={classes['error-message']}>Loading...</p>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Login with existing account' : 'Create new account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
