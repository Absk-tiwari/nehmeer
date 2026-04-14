import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { HashRouter } from 'react-router-dom';

import store, { persistor } from "./redux/store";
import App from './App';
import Loader from "./components/layouts/Loader";
import { SearchProvider } from './contexts/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

// 🔥 DEBUG
window.store = store;

root.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <SearchProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </SearchProvider>
    </PersistGate>
  </Provider>
);