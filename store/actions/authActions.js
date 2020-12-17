import * as types from '../types';
import { setAuthToken } from '../../utils/functions';

export const setUser = user => dispatch => {
    dispatch({type: types.SET_USER, user});
};

export const signOut = () => dispatch => {
    setAuthToken(false);
    dispatch({type: types.CLEAR_USER});

    window.location.href = "/dashboard/login";
};