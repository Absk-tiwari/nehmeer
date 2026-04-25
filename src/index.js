import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from "./redux/store"; // ✅ persistor removed
import App from './App';
import { SearchProvider } from './contexts/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

// 🔥 DEBUG (optional)
window.store = store;

root.render(
  <Provider store={store}>
    <SearchProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </SearchProvider>
  </Provider>
);