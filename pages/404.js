import * as React from 'react';
import Head from 'next/head';

export default class PageNotFound extends React.Component {
    render() {
        return (
            <div id="pageNotFound">
                <Head>
                    <title>Next Health: Page not found</title>
                </Head>

                <h1>That page wasn't found, sorry.</h1>
            </div>
        );
    }
}