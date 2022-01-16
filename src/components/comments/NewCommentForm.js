import React, {useRef, useEffect} from 'react';
import useHttp from "../hooks/use-http";
import {addComment} from "../lib/api";

import classes from './NewCommentForm.module.css';
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
    const commentTextRef = useRef();
    const {onAddedComment, quoteId} = props;
    const {sendRequest, status, error} = useHttp(addComment);

    useEffect(() => {
        if (status === 'completed' && !error) {
            onAddedComment();
        }
    }, [onAddedComment, status, error]);


    const submitFormHandler = (event) => {
        event.preventDefault();
        const enteredText = commentTextRef.current.value;

        sendRequest({
            commentData: {
                text: enteredText,
            }, quoteId: quoteId
        });

        // optional: Could validate here
    };

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            {status === 'pending' && (
                <div className='centered'>
                    <LoadingSpinner/>
                </div>
            )}
            <div className={classes.control} onSubmit={submitFormHandler}>
                <label htmlFor='comment'>Your Comment</label>
                <textarea id='comment' rows='5' ref={commentTextRef}/>
            </div>
            <div className={classes.actions}>
                <button className='btn'>Add Comment</button>
            </div>
        </form>
    );
};

export default NewCommentForm;
