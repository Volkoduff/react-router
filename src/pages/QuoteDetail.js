import { Fragment } from 'react'
import Comments from "../components/comments/Comments";
import { useParams, Route } from 'react-router-dom';

const QuoteDetail = () => {
    const params = useParams();
    return <Fragment>
        <h1>Details quotes Page</h1>
        <p>{params.quoteId}</p>
        <Route path={`/quotes/${params.quoteId}/comments`}>
            <Comments/>
        </Route>
    </Fragment>
};

export default QuoteDetail;
