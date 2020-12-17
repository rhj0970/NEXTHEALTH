import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { createWrapper }from 'next-redux-wrapper';

export const makeStore = (initialState, options) => {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...[thunk]))
  );
}

export default createWrapper(makeStore);