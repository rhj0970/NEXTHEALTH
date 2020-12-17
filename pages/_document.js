import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class IDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

                    <link rel="shortcut icon" href="/static/img/ident.png" type="image/x-icon" />    
                    <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>

                    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                    <script src='https://kit.fontawesome.com/a076d05399.js'></script>
                    <link href="https://cdn.syncfusion.com/ej2/material.css" rel="stylesheet"/>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.38/system.js"></script>
                    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
                    <script src="systemjs.config.js"></script> 
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.38/system.js"></script>
                     <script src="systemjs.config.js"></script> 

                     <title>Next Health</title>             
            </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}