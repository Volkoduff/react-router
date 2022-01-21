import React, {Suspense, useContext} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import AllQuotes from "./pages/AllQuotes";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserProfile from "./components/Profile/UserProfile";
import AuthContext from "./store/auth-context";

const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));

function App() {
    const authCtx = useContext(AuthContext);

    return (
        <Layout>
            <Suspense fallback={<div className='centered'><LoadingSpinner/></div>}>
                <Switch>
                    <Route path='/' exact>
                        <HomePage/>
                    </Route>
                    {!authCtx.isLoggedIn && (
                        <Route path='/auth'>
                            <AuthPage/>
                        </Route>
                    )}
                    {authCtx.isLoggedIn && (
                        <React.Fragment>
                            <Route path='/profile'>
                                <UserProfile/>
                            </Route>
                            <Route path='/' exact>
                                <Redirect to='/quotes'/>
                            </Route>
                            <Route path='/quotes' exact>
                                <AllQuotes/>
                            </Route>
                            <Route path='/quotes/:quoteId'>
                                <QuoteDetail/>
                            </Route>
                            <Route path='/new-quote'>
                                <NewQuote/>
                            </Route>
                        </React.Fragment>
                    )}
                    <Route path='*'>
                        <Redirect to='/'/>
                    </Route>
                </Switch>
            </Suspense>
        </Layout>
    );
}

export default App;
