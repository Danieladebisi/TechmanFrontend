import React, { useState, useEffect } from "react";
import { Form, Row, Col, Card, Accordion } from "react-bootstrap";
import NavbarMenu from "./NavbarMenu";
import Galaxy from "../assets/Galaxy.jpg";
import Iphone16 from "../assets/Iphone16.jpg";

const phoneData = [
  {
    name: "Samsung P3 Pro",
    image: Galaxy,
    specs: [
      { title: "📶 NETWORK", description: "Technology: GSM / HSPA / LTE / 5G" },
      { title: "📅 LAUNCH", description: "Announced: 2025, February 12" },
      { title: "📏 BODY", description: "Dimensions: 167.4 x 77.4 x 8 mm; " },
      { title: "📱 DISPLAY", description: "Type: PLS LCD, 800 nits (HBM)" },
      { title: "📷 MAIN CAMERA", description: "Modules: 50 MP, f/1.8, (wide), PDAF - 2 MP, f/2.4 (depth)" },
      { title: "🤳 SELFIE CAMERA", description: "Modules: 8 MP, f/2.0, (wide), 1/4.0, 1.12µm " },
      { title: "🔊 SOUND", description: "Loudspeaker: Yes, Vide: Yes" },
      { title: "📡 COMMS", description: "WLAN:  Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, Bluetooth: 5.3 A2DP LE", },
      { title: "🔋 BATTERY", description: "Type: Li-Ion 5000 mAhm, Charging: 25W wired ", },
      { title: "⚙ FEATURES", description: "Sensors: Fingerprint (side-mounted), accelerometer, proximity, compas", },
      { title: "🎨 MISC", description: "Colors:Bahama Blue, Lit Violet, SAR: 1.05 W/kg (head), SAR EU:  1.30 W/kg (body), 1.30 W/kg (head) ", },
    ],
  },
  {
    name: "Apple iPhone 16e",
    image: Iphone16,
    specs: [
      { title: "📶 NETWORK", description: "Technology: GSM / LTE/ HSPA / 5G" },
      { title: "📅 LAUNCH", description: "Announced: 2025, February 12" },
      { title: "📏 BODY", description: "Dimensions: 167.4 x 77.4 x 8 mm" },
      { title: "📱 DISPLAY", description: "Type: SPJD LCD, 3565 nits (HBM)" },
      { title: "📷 MAIN CAMERA", description: "Modules: 60 MP, f/4.8, (wide), PDAF - 5 MP, f/6.4 (depth)"  },
      { title: "🤳 SELFIE CAMERA", description: "Modules: 5 MP, f/1.0, (wide), 2/4.0, 1.12µm " },
      { title: "🔊 SOUND", description: "Loudspeaker: Yes, Video: Yes" },
      { 
        "title": "📡 COMMS",
        "description": "**WLAN:** Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct\n**Bluetooth:** 5.3 A2DP LE"
       },
       { title: "🔋 BATTERY", description: "Type: Li-Ion 4000 mAhm, Charging: 22W wired ", },
       { title: "⚙ FEATURES", description: "Sensors: Fingerprint (side-mounted), accelerometer, proximity, compas", },
       { title: "🎨 MISC", description: "Colors:Bahama Blue, Lit Violet, SAR: 1.05 W/kg (head), SAR EU:  1.30 W/kg (body), 1.30 W/kg (head) ", },
    ],
  },
];


const ComparePhones = () => {
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");

  const filteredPhone1 = phoneData.find((p) => p.name.toLowerCase().includes(phone1.toLowerCase()));
  const filteredPhone2 = phoneData.find((p) => p.name.toLowerCase().includes(phone2.toLowerCase()));

  return (
    <>
      <NavbarMenu />
      <div className="container mt-4">
        {/* Header */}
        <h2 className="text-bold">Compare</h2>
        <p className="text-muted">SPECIFICATIONS</p>

        {/* Search Inputs */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>COMPARE WITH</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>COMPARE WITH</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

          <div className="row border rounded shadow-sm p-4">
          {[filteredPhone1, filteredPhone2].map((phone, index) => (
            <div key={index} className="col text-center border-end">
              {phone ? (
                <>
                  <h2 className="h5 mb-2">{phone.name}</h2>
                  <img src={phone.image} alt={phone.name} className="img-fluid mb-2" />
                  <Accordion defaultActiveKey="0">
                    {phone.specs.map((spec, i) => (
                      <Accordion.Item key={i} eventKey={i.toString()}>
                        <Accordion.Header>{spec.title}</Accordion.Header>
                        <Accordion.Body>{spec.description}</Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </>
              ) : (
                <p>No phone found</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ComparePhones;
