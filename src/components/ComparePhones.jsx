import React, { useState, useEffect } from "react";
import { Form, Row, Col, Card, Accordion } from "react-bootstrap";
import NavbarMenu from "./NavbarMenu";
import Galaxy from "../assets/Galaxy.jpg";
import Iphone16 from "../assets/Iphone16.jpg";

const phoneData = [
  {
    name: "Realme P3 Pro",
    image: Galaxy,
    specs: [
      { title: "📶 NETWORK", description: "Technology: GSM / HSPA / LTE / 5G" },
      { title: "📅 LAUNCH", description: "Announced: 2025, February 12" },
      { title: "📏 BODY", description: "Dimensions: 167.4 x 77.4 x 8 mm" },
      { title: "📱 DISPLAY", description: "Type: PLS LCD, 800 nits (HBM)" },
    ],
  },
  {
    name: "Apple iPhone 16e",
    image: Iphone16,
    specs: [
      { title: "📶 NETWORK", description: "Technology: GSM / HSPA / LTE / 5G" },
      { title: "📅 LAUNCH", description: "Announced: 2025, February 12" },
      { title: "📏 BODY", description: "Dimensions: 167.4 x 77.4 x 8 mm" },
      { title: "📱 DISPLAY", description: "Type: Super Retina OLED" },
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
