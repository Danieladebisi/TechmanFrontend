import NavbarMenu from "./NavbarMenu";
import { useState } from "react";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";
import Galaxy from "../assets/Galaxy.jpg";
import MenuList from "../components/MenuList";



const phoneData = {
    "iPhone 15 Pro": {
    image: "https://example.com/iphone15pro.jpg",
    display: "6.1-inch OLED",
    processor: "A17 Bionic",
    ram: "8GB",
    storage: "128GB/256GB/512GB/1TB",
    battery: "3200mAh",
    camera: "48MP + 12MP + 12MP",
  },
  "Samsung Galaxy S23 Ultra": {
    image: "https://example.com/s23ultra.jpg",
    display: "6.8-inch AMOLED",
    processor: "Snapdragon 8 Gen 2",
    ram: "12GB",
    storage: "256GB/512GB/1TB",
    battery: "5000mAh",
    camera: "200MP + 12MP + 10MP + 10MP",
  },
  "Samsung Galaxy F06 5G": {
    image: "/mnt/data/image.png",
    display: "6.5-inch LCD",
    processor: "MediaTek Dimensity 700",
    ram: "6GB",
    storage: "128GB",
    battery: "5000mAh",
    camera: "50MP + 2MP",
  },
};

const Compare = () => {
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");

  return (
    <>
      <NavbarMenu />
      <Container className="mt-4">
        <h2>SamSung Galaxy A06</h2>
        <p style={{ color: "grey", fontSize: ".9em" }}>SPECIFICATIONS</p>
        <div className="card mb-3 p-2 border border-3 shadow-lg" style={{ maxWidth: "540px", background: "linear-gradient(135deg, rgba(117,235,171,0.9) 0%, rgba(117,235,171,0.7) 50%, rgba(117,235,171,0.9) 100%)" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={Galaxy}
                alt="Trendy Pants and Shoes"
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="25"
                    fill="currentColor"
                    className="bi bi-clipboard2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1z" />
                    <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                  </svg>
                  <span
                    className="m-2"
                    style={{ color: "black", fontSize: ".8em" }}
                  >
                    6.7" 720x1600 pixels
                  </span>
                  <br />
                </h5>
                <h5 className="card-text mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="25"
                    fill="currentColor"
                    className="bi bi-recycle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.5.5 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244z" />
                  </svg>
                  <span
                    className="m-2"
                    style={{ color: "black", fontSize: ".8em" }}
                  >
                    50MP 1080<sub>p</sub>
                  </span>
                  <br />
                  <br />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="25"
                    fill="currentColor"
                    className="bi bi-cpu"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0m-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
                  </svg>
                  <span
                    className="m-2"
                    style={{ color: "black", fontSize: ".8em" }}
                  >
                    4/6GB RAM Dimensity 6300
                  </span>
                  <br />
                  <br />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="25"
                    fill="currentColor"
                    className="bi bi-battery-full"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 6h10v4H2z" />
                    <path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8" />
                  </svg>
                  <span
                    className="m-2"
                    style={{ color: "black", fontSize: ".8em" }}
                  >
                    5000mAh{""}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-lightning-charge-fill"
                      viewBox="0 0 16 16"
                    > 
                      <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                    </svg>25
                  </span>
                  <p className="mx-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-graph-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"
                      />
                    </svg>
                    <span
                      className="m-2"
                      style={{ color: "black", fontSize: ".8em" }}
                    >
                      33% <br /> 55,568
                    </span>
                  </p>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <MenuList />

         {/* Specification Accordion */}
         <Accordion defaultActiveKey="0" className="mt-5">
          <Accordion.Item eventKey="0">
            <Accordion.Header>📶 NETWORK</Accordion.Header>
            <Accordion.Body>Technology: GSM / HSPA / LTE / 5G</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>📅 LAUNCH</Accordion.Header>
            <Accordion.Body>
              Announced: 2025, February 12 <br />
              Status: Coming soon (Expected release: February 20)
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>📏 BODY</Accordion.Header>
            <Accordion.Body>
              <strong>Dimensions:</strong> 167.4 x 77.4 x 8 mm <br />
              <strong>Weight:</strong> 191 g <br />
              <strong>Build:</strong> Glass front, plastic back, plastic frame <br />
              <strong>SIM:</strong> Nano-SIM + Nano-SIM
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>📱 DISPLAY</Accordion.Header>
            <Accordion.Body>
              <strong>Type:</strong> PLS LCD, 800 nits (HBM) <br />
              <strong>Size:</strong> 6.7 inches <br />
              <strong>Resolution:</strong> 720 x 1600 pixels
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>📷 MAIN CAMERA</Accordion.Header>
            <Accordion.Body>
              <strong>Modules:</strong> <br />
              - 50 MP, f/1.8, (wide), PDAF <br />
              - 2 MP, f/2.4, (depth) <br />
              <strong>Features:</strong> LED flash <br />
              <strong>Video:</strong> 1080p@30/60fps
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>🤳 SELFIE CAMERA</Accordion.Header>
            <Accordion.Body>
              <strong>Modules:</strong> 8 MP, f/2.0, (wide), 1/4.0", 1.12µm <br />
              <strong>Video:</strong> Yes
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>🔊 SOUND</Accordion.Header>
            <Accordion.Body>
              <strong>Loudspeaker:</strong> Yes <br />
              <strong>Loudspeaker:</strong> Yes
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>📡 COMMS</Accordion.Header>
            <Accordion.Body>
              <strong>WLAN:</strong> Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct <br />
              <strong>Bluetooth:</strong> 5.3, A2DP, LE <br />
              <strong>Positioning:</strong> GPS, GLONASS, GALILEO, BDS <br />
              <strong>NFC:</strong> No <br />
              <strong>Infrared Port:</strong> No <br />
              <strong>Radio:</strong> Unspecified <br />
              <strong>USB:</strong> USB Type-C 2.0, OTG
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="8">
            <Accordion.Header>🔋 BATTERY</Accordion.Header>
            <Accordion.Body>
              <strong>Type:</strong> Li-Ion 5000 mAh <br />
              <strong>Charging:</strong> 25W wired
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="9">
            <Accordion.Header>⚙ FEATURES</Accordion.Header>
            <Accordion.Body>
              <strong>Sensors:</strong> Fingerprint (side-mounted), accelerometer, proximity, compass
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="10">
            <Accordion.Header>🎨 MISC</Accordion.Header>
            <Accordion.Body>
              <strong>Colors:</strong> Bahama Blue, Lit Violet <br />
              <strong>SAR:</strong> 1.05 W/kg (head) <br />
              <strong>SAR EU:</strong> 1.30 W/kg (body), 1.30 W/kg (head) <br />
              <strong>Models:</strong> SM-E066B, SM-E066B/DS <br />
              <strong>Price:</strong> About 110 EUR
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <datalist id="phone-options">
          {Object.keys(phoneData).map((phone) => (
            <option key={phone} value={phone} />
          ))}
        </datalist>

        <Row>
          {[phone1, phone2].map((phone, index) =>
            phoneData[phone] ? (
              <Col md={6} key={index}>
                <Card className="p-3 mb-3 text-center">
                  <Card.Img
                    variant="top"
                    src={phoneData[phone].image}
                    alt={phone}
                    className="img-fluid"
                  />
                  <Card.Body>
                    <Card.Title>{phone}</Card.Title>
                    <Card.Text>
                      <strong>Display:</strong> {phoneData[phone].display}{" "}
                      <br />
                      <strong>Processor:</strong> {phoneData[phone].processor}{" "}
                      <br />
                      <strong>RAM:</strong> {phoneData[phone].ram} <br />
                      <strong>Storage:</strong> {phoneData[phone].storage}{" "}
                      <br />
                      <strong>Battery:</strong> {phoneData[phone].battery}{" "}
                      <br />
                      <strong>Camera:</strong> {phoneData[phone].camera}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ) : null
          )}
        </Row>
      </Container>
    </>
  );
};

export default Compare;
