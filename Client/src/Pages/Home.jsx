import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaIndustry, FaBoxOpen, FaLeaf, FaPhone } from "react-icons/fa";
import Review from "./Review";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-success hero  text-white text-center py-5">
        <Container>
          <h1 className="display-4">Welcome to Shri Raja Coirs</h1>
          <p className="lead">Eco-friendly Coir Products for a Greener Tomorrow</p>
          <Button variant="light" href="/products">
            Explore Products
          </Button>
        </Container>
      </div>

      {/* About Section */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src="/images/coir-factory.jpg"
              alt="Coir Factory"
              className="img-fluid rounded shadow-sm"
            />
          </Col>
          <Col md={6}>
            <h2>About Us</h2>
            <p>
              Shri Raja Coirs is a leading manufacturer and exporter of high-quality
              coir products. With decades of experience, we combine tradition with
              modern techniques to bring sustainable solutions for homes, agriculture,
              and industries.
            </p>
            <Button variant="success" href="/about">Learn More</Button>
          </Col>
        </Row>
      </Container>

      {/* Products Overview */}
      <Container className="my-5 text-center">
        <h2 className="mb-4">Our Products</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <FaLeaf size={40} className="text-success mb-3" />
                <Card.Title>Coir Mats</Card.Title>
                <Card.Text>Durable and natural floor mats for all spaces.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <FaBoxOpen size={40} className="text-success mb-3" />
                <Card.Title>Coir Pith Blocks</Card.Title>
                <Card.Text>Ideal for horticulture, these blocks improve soil health.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <FaIndustry size={40} className="text-success mb-3" />
                <Card.Title>Twisted Coir Rope</Card.Title>
                <Card.Text>Used in agriculture, construction, and crafts.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button variant="success" href="/products">View All Products</Button>
      </Container>

      {/* Infrastructure Section */}
      <Container fluid className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2>State-of-the-Art Infrastructure</h2>
              <p>
                Equipped with the latest machinery and skilled workforce, our facilities
                ensure the highest quality standards in every product we deliver.
              </p>
              <Button variant="success" href="/infrastructure">Explore Infrastructure</Button>
            </Col>
            <Col md={6}>
              <img
                src="/images/infrastructure.jpg"
                alt="Infrastructure"
                className="img-fluid rounded shadow-sm"
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Review/>

      {/* Call to Action */}
      <Container className="text-center py-5">
        <h2>Interested in Our Products?</h2>
        <p>Contact us for pricing, bulk orders, or more details.</p>
        <Button variant="success" size="lg" href="/contact">
          <FaPhone className="me-2" /> Contact Us
        </Button>
      </Container>
    </>
  );
};

export default Home;
