import React, { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs"; // ✅ Corrected Import
import NavbarMenu from "./NavbarMenu";

const phonePictures = [
  { name: "Samsung Galaxy A06 5G", img: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a06-5g.jpg" },
  { name: "Samsung Galaxy A06", img: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a06.jpg" },
  { name: "Samsung Galaxy F05", img: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-f05.jpg" },
  { name: "Samsung Galaxy A16 5G", img: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a16-5g.jpg" },
  { name: "Motorola Moto G35", img: "https://fdn2.gsmarena.com/vv/pics/motorola/motorola-moto-g35.jpg" },
  { name: "Samsung Galaxy S25 Ultra", img: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra.jpg" },
  { name: "Samsung Galaxy F15", img: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-f15.jpg" },
  { name: "Samsung Galaxy M15", img: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-m15.jpg" },
  { name: "Samsung Galaxy M35", img: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-m35.jpg" },
  { name: "Motorola Moto G45", img: "https://fdn2.gsmarena.com/vv/pics/motorola/motorola-moto-g45.jpg" },
];

const Pictures = () => {
  const [showPictures, setShowPictures] = useState(false);

  return (
    <>
      <NavbarMenu />
      <div className="container mt-4">
        <Card className="shadow-sm mb-3">
          <Card.Header 
            onClick={() => setShowPictures(!showPictures)} 
            style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <span>📷 PICTURES</span>
            <BsChevronRight size={20} />
          </Card.Header>
          {showPictures && (
            <ListGroup variant="flush">
              {phonePictures.map((phone, index) => (
                <ListGroup.Item key={index} className="d-flex align-items-center">
                  <img src={phone.img} alt={phone.name} width="50" className="me-3" />
                  <span>{phone.name}</span>
                  <BsChevronRight className="ms-auto" />
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card>
      </div>
    </>
  );
};

export default Pictures;
