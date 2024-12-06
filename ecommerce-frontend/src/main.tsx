import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/app.scss";
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
        domain={import.meta.env.REACT_APP_AUTH0_DOMAIN} 
        clientId={import.meta.env.REACT_APP_AUTH0_CLIENT_ID}   
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
)
