import React, {useState, useEffect, useCallback} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {
    },
    logout: () => {
    },
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);
    const ONE_MINUTE_IN_MS = 60000;
    if (remainingTime <= ONE_MINUTE_IN_MS) {
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
    };
}

export const AuthContextProvider = (props) => {
    let logoutTimer;

    const tokenData = retrieveStoredToken();
    let initialToken
    if (tokenData) {
        initialToken = tokenData.token;
    }
    const [token, setToken] = useState(initialToken || null);

    const userIsLoggedIn = !!token;

    const logInHandler = useCallback((token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logOutHandler, remainingTime);
    }, []);

    const logOutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime')

        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    };

    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration)
            logoutTimer = setTimeout(logOutHandler, tokenData.duration)
        }
    }, [tokenData, logOutHandler])

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: logInHandler,
        logout: logOutHandler,
    };

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;
