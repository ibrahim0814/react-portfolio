import React from "react";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";

interface PropsProject {
  title: string;
  tags: string[];
  imageLinks: string[];
  description: string;
}

const Project = ({ title, tags, imageLinks, description }: PropsProject) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Title</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Tags</h2>
          <p>Tag1, Tag2, Tag3</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x400"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x400"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x400"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Description</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            consectetur, ligula quis vulputate tincidunt, purus erat pulvinar
            metus, id ornare tellus enim et turpis. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Links</h2>
          <Card>
            <Card.Body>
              <Card.Link href="#">Link 1</Card.Link>
              <Card.Link href="#">Link 2</Card.Link>
              <Card.Link href="#">Link 3</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
