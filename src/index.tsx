import { CssBaseline } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import AuthContextProvider from 'features/authContext/AuthContext';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { history } from 'utils/history';
import App from './App';
import { store } from './app/store';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
// Create a client
const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ConnectedRouter history={history}>
            <I18nextProvider i18n={i18n}>
              <Suspense fallback={<div>loading</div>}>
                <CssBaseline />
                <App />
                <ReactQueryDevtools position="bottom-right" />
              </Suspense>
            </I18nextProvider>
          </ConnectedRouter>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthContextProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
