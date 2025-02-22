import { Outlet } from "react-router-dom";
import NavbarMenu from "./components/NavbarMenu"; // Your Navbar

const App = () => {
  return (
    <div>
      {/* <NavbarMenu /> */}
      <Outlet />  {/* 👈 This ensures child routes render here */}
    </div>
  );
};

export default App;
