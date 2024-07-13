import '../public/styles/globals.css';
import '../public/styles/layout.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/assets/css/bootstrap-dark.css';
import '../public/assets/css/app-dark.css';
import '../public/assets/css/bootstrap.min.css';
import '../public/assets/css/icons.min.css';
import '../public/assets/css/app.min.css';
// import "../public/assets/css/"
import { store } from '../redux/store/store';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';
// import '../public/assets/css/bootstrap.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout >
      <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
