import React from "react";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import bongoLogo1 from "./bongoLogo1.jpg";
import "bootstrap/dist/css/bootstrap.min.css"
import "./navigationBar.css"


function NavigationBar() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="navbar-container">
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/">
                <Image src={bongoLogo1} alt="logo" width="150" className="imageLogo"/>
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#products">Products</Nav.Link>
              <Nav.Link href="#pricing">categories</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="User/:id"><p className="Link">Profile</p></Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                sign-in/sign-out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
