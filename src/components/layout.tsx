import React, { ReactNode } from "react";
import { Navbar, Nav, NavDropdown, Image, Container } from "react-bootstrap";
import LogoColor from "../images/logo-color.png";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar
        bg="light"
        expand="lg"
        style={{ padding: ".75rem 1rem .75rem 1rem" }}
      >
        {/* Left-aligned logo */}
        <Navbar.Brand href="#home" style={{ maxWidth: "200px" }}>
          <img src={LogoColor} alt="logo color five three designs" />
        </Navbar.Brand>

        {/* Right-aligned links */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {children}

      <footer>
        <p>© {new Date().getFullYear()} FiveThree Designs</p>
      </footer>
    </div>
  );
};

export default Layout;
