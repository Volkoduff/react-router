import React, {Fragment, useEffect} from 'react'
import Comments from "../components/comments/Comments";
import {useParams, Route, Link, useRouteMatch} from 'react-router-dom';
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../components/hooks/use-http";
import { getSingleQuote } from "../components/lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
    const params = useParams();
    const match = useRouteMatch();

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote);

    const quoteId = params.quoteId;

    useEffect(() => {
        sendRequest(quoteId)
    }, [sendRequest, quoteId]);

    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner/>
        </div>
    }

    if (error) {
        return <div className='centered focused'>
            <p>{error}</p>
        </div>
    }

    if (!loadedQuote) {
        return <p>No quote found</p>
    }

    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={`${match.path}`} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </Fragment>
    )
};

export default QuoteDetail;
