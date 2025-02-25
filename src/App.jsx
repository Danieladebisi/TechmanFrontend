import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Outlet />  {/* 👈 This ensures child routes render here */}
    </div>
  );
};

export default App;
