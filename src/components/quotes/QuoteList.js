import React, {Fragment} from 'react';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
import {useHistory, useLocation} from 'react-router-dom';

const QuoteList = (props) => {
    const history = useHistory();
    const location = useLocation();

    const sortQuotes = (quotes, ascending) => {
        return quotes.sort((quoteA, quoteB) => {
            if (ascending) {
                return quoteA.id > quoteB.id ? 1 : -1;
            } else {
                return quoteA.id < quoteB.id ? 1 : -1;
            }
        });
    };

    const queryParams = new URLSearchParams(location.search);
    const isSortAscending = queryParams.get('sort') === 'asc';

    const onChangeSortingFunction = () => {
        history.push({
            pathname: location.pathname,
            search: `sort=${(isSortAscending ? 'desc' : 'asc')}`,
        })
    };
    return (
        <Fragment>
            <div className={classes.sorting}>
                <button
                    onClick={onChangeSortingFunction}>Sort {isSortAscending ? 'Descending' : 'Ascending'}</button>
            </div>
            <ul className={classes.list}>
                {sortQuotes(props.quotes, isSortAscending).map((quote) => (
                    <QuoteItem
                        key={quote.id}
                        id={quote.id}
                        author={quote.author}
                        text={quote.text}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default QuoteList;
