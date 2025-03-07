import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Table, Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import Logo from "../assets/Logo.png";

const AdminDashboard = () => {
  const [devices, setDevices] = useState([]);
  const [show, setShow] = useState(false);
  const [editDevice, setEditDevice] = useState(null);
  const [formData, setFormData] = useState([]);
  const [admin, setAdmin] = useState({ name: "", email: "", image: "" });

  //axios instance 
  const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  // useEffect(() => {
  //   API.get("/getAllPhones")
  //     .then((response) => setDevices(response.data))
  //     .catch((error) => console.error("Error fetching devices:", error));
  // }, []);

  useEffect(() => {
    const adminEmail = localStorage.getItem("adminEmail"); // Assuming email is stored after login
    if (adminEmail) {
      API.post("/auth/login", { email: adminEmail }) // ✅ Use POST
        .then((response) => setAdmin(response.data))
        .catch((error) =>
          console.error("Error fetching admin details:", error)
        );
    }
  }, []);
  

  const handleShow = (device = null) => {
    setEditDevice(device);
    setFormData(device || { name: "", type: "" });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({ ...formData, imageUrl: response.data.imageUrl }); // Save uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editDevice) {
        await API.put(`/update/${editDevice.id}`, formData);
        setDevices(
          devices.map((d) =>
            d.id === editDevice.id ? { ...d, ...formData } : d
          )
        );
      } else {
        const response = await axios.post("/create", formData);
        setDevices([...devices, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error("Error saving device:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/delete/${id}`);
      setDevices(devices.filter((device) => device.id !== id));
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminEmail");
        window.location.href = "/login";
      }
    });
  };

  return (
    <>
      <div>
        <Navbar
          style={{ backgroundColor: "#53a2ff" }}
          expand="lg"
          className="px-3"
        >
          <Navbar.Brand href="#">
            <img
              src={Logo}
              width="170"
              height="60"
              className="d-inline-block align-top"
              alt="Techmansion logo"
            />
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center">
            {admin.image && (
              <img
                src={admin.image}
                alt="Admin"
                className="rounded-circle me-2"
                width="40"
              />
            )}
            <span className="text-white me-3">{admin.email}</span>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar>

        <div className="container mt-5">
          <h2>Admin Dashboard</h2>
          <Button variant="primary" onClick={() => handleShow()}>
            Add Device
          </Button>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Body</th>
                <th>Network</th>
                <th>Feature</th>
                <th>Launch</th>
                <th>Brightness</th>
                <th>Charging</th>
                <th>Battery</th>
                <th>Communication</th>
                <th>Misc</th>
                <th>Sound</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id}>
                  <td>{device.id}</td>
                  <td>
                    {device.imageUrl ? (
                      <img
                        src={device.imageUrl}
                        alt="Device"
                        width="60"
                        height="60"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{device.network}</td>
                  <td>{device.feature}</td>
                  <td>{device.launch}</td>
                  <td>{device.brightness}</td>
                  <td>{device.charging}</td>
                  <td>{device.battery}</td>
                  <td>{device.communication}</td>
                  <td>{device.misc}</td>
                  <td>{device.sound}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShow(device)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(device.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editDevice ? "Edit Device" : "Add Device"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </Form.Group>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Network</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Launch</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Display</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Platform</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Memories</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>MainCameras</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>SelfieCameras</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Sound</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Communications</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Features</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Battery</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Miscs</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Protections</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Modules</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Brightness</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Charging</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {editDevice ? "Update" : "Add"}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

// import React, { useMemo, useRef, useState } from 'react';
// import { Select, Spin } from 'antd';
// import debounce from 'lodash/debounce';
// function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
//   const [fetching, setFetching] = useState(false);
//   const [options, setOptions] = useState([]);
//   const fetchRef = useRef(0);
//   const debounceFetcher = useMemo(() => {
//     const loadOptions = (value) => {
//       fetchRef.current += 1;
//       const fetchId = fetchRef.current;
//       setOptions([]);
//       setFetching(true);
//       fetchOptions(value).then((newOptions) => {
//         if (fetchId !== fetchRef.current) {
//           // for fetch callback order
//           return;
//         }
//         setOptions(newOptions);
//         setFetching(false);
//       });
//     };
//     return debounce(loadOptions, debounceTimeout);
//   }, [fetchOptions, debounceTimeout]);
//   return (
//     <Select
//       labelInValue
//       filterOption={false}
//       onSearch={debounceFetcher}
//       notFoundContent={fetching ? <Spin size="small" /> : null}
//       {...props}
//       options={options}
//     />
//   );
// }

// // Usage of DebounceSelect

// async function fetchUserList(username) {
//   console.log('fetching user', username);
//   return fetch('https://randomuser.me/api/?results=5')
//     .then((response) => response.json())
//     .then((body) =>
//       body.results.map((user) => ({
//         label: `${user.name.first} ${user.name.last}`,
//         value: user.login.username,
//       })),
//     );
// }
// const App = () => {
//   const [value, setValue] = useState([]);
//   return (
//     <DebounceSelect
//       mode="multiple"
//       value={value}
//       placeholder="Select users"
//       fetchOptions={fetchUserList}
//       onChange={(newValue) => {
//         setValue(newValue);
//       }}
//       style={{
//         width: '100%',
//       }}
//     />
//   );
// };
// export default App;

export default AdminDashboard;