import React, {} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import NotFound from "./pages/NotFound";
import QuoteDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/layout";

function App() {
    const data = [
        {id: 1, author: 'Me', text: 'Tralalala'},
        {id: 2, author: 'Him', text: 'Tralalala'}
    ];
    return (
        <Layout>
            <Switch>
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
        </Layout>
    );
}

export default App;
