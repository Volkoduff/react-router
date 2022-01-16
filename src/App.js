import React, {Suspense} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import AllQuotes from "./pages/AllQuotes";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserProfile from "./components/Profile/UserProfile";

const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));

function App() {
    return (
        <Layout>
            <Suspense fallback={<div className='centered'><LoadingSpinner/></div>}>
                <Switch>
                    <Route path='/' exact>
                        <HomePage />
                    </Route>
                    <Route path='/auth'>
                        <AuthPage/>
                    </Route>
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
                    <Route path='*'>
                        <NotFound/>
                    </Route>
                </Switch>
            </Suspense>
        </Layout>
    );
}

export default App;
