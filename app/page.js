"use client";

import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    const url = "http://localhost/attendance-api/users.php";
    const jsonData = { username: username, password: password };

    var response = await axios.get(url, {
      params: { json: JSON.stringify(jsonData), operation: "login" }
    });

    if (response.data.length > 0) {
      let params = new URLSearchParams();
      params.append('fullname', response.data[0].usr_fullname);
      params.append('userId', response.data[0].usr_id);
      router.push(`/main?${params}`);
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Overlay to blur the background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(8px)', 
          zIndex: 1, 
        }}
      ></div>

      <Row className="w-100" style={{ zIndex: 2 }}>
        <Col md={6} lg={4} className="mx-auto">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Admin Login</h2>
              <Form>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="formUsername">
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" onClick={login} className="w-100">
                  Login
                </Button>
                <div className="text-center mt-3">
                  Haven't Account <Link href={'./register'}>Register</Link>
                </div>
                {/* <div className="text-center mt-3">
                  <Link href={'./admin/login'}>Admin Login</Link>
                </div> */}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
