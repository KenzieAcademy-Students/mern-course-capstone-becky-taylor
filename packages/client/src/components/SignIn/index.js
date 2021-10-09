import React from "react";
import { useState } from "react";
import BongoLogoSignInPillow from "./images/bongoLogoSignInPillow.jpg";
import { Form, Image, Card, Button, Col, Container } from "react-bootstrap"

function SignIn({ closeModal }) {
  return (
    <div className="App">
        <Container>
          <Button onClick={() => closeModal(false)}>X</Button>
            <Col>
            <Image src={BongoLogoSignInPillow} rounded />
            </Col>

      <div className="login">
      <h1>Login</h1>
      <Card>
        <Form.Control type="text" placeholder="email. . ." />

        <Form.Control  type="password" placeholder="password. . ." />
        <Button>Login</Button>
        </Card>
      </div>
        </Container>
    </div>
  );
}

export default SignIn;
