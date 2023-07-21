// pages/_app.js
import Head from "next/head";
import "../styles/mvp.css"
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Next.js Redux Persist Boilerplate</title>
            </Head>

            <main id="main">
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyApp;
