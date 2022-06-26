import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";

// markup
const IndexPage = () => {
  return (
    <Container fluid>
      <IndexPageStyleWrapper>
        <div className="header">
          <div className="pictureStyles">
            <StaticImage
              src="../images/profile-picture.jpeg"
              alt="Ibrahim Ali's Headshot"
              style={{ borderRadius: "50%", width: "100px", height: "100px" }}
            />
          </div>

          <div>
            <h1>Ibrahim Ali</h1>
            <h3 className="subHeaderStyles">Software Engineer</h3>
          </div>
        </div>
        <div className="content">
          <div className="bioParagraph">
            <h3>About Me</h3>
            <p>
              Hey! My name is Ibrahim and I'm currently a software engineer at
              working at Microsoft. I craft intuitive, easy to use interfaces in
              React and JavaScript that garner tens of thousands of users per
              month. I'm also a fan of the open source community and I'm always
              looking to contribute wherever I can.
            </p>
          </div>

          <div className="linksSection">
            <div className="link github">
              <a
                href="https://github.com/ibrahim0814"
                target="_blank"
                rel="noopener"
              >
                {" "}
                GitHub
              </a>
            </div>

            <div className="link linkedin">
              <a
                href="https://www.linkedin.com/in/ibrahimamanali/"
                target="_blank"
                rel="noopener"
              >
                LinkedIn
              </a>
            </div>

            <div className="link resume">
              <a
                href="https://drive.google.com/file/d/11wqGCv9zw9Lxkgf6pUR3FfsM4d8pcNiS/view?usp=sharing"
                target="_blank"
                rel="noopener"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </IndexPageStyleWrapper>
    </Container>
  );
};

const IndexPageStyleWrapper = styled.div`
  padding: 10%;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .subHeaderStyles {
    margin-top: -0.7rem;
    color: gray;
  }

  .content {
    padding: 20px;
  }

  .bioParagraph {
    background-color: lightgrey;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 5px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 150;
  }

  .linksSection {
    padding-top: 5%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 10px;
  }

  .link {
    padding: 10px;
    text-align: center;
    border-radius: 10px;
  }

  .github {
    background-color: #00000078;
  }

  .linkedin {
    background-color: #0072b1;
  }

  .resume {
    background-color: purple;
  }

  a {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
`;

export default IndexPage;
