import Head from "next/head";
import "../styles/globals.css";
import {PersistGate} from "redux-persist/integration/react";
import {AppProps} from "next/app";
import {wrapper} from "@/store/store";
import {Provider} from "react-redux";

export default function App({Component, ...rest}: AppProps) {
    const {store, props} = wrapper.useWrappedStore(rest);
    const {pageProps} = props;

    return <>
            <Provider store={store}>
                <PersistGate persistor={(store as any).__persistor}>
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <title>Next.js Redux Persist Boilerplate</title>
                        <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
                    </Head>

                    <main id="main">
                        <Component {...pageProps} />
                    </main>
                </PersistGate>
            </Provider>
    </>
}