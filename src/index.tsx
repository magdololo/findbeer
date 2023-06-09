import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store'
import {Provider} from "react-redux";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BeerDetails from './components/BeerDetails';
import ErrorPage from './components/ErrorPage';
import BeerList from './components/BeerList';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <BeerList/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/beer/:beerId",
    element: <BeerDetails />,
    errorElement: <ErrorPage />,
  },
  
]);

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
