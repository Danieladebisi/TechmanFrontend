// import NavbarMenu from "./NavbarMenu";

// const Admin = () => {
//     const { user, logout } = useAuth();
//     if (!user || user.role !== "admin") {
//       return <Navigate to="/adminPage" />;
//     }
  
//     return (
//         <div className="container text-center py-5">
//           <NavbarMenu />
//         <h1 className="mb-4">Admin Dashboard</h1>
//         <img src={AdminImage} alt="Admin" className="rounded-circle mb-3" style={{ width: "80px", height: "80px" }} />
//         <p>Welcome, {user.username}</p>
//         <button className="btn btn-success m-2">Add Device</button>
//         <button className="btn btn-danger m-2" onClick={logout}>Logout</button>
//       </div>
//     );
//   };
//   export default Admin;