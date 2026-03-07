import React, { Suspense } from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'
import App from './App';
import Loader from "./components/layouts/Loader";
import { SearchProvider } from './contexts/SearchContext';
import reportWebVitals from './reportWebVitals';
import "leaflet/dist/leaflet.css";
import "./utils/fixLeafletIcon";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Suspense fallback={<Loader/>}>
    <Provider store={store}>
      <SearchProvider>
        <HashRouter>
            <App />
        </HashRouter>
      </SearchProvider>
    </Provider>
  </Suspense>
);

reportWebVitals();
