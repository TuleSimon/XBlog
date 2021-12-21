import "tailwindcss/tailwind.css";
import { Layout } from "../components";
import { store } from "../services/store";
import "../styles/globals.scss";
import { Provider } from 'react-redux';
import Backdrops from "../components/Backdrops";
import Head from "next/head";


function MyApp({ Component, pageProps }) {
 
    return (
    <Provider store={store}>
       <Head>
      <title>XBLog</title>
    </Head>
      <Layout>
        <Component {...pageProps} />
        <Backdrops/>
      </Layout>
    </Provider>
  );
}

export default MyApp;
