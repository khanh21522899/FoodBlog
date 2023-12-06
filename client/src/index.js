import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Blog } from './components/blog';
import CreateBlog from './components/createBlog/createBlog.js';
import BlogDetail from './pages/BlogDetail.js'
import { AuthContextProvider } from './Context/AuthContext';




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);



