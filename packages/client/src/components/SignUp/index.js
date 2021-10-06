import React from "react";
import { useState } from "react";
import bongoAppLogo from "./images/bongoAppLogo.jpg";

import "./SignUp.css";
import {
  Container,
  Col,
  Row,
  Jumbotron,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";

function SignUp({ closeModal }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="modalBackground">
      <Container className="modalContainer">
        <Container className="title">
          <Row>
            <Col>
              <Image src={bongoAppLogo} rounded />
            </Col>
          </Row>
        </Container>

        <Jumbotron>
          <Button onClick={() => closeModal(false)} id="titleCloseBtn">
            X
          </Button>
        </Jumbotron>

        <Container>
          <Card>
            <Form onSubmit={handleSubmit} className="card-Container">
              <Form.Label className="form-label">name:</Form.Label>
              <Form.Control
                required
                type="name"
                value={name}
                placeholder="JohnDoe"
                onChange={(e) => setName(e.target.value)}
              />

              <Form.Label className="form-label">Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="johnDoe@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Form.Label className="form-label">Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="password123"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button id="sign-Btn">Sign Up</Button>
              <Button onClick={() => closeModal(false)} id="cncl-Btn">
                Cancel
              </Button>
            </Form>
          </Card>
        </Container>
      </Container>
    </div>
  );
}

export default SignUp;
