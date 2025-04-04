import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";  // ✅ FIXED IMPORT
import App from "./App.jsx";
import Compare from "./components/Compare.jsx";
import Contact from "./components/Contact.jsx";
import Home from "./components/Home.jsx";
import ComparePhones from "./components/ComparePhones.jsx";
import PhonePictures from "./components/Pictures.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/LogIn.jsx";
import AdminDashboard from "./components/AdminDasboard.jsx";


// ✅ Fixed Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [  // ✅ Nest child routes inside App
      { path: "", element: <Compare /> },
      { path: "compare", element: <Compare /> },
      { path: "contact", element: <Contact /> },
      { path: "comparePhones", element: <ComparePhones /> },
      { path: "pictures", element: <PhonePictures /> },
      { path: "login", element: <Login /> }, /* Dynamic login route */
      { path: "adminDashBoard", element: <AdminDashboard /> },
    ],
  },
]);

// ✅ Render the Router
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
