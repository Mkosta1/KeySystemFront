import React from "react";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

interface iError {
    statusText?: string,
    message?: string,
}

const ErrorPage = () => {
    const error = useRouteError() as iError;
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/">Head back to home page</Link>
        </div>
    );
}

export default ErrorPage;