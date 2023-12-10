import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Blog } from "./components/blog";
import CreateBlog from "./components/createBlog/createBlog.js";
import BlogDetail from "./pages/BlogDetail.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Blog />} />
      <Route path="blogs/:blogId" element={<BlogDetail />} />
      <Route path="create-blog" element={<CreateBlog />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
