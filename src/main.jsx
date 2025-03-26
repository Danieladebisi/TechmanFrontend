import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Compare from "./components/Compare.jsx";
import Contact from "./components/Contact.jsx";
import Home from "./components/Home.jsx";
import ComparePhones from "./components/ComparePhones.jsx";
import PhonePictures from "./components/Pictures.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/LogIn.jsx";
import AdminDashboard from "./components/AdminDasboard.jsx";

// Set basename based on your deployment
const basename = "/app"; // For Netlify subpath deployment

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Compare /> },  // Better than path: ""
      { path: "compare", element: <Compare /> },
      { path: "contact", element: <Contact /> },
      { path: "comparePhones", element: <ComparePhones /> },
      { path: "pictures", element: <PhonePictures /> },
      { path: "login", element: <Login /> },  // Removed leading slash
      { path: "adminDashBoard", element: <AdminDashboard /> },
    ],
  },
], {
  basename: basename  // Add basename configuration here
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);