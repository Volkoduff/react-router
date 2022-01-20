import classes from './MainNavigation.module.css'
import {useContext} from "react";
import {NavLink, Link} from "react-router-dom";
import React from "react";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return <header className={classes.header}>
        <Link to='/'>
            <div className={classes.logo}>Great Quotes</div>
        </Link>
        <nav className={classes.nav}>
            <ul>
                {!isLoggedIn && (
                    <li>
                        <Link to='/auth'>Login</Link>
                    </li>
                )}
                {isLoggedIn && (
                    <React.Fragment>
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <NavLink to='/quotes' activeClassName={classes.active}>All Quotes</NavLink>
                        </li>
                        <li>
                            <NavLink to='/new-quote' activeClassName={classes.active}>Add a quote</NavLink>
                        </li>
                        <li>
                            <button>Logout</button>
                        </li>
                    </React.Fragment>
                )}
            </ul>
        </nav>
    </header>
};

export default MainNavigation;
