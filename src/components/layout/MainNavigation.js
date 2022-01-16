import classes from './MainNavigation.module.css'
import {NavLink, Link} from "react-router-dom";
import React from "react";

const MainNavigation = () => {
    return <header className={classes.header}>
        <Link to='/' >
            <div className={classes.logo}>Great Quotes</div>
        </Link>
        <nav className={classes.nav}>
            <ul>
                <li>
                    <Link to='/auth'>Login</Link>
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
                <li>
                    <button>Logout</button>
                </li>
                <li>
                    <NavLink to='/quotes' activeClassName={classes.active}>All Quotes</NavLink>
                </li>
                <li>
                    <NavLink to='/new-quote' activeClassName={classes.active}>Add a quote</NavLink>
                </li>
            </ul>
        </nav>
    </header>
};

export default MainNavigation;
