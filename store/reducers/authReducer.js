import * as types from '../types';
import { setAuthToken } from '../../utils/functions';
import jwt_decode from 'jwt-decode';

let initialState = {
    authenticated: false,
    user: {

    }
};

if (typeof localStorage !== "undefined" && localStorage.getItem("authToken")) {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);

    if (token) {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
            initialState.authenticated = true;
            initialState.user = decoded;
        }
    }
}

export default function reduce(state = initialState, action)  {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.user
            };
        case types.CLEAR_USER:
            return {
                ...state,
                authenticated: false,
                user: {

                }
            };
        default:
            return state;
    }
}