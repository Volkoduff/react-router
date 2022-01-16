import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from 'react-router-dom'
import useHttp from "../components/hooks/use-http";
import { addQuote } from "../components/lib/api";
import React, { useEffect } from 'react';

const NewQuote = () => {
    const {sendRequest, status} = useHttp(addQuote);
    const history = useHistory();

    useEffect(() => {
        if (status === 'completed') {
            history.push('/quotes')
        }
    }, [status, history]);

    const addQuoteData = (data) => {
        sendRequest(data);
    };

    return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteData}/>
};

export default NewQuote;
