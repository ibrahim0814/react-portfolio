import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import headshot from "../images/headshot.jpeg";

const HomePage = () => (
  <Container>
    <Row>
      {/* Left column: picture */}
      <Col xs={4}>
        <img src={headshot} alt="Girl in a jacket" />
      </Col>

      {/* Right column: description and links */}
      <Col xs={8}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <ul>
          <li>
            <a href="#">Link 1</a>
          </li>
          <li>
            <a href="#">Link 2</a>
          </li>
          <li>
            <a href="#">Link 3</a>
          </li>
        </ul>
      </Col>
    </Row>
  </Container>
);

export default HomePage;
