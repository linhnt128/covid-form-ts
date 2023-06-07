import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

//import components
import ErrorBoundary from './utils/ErrorBoundary/ErrorBoundary.tsx';
import ErrorBoundaryFallback from './utils/ErrorBoundary/ErrorBoundaryFallback.tsx';

import store from "../src/store/store.tsx";
import { Provider } from "react-redux";



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ErrorBoundary
        fallback={<ErrorBoundaryFallback />}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
  </React.StrictMode>,
)
