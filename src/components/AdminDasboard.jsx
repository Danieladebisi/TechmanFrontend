import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Table, Button, Form, Modal, Row, Col, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import Logo from "../assets/Logo.png";

const AdminDashboard = () => {
  const [devices, setDevices] = useState([]);
  const [show, setShow] = useState(false);
  const [editDevice, setEditDevice] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState({ name: "", email: "", image: "" });

  const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await API.get("/GetAll-Phones");
        const data = await response.json();
        // Ensure data is an array, fallback to empty array if not
        setDevices(Array.isArray(data) ? data : []);

        // setDevices(response.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    fetchDevices(); // Fix the typo here
  }, []);

  const emptyDevice = {
    name: formData.name,
    imageUrl: formData.imageUrl,
    network: { technology: formData.technology },
    launch: { announced: formData.announced, status: formData.status },
    body: { dimensions: formData.dimensions, weight: formData.weight, build: formData.build, sim: formData.sim },
    display: { type: formData.type, size: formData.size, resolution: formData.resolution },
    communication: { 
      wlan: formData.wlan, 
      bluetooth: formData.bluetooth, 
      positioning: formData.positioning, 
      nfc: formData.nfc, 
      infrared_port: formData.infrared_port, 
      radio: formData.radio, 
      usb: formData.usb 
    },
    battery: { type: formData.type, charging: formData.charging },
    feature: { sensors: formData.sensors },
    mainCamera: { modules: formData.modules, features: formData.features, video: formData.video },
    memory: { cardSlot: formData.cardSlot, internal: formData.internal },
    misc: { 
      colors: formData.colors, 
      sar: formData.sar, 
      sareu: formData.sareu, 
      models: formData.models, 
      price: formData.price
    },
    platform: { 
      os: formData.os, 
      chipset: formData.chipset, 
      cpu: formData.cpu, 
      gpu: formData.gpu 
    },
    selfieCamera: { module: formData.module, video: formData.video },
    sound: { 
      loudspeaker: formData.loudspeaker,
       _35mm_jack: formData._35mm_jack 
      },
    test: { 
      performance: formData.performance, 
      display: formData.display, 
      loudspeaker: formData.loudspeaker , 
      battery: formData.battery  
    },
    createdBy:{ createdBy: formData.createdBy}
  };

  const handleShow = (device = null) => {
    setEditDevice(device);
    setFormData(device ? { ...device } : emptyDevice);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    setFormData((prev) => {
      const updated = { ...prev };
      let nested = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        nested[keys[i]] = nested[keys[i]] || {};
        nested = nested[keys[i]];
      }
      nested[keys[keys.length - 1]] = value;
      return { ...updated };
    });
  };

  // const handleImageUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;
  //   const uploadForm = new FormData();
  //   uploadForm.append("file", file);
  //   try {
  //     const response = await API.post("/upload", uploadForm, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     setFormData(prev => ({
  //       ...prev,
  //       imageUrl: response.data.imageUrl
  //     }));
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setFormData(prev => ({
      ...prev,
      imageFile: file, // Store the file object
      imageUrl: URL.createObjectURL(file) // For preview
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

    try {
      if (editDevice) {
        await API.put(`/update/${editDevice.id}`, formData);
        setDevices(devices.map((d) => (d.id === editDevice.id ? formData : d)));
      } else {
        console.log("Sending data:", JSON.stringify(formData, null, 2))
        const response = await API.post(`/Create`, formData, config);
        setDevices(prevDevices => [...prevDevices, response.data]);
        console.log("API Response:", response.data);
        console.log("Current devices state:", devices);
        // console.log("Sending data:", JSON.stringify(formData, null, 2));
      }
      handleClose();
      Swal.fire({
        title: "Success!",
        text: `Device ${editDevice ? "updated" : "added"} successfully`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error saving device:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to save device",
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        await API.delete(`/delete/${id}`);
        setDevices(devices.filter((device) => device.id !== id));
        Swal.fire("Deleted!", "The device has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting device:", error);
      Swal.fire("Error!", "Failed to delete device", "error");
    }
  };

  const formatTableData = (data, subFields) => {
    if (!data) return "-";
    if (typeof data === "string") return data;
    
    return subFields
      .map(field => data[field] || "")
      .filter(value => value)
      .join(", ");
  };

  return (
    <div>
      <Navbar style={{ backgroundColor: "#53a2ff" }} expand="lg" className="px-3">
        <Navbar.Brand href="#">
          <img src={Logo} width="170" height="60" alt="Techmansion logo" />
        </Navbar.Brand> 
        <Nav className="ms-auto d-flex align-items-center">
          {admin.name && <img src={admin.image} alt="Admin" className="rounded-circle me-2" width="40" />}
          <span className="text-white me-3">{admin.email}</span>
          <Button variant="danger" onClick={() => {
            localStorage.removeItem("adminEmail");
            window.location.href = "/login";
          }}>Logout</Button>
        </Nav>
      </Navbar>

      <div className="container mt-5">
        <h2>Admin Dashboard</h2>
        <Button variant="primary" onClick={() => handleShow()} className="mb-3">
          Add Device
        </Button>
        
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Network</th>
                <th>Launch</th>
                <th>Body</th>
                <th>Display</th>
                <th>Communication</th>
                <th>Battery</th>
                <th>Feature</th>
                <th>MainCamera</th>
                <th>Memory</th>
                <th>Misc</th>
                <th>Platform</th>
                <th>SelfieCamera</th>
                <th>Sound</th>
                <th>Test</th>
                <th>CreatedBy</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id}>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>
                    {device.imageFile ? (
                      <Image src={device.imageFile} alt={device.name} thumbnail width={60} height={60} />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{formatTableData(device.network, ["technology"])}</td>
                  <td>{formatTableData(device.launch, ["announced", "status"])}</td>
                  <td>{formatTableData(device.body, ["dimensions", "weight", "build", "sim"])}</td>
                  <td>{formatTableData(device.display, ["type", "size", "resolution"])}</td>
                  <td>{formatTableData(device.communication, ["wlan", "bluetooth", "positioning", "nfc", "infrared_port", "radio", "usb"])}</td>
                  <td>{formatTableData(device.battery, ["type", "charging"])}</td>
                  <td>{formatTableData(device.feature, ["sensors"])}</td>
                  <td>{formatTableData(device.mainCamera, ["modules", "features", "video"])}</td>
                  <td>{formatTableData(device.memory, ["cardSlot", "internal"])}</td>
                  <td>{formatTableData(device.misc, ["colors", "sar", "sareu", "models", "price"])}</td>
                  <td>{formatTableData(device.platform, ["os", "chipset", "cpu", "gpu"])}</td>
                  <td>{formatTableData(device.selfieCamera, ["module", "video"])}</td>
                  <td>{formatTableData(device.sound, ["loudspeaker", "_35mm_jack"])}</td>
                  <td>{formatTableData(device.test, ["performance", "display", "loudspeaker", "battery"])}</td>
                  <td>{formatTableData(device.createdBy, ["createdBy"])}</td>
                  <td>
                    <Button 
                      variant="warning" 
                      size="sm" 
                      onClick={() => handleShow(device)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(device.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Add/Edit Device Modal */}
        <Modal show={show} onHide={handleClose} size="xl" scrollable>
          <Modal.Header closeButton>
            <Modal.Title>{editDevice ? "Edit Device" : "Add New Device"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <h5>Basic Information</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Device Name*</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name" 
                      value={formData.name || ""} 
                      onChange={handleChange} 
                      required 
                    />
                   </Form.Group>
                  {/*<Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control 
                      type="file" 
                      //onChange={handleImageUpload} 
                      accept="image/*" 
                    />
                    {formData.imageUrl && (
                      <div className="mt-2">
                        <Image src={formData.imageUrl} thumbnail width={100} />
                        <Form.Control
                          type="text"
                          name="imageUrl"
                          value={formData.imageUrl || ""}
                          onChange={handleChange}
                          className="mt-2"
                          placeholder="Or enter image URL"
                        />
                      </div>
                    )}
                  </Form.Group> */}
                  <Form.Group controlId="imageFile">
                    <Form.Label>Image File</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleImageUpload}
                      required={!editDevice}
                      placeholder="please choose device image"
                    />
                  </Form.Group>
                  <h5 className="mt-4">Network</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Technology</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="network.technology" 
                      value={formData.network?.technology || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>

                  <h5 className="mt-4">Launch</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Announced</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="launch.announced" 
                      value={formData.launch?.announced || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="launch.status" 
                      value={formData.launch?.status || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>

                  <h5 className="mt-4">Body</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Dimensions</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="body.dimensions" 
                      value={formData.body?.dimensions || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="body.weight" 
                      value={formData.body?.weight || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Build</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="body.build" 
                      value={formData.body?.build || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>SIM</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="body.sim" 
                      value={formData.body?.sim || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <h5>Display</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="display.type" 
                      value={formData.display?.type || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Size</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="display.size" 
                      value={formData.display?.size || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Resolution</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="display.resolution" 
                      value={formData.display?.resolution || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>

                  <h5 className="mt-4">Platform</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>OS</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="platform.os" 
                      value={formData.platform?.os || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Chipset</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="platform.chipset" 
                      value={formData.platform?.chipset || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>CPU</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="platform.cpu" 
                      value={formData.platform?.cpu || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>GPU</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="platform.gpu" 
                      value={formData.platform?.gpu || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Additional sections for other fields */}
              <Row className="mt-3">
                <Col md={6}>
                  <h5>Memory</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Card Slot</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="memory.cardSlot" 
                      value={formData.memory?.cardSlot || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Internal</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="memory.internal" 
                      value={formData.memory?.internal || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>

                  <h5 className="mt-4">Main Camera</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Modules</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="mainCamera.modules" 
                      value={formData.mainCamera?.modules || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Features</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="mainCamera.features" 
                      value={formData.mainCamera?.features || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Video</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="mainCamera.video" 
                      value={formData.mainCamera?.video || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <h5>Selfie Camera</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Module</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="selfieCamera.module" 
                      value={formData.selfieCamera?.module || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Video</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="selfieCamera.video" 
                      value={formData.selfieCamera?.video || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>

                  <h5 className="mt-4">Sound</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Loudspeaker</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="sound.loudspeaker" 
                      value={formData.sound?.loudspeaker || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>_3.5mm_Jack</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="sound._35mm_jack" 
                      value={formData.sound?._35mm_jack || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={6}>
                  <h5>Communication</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>WLAN</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="communication.wlan" 
                      value={formData.communication?.wlan || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bluetooth</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="communication.bluetooth" 
                      value={formData.communication?.bluetooth || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Positioning</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="communication.positioning" 
                      value={formData.communication?.positioning || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>NFC</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="communication.nfc" 
                      value={formData.communication?.nfc || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Infrared Port</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="communication.infrared_port" 
                      value={formData.communication?.infrared_port || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Radio</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="communication.radio" 
                      value={formData.communication?.radio || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>USB</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="communication.usb" 
                      value={formData.communication?.usb || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <h5>Battery</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="battery.type" 
                      value={formData.battery?.type || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Charging</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="battery.charging" 
                      value={formData.battery?.charging || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>

                  <h5 className="mt-4">Features</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Sensors</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="feature.sensors" 
                      value={formData.feature?.sensors || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>

                  <h5 className="mt-4">Misc</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Colors</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="misc.colors" 
                      value={formData.misc?.colors || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>SAR</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="misc.sar" 
                      value={formData.misc?.sar || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>SAR EU</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="misc.sareu" 
                      value={formData.misc?.sareu || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Models</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="misc.models" 
                      value={formData.misc?.models || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="misc.price" 
                      value={formData.misc?.price || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h5 className="mt-4">Tests</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Performance</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="test.performance" 
                      value={formData.test?.performance || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Display</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="test.display" 
                      value={formData.test?.display || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Loudspeaker</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="test.loudspeaker" 
                      value={formData.test?.loudspeaker || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Battery Life</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="test.battery" 
                      value={formData.test?.battery || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>CreatedBy</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="createdBy" 
                      value={formData.createdBy?.createdBy || ""} 
                      onChange={handleChange} 
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-4">
                <Button variant="secondary" onClick={handleClose} className="me-2">
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editDevice ? "Update Device" : "Add Device"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default AdminDashboard;

// ----------------------
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Navbar, Nav, Table, Button, Form, Modal, Row, Col, Image } from "react-bootstrap";
// import Swal from "sweetalert2";
// import Logo from "../assets/Logo.png";

// const AdminDashboard = () => {
//   const [devices, setDevices] = useState([]);
//   const [show, setShow] = useState(false);
//   const [editDevice, setEditDevice] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [admin, setAdmin] = useState({ name: "", email: "", image: "" });
//   const [selectedFile, setSelectedFile] = useState(null);

//   const API = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//   });

//   // useEffect(() => {
//   //   const fetchDevices = async () => {
//   //     try {
//   //       const response = await API.get("/GetAll-Phones");
//   //       setDevices(response.data); // Remove the array wrapping if backend returns array
//   //     } catch (error) {
//   //       console.error("Error fetching devices:", error);
//   //     }
//   //   };
//   //   fetchDevices();
//   // }, []);

//   const emptyDevice = {
//     name: "",
//     imageUrl: "",
//     networkTechnology: "",
//     launchAnnounced: "",
//     launchStatus: "",
//     bodyDimension: "",
//     bodyWeight: "",
//     bodyBuild: "",
//     bodySim: "",
//     displayType: "",
//     displaySize: "",
//     displayResolution: "",
//     communicationWlan: "",
//     communicationBluetooth: "",
//     communicationPositioning: "",
//     communicationNfc: "",
//     communicationInfraredPort: "",
//     communicationRadio: "",
//     communicationUsd: "",
//     batteryType: "",
//     batteryCharging: "",
//     featureSensors: "",
//     mainCameraModules: "",
//     mainCameraFeatures: "",
//     mainCameraVideo: "",
//     memoryCardSlot: "",
//     memoryInternal: "",
//     miscColors: "",
//     miscSar: "",
//     miscSareu: "",
//     miscModels: "",
//     miscPrice: "",
//     platformOs: "",
//     platformChipset: "",
//     platformCpu: "",
//     platformGpu: "",
//     selfieCameraModule: "",
//     selfieCameraVideo: "",
//     soundLoudspeaker: "",
//     sound35mmJack: "",
//     testPerformance: "",
//     testDisplay: "",
//     testLoudspeaker: "",
//     testBattery: ""
//   };

//   const handleShow = (device = null) => {
//     setEditDevice(device);
    
//     // Convert nested device object to flat structure if editing
//     const initialData = device ? {
//       name: device.name,
//       imageUrl: device.imageUrl,
//       networkTechnology: device.network?.technology,
//       launchAnnounced: device.launch?.announced,
//       launchStatus: device.launch?.status,
//       bodyDimension: device.body?.dimension,
//       bodyWeight: device.body?.weight,
//       bodyBuild: device.body?.build,
//       bodySim: device.body?.sim,
//       displayType: device.display?.type,
//       displaySize: device.display?.size,
//       displayResolution: device.display?.resolution,
//       communicationWlan: device.communication?.wlan,
//       communicationBluetooth: device.communication?.bluethooth,
//       communicationPositioning: device.communication?.positioning,
//       communicationNfc: device.communication?.nfc,
//       communicationInfraredPort: device.communication?.infraredPort,
//       communicationRadio: device.communication?.radio,
//       communicationUsd: device.communication?.usd,
//       batteryType: device.battery?.type,
//       batteryCharging: device.battery?.charging,
//       featureSensors: device.feature?.sensors,
//       mainCameraModules: device.mainCamera?.modules,
//       mainCameraFeatures: device.mainCamera?.features,
//       mainCameraVideo: device.mainCamera?.video,
//       memoryCardSlot: device.mainCamera?.cardSlot,
//       memoryInternal: device.mainCamera?.internal,
//       miscColors: device.misc?.colors,
//       miscSar: device.misc?.sar,
//       miscSareu: device.misc?.sareu,
//       miscModels: device.misc?.models,
//       miscPrice: device.misc?.price,
//       platformOs: device.platform?.os,
//       platformChipset: device.platform?.chipset,
//       platformCpu: device.platform?.cpu,
//       platformGpu: device.platform?.gpu,
//       selfieCameraModule: device.selfieCamera?.module,
//       selfieCameraVideo: device.selfieCamera?.video,
//       soundLoudspeaker: device.sound?.Loudspeaker,
//       sound_35mmJack: device.sound?._35mmJack,
//       testPerformance: device.test?.Performance,
//       testDisplay: device.test?.display,
//       testLoudspeaker: device.test?.loudspeaker,
//       testBattery: device.test?.battery
//       // ... flatten all other nested fields similarly
//     } : emptyDevice;
    
//     setFormData(initialData);
//     setShow(true);
//   };

//   const handleClose = () => {
//     setShow(false);
//     setSelectedFile(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const prepareFormData = () => {
//     const formDataToSend = new FormData();
    
//     // Append all fields
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== undefined && value !== null) {
//         formDataToSend.append(key, value);
//       }
//     });
    
//     // Append file if selected
//     if (selectedFile) {
//       formDataToSend.append("image", selectedFile);
//     }
    
//     return formDataToSend;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const formDataToSend = prepareFormData();
      
//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       if (editDevice) {
//         await API.put(`/update/${editDevice.id}`, formDataToSend, config);
//         setDevices(devices.map(d => d.id === editDevice.id ? {...d, ...formData} : d));
//       } else {
//         const response = await API.post("/Create", formDataToSend, config);
//         setDevices([...devices, response.data]);
//       }
      
//       handleClose();
//       Swal.fire({
//         title: "Success!",
//         text: `Device ${editDevice ? "updated" : "added"} successfully`,
//         icon: "success",
//         timer: 2000,
//         showConfirmButton: false
//       });
//     } catch (error) {
//       console.error("Error saving device:", error.response?.data || error.message);
//       Swal.fire({
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to save device",
//         icon: "error",
//       });
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#d33",
//         cancelButtonColor: "#3085d6",
//         confirmButtonText: "Yes, delete it!"
//       });

//       if (result.isConfirmed) {
//         await API.delete(`/delete/${id}`);
//         setDevices(devices.filter(device => device.id !== id));
//         Swal.fire("Deleted!", "The device has been deleted.", "success");
//       }
//     } catch (error) {
//       console.error("Error deleting device:", error);
//       Swal.fire("Error!", "Failed to delete device", "error");
//     }
//   };

//   const formatTableData = (data, subFields) => {
//     if (!data) return "-";
//     if (typeof data === "string") return data;
    
//     return subFields
//       .map(field => data[field] || "")
//       .filter(value => value)
//       .join(", ");
//   };

//   return (
//     <div>
//       <Navbar style={{ backgroundColor: "#53a2ff" }} expand="lg" className="px-3">
//         <Navbar.Brand href="#">
//           <img src={Logo} width="170" height="60" alt="Techmansion logo" />
//         </Navbar.Brand>
//         <Nav className="ms-auto d-flex align-items-center">
//           {admin.image && <img src={admin.image} alt="Admin" className="rounded-circle me-2" width="40" />}
//           <span className="text-white me-3">{admin.email}</span>
//           <Button variant="danger" onClick={() => {
//             localStorage.removeItem("adminEmail");
//             window.location.href = "/login";
//           }}>Logout</Button>
//         </Nav>
//       </Navbar>

//       <div className="container mt-5">
//         <h2>Admin Dashboard</h2>
//         <Button variant="primary" onClick={() => handleShow()} className="mb-3">
//           Add Device
//         </Button>
        
//         <div className="table-responsive">
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Image</th>
//                 <th>Network</th>
//                 <th>Launch</th>
//                 <th>Body</th>
//                 <th>Display</th>
//                 <th>Communication</th>
//                 <th>Battery</th>
//                 <th>Feature</th>
//                 <th>MainCamera</th>
//                 <th>Memory</th>
//                 <th>Misc</th>
//                 <th>Platform</th>
//                 <th>SelfieCamera</th>
//                 <th>Sound</th>
//                 <th>Test</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {devices.map((device) => (
//                 <tr key={device.id}>
//                   <td>{device.id}</td>
//                   <td>{device.name}</td>
//                   <td>
//                     {device.imageUrl ? (
//                       <Image src={device.imageUrl} alt={device.name} thumbnail width={60} height={60} />
//                     ) : (
//                       "No Image"
//                     )}
//                   </td>
//                   <td>{device.networkTechnology || "-"}</td>
//                   <td>{[device.launchAnnounced, device.launchStatus].filter(Boolean).join(", ") || "-"}</td>
//                   <td>{[device.bodyDimension, device.bodyWeight, device.bodyBuild, device.bodySim].filter(Boolean).join(", ") || "-"}</td>
//                   <td>{[device.displayType, device.displaySize, device.displayResolution].filter(Boolean).join(", ") || "-"}</td>
//                   <td>{[
//                     device.communicationWlan, 
//                     device.communicationBluetooth,
//                     device.communicationPositioning,
//                     device.communicationNfc,
//                     device.communicationInfraredPort,
//                     device.communicationRadio,
//                     device.communicationUsd
//                   ].filter(Boolean).join(", ") || "-"}</td>
//                   <td>{[device.batteryType, device.batteryCharging].filter(Boolean).join(", ") || "-"}</td>
//                   <td>{device.featureSensors || "-"}</td>
//                   <td>{[device.mainCameraModules, device.mainCameraFeatures, device.mainCameraVideo].filter(Boolean).join(", ") || "-"}</td>
//                   <td>{[device.memoryCardSlot, device.memoryInternal].filter(Boolean).join(", ") || "-"}</td>
//                   <td>{[
//                     device.miscColors, 
//                     device.miscSar,
//                     device.miscSareu,
//                     device.miscModels,
//                     device.miscPrice
//                   ].filter(Boolean).join(", ") || "-"}</td>
//                   <td>{[
//                     device.platformOs,
//                     device.platformChipset,
//                     device.platformCpu,
//                     device.platformGpu
//                   ].filter(Boolean).join(", ") || "-"}</td>
//                   <td>{[device.selfieCameraModule, device.selfieCameraVideo].filter(Boolean).join(", ") || "-"}</td>
//                   <td>{[device.soundLoudspeaker, device.sound35mmJack].filter(Boolean).join(", ") || "-"}</td>
//                   <td>{[
//                     device.testPerformance,
//                     device.testDisplay,
//                     device.testLoudspeaker,
//                     device.testBattery
//                   ].filter(Boolean).join(", ") || "-"}</td>
//                   <td>
//                     <Button 
//                       variant="warning" 
//                       size="sm" 
//                       onClick={() => handleShow(device)}
//                       className="me-2"
//                     >
//                       Edit
//                     </Button>
//                     <Button 
//                       variant="danger" 
//                       size="sm" 
//                       onClick={() => handleDelete(device.id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>

//         <Modal show={show} onHide={handleClose} size="xl" scrollable>
//           <Modal.Header closeButton>
//             <Modal.Title>{editDevice ? "Edit Device" : "Add New Device"}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={handleSubmit}>
//               <Row>
//                 <Col md={6}>
//                   <h5>Basic Information</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Device Name*</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="name" 
//                       value={formData.name || ""} 
//                       onChange={handleChange} 
//                       required 
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Image</Form.Label>
//                     <Form.Control 
//                       type="file" 
//                       onChange={handleFileChange}
//                       accept="image/*" 
//                     />
//                     {formData.imageUrl && (
//                       <div className="mt-2">
//                         <Image src={formData.imageUrl} thumbnail width={100} />
//                         <small>Current image</small>
//                       </div>
//                     )}
//                   </Form.Group>

//                   <h5 className="mt-4">Network</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Technology</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="networkTechnology" 
//                       value={formData.networkTechnology || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>

//                   <h5 className="mt-4">Launch</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Announced</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="launchAnnounced" 
//                       value={formData.launchAnnounced || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Status</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="launchStatus" 
//                       value={formData.launchStatus || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>

//                   <h5 className="mt-4">Body</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Dimensions</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="bodyDimension" 
//                       value={formData.bodyDimension || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Weight</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="bodyWeight" 
//                       value={formData.bodyWeight || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Build</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="bodyBuild" 
//                       value={formData.bodyBuild || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>SIM</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="bodySim" 
//                       value={formData.bodySim || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <h5>Display</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Type</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="displayType" 
//                       value={formData.displayType || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Size</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="displaySize" 
//                       value={formData.displaySize || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Resolution</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="displayResolution" 
//                       value={formData.displayResolution || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>

//                   <h5 className="mt-4">Platform</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>OS</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="platformOs" 
//                       value={formData.platformOs || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Chipset</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="platformChipset" 
//                       value={formData.platformChipset || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>CPU</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="platformCpu" 
//                       value={formData.platformCpu || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>GPU</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="platformGpu" 
//                       value={formData.platformGpu || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               {/* Additional sections for other fields */}
//               <Row className="mt-3">
//                 <Col md={6}>
//                   <h5>Memory</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Card Slot</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="memoryCardSlot" 
//                       value={formData.memoryCardSlot || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Internal</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="memoryInternal" 
//                       value={formData.memoryInternal || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>

//                   <h5 className="mt-4">Main Camera</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Modules</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="mainCameraModules" 
//                       value={formData.mainCameraModules || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Features</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="mainCameraFeatures" 
//                       value={formData.mainCameraFeatures || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Video</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="mainCameraVideo" 
//                       value={formData.mainCameraVideo || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <h5>Selfie Camera</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Module</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="selfieCameraModule" 
//                       value={formData.selfieCameraModule || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Video</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="selfieCameraVideo" 
//                       value={formData.selfieCameraVideo || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>

//                   <h5 className="mt-4">Sound</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Loudspeaker</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="soundLoudspeaker" 
//                       value={formData.soundLoudspeaker || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>3.5mm Jack</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="sound35mmJack" 
//                       value={formData.sound35mmJack || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mt-3">
//                 <Col md={6}>
//                   <h5>Communication</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>WLAN</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="communicationWlan" 
//                       value={formData.communicationWlan || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Bluetooth</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="communicationBluetooth" 
//                       value={formData.communicationBluetooth || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Positioning</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="communicationPositioning" 
//                       value={formData.communicationPositioning || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>NFC</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="communicationNfc" 
//                       value={formData.communicationNfc || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Infrared Port</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="communicationInfraredPort" 
//                       value={formData.communicationInfraredPort || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Radio</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="communicationRadio" 
//                       value={formData.communicationRadio || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>USB</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="communicationUsd" 
//                       value={formData.communicationUsd || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                   <h5>Battery</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Type</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="batteryType" 
//                       value={formData.batteryType || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Charging</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="batteryCharging" 
//                       value={formData.batteryCharging || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>

//                   <h5 className="mt-4">Features</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Sensors</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="featureSensors" 
//                       value={formData.featureSensors || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>

//                   <h5 className="mt-4">Miscellaneous</h5>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Colors</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="miscColors" 
//                       value={formData.miscColors || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>SAR</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="miscSar" 
//                       value={formData.miscSar || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>SAR EU</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="miscSareu" 
//                       value={formData.miscSareu || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Models</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="miscModels" 
//                       value={formData.miscModels || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Price</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="miscPrice" 
//                       value={formData.miscPrice || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <h5 className="mt-4">Tests</h5>
//               <Row>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Performance</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="testPerformance" 
//                       value={formData.testPerformance || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Display</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="testDisplay" 
//                       value={formData.testDisplay || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Loudspeaker</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="testLoudspeaker" 
//                       value={formData.testLoudspeaker || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Battery Life</Form.Label>
//                     <Form.Control 
//                       type="text" 
//                       name="testBattery" 
//                       value={formData.testBattery || ""} 
//                       onChange={handleChange} 
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <div className="d-flex justify-content-end mt-4">
//                 <Button variant="secondary" onClick={handleClose} className="me-2">
//                   Cancel
//                 </Button>
//                 <Button variant="primary" type="submit">
//                   {editDevice ? "Update Device" : "Add Device"}
//                 </Button>
//               </div>
//             </Form>
//           </Modal.Body>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
