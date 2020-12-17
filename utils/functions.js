/* This file is for all utility functions that we might need. 
 * Things like setting authorization tokens, randomization functions, etc. */

import axios from "axios";

export function setAuthToken(token) {
    if (token) {
        // Apply authorization token to every request if logged in
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common["Authorization"] = token;
        return;
    }

    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common["Authorization"];
};

export function shouldSignIn(props) {
    if (!props.auth.authenticated) {
        window.location.href = "/dashboard/login";
        return true;
    }

    return false;
}