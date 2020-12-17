import * as React from 'react';
import wrapper from '../store/store';

import '../styles/main.scss';

const App = ({Component, pageProps}) => (
    <Component {...pageProps} />
)

export default wrapper.withRedux(App);