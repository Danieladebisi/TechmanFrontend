import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

function DeviceList() {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Mock API data
    setDevices([
      { id: 1, name: 'Samsung Galaxy S21', price: 800 },
      { id: 2, name: 'iPhone 13 Pro', price: 1200 },
      { id: 3, name: 'Google Pixel 6', price: 600 },
    ]);
  }, []);

  const filteredDevices = devices
    .filter(device => device.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Form.Group controlId="search">
            <Form.Label>Search Devices</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="sortOrder">
            <Form.Label>Sort By Price</Form.Label>
            <Form.Select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-4">
        {filteredDevices.map(device => (
          <Col md={4} key={device.id}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{device.name}</Card.Title>
                <Card.Text>Price: ${device.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DeviceList;
            
