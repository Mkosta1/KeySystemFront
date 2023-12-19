import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'font-awesome/css/font-awesome.min.css';

import './site.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Login from './routes/identity/Login';
import Register from './routes/identity/Register';
import Privacy from './routes/Privacy';
import Index from './routes/index/Index';
import Worker from './routes/Worker/Worker';
import WorkerProfile from './routes/Worker/WorkerProfile';
import Keys from './routes/Keys/Keys';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
          {
              path: "/",
              element: <Index />,
          },
          {
              path: "login/",
              element: <Login />,
          },
          {
              path: "register/",
              element: <Register />,
          },
          {
              path: "privacy/:id?",
              element: <Privacy />,
          },
          {
            path: "worker/:id?",
            element: <Worker />,
          },
          {
            path: "workerProfile/:id",
            element: <WorkerProfile />,
          },
          {
            path: "keys",
            element: <Keys />,
          }
            
      ]
  },


]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);


