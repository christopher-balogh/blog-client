import React from 'react';
import './pages.css';
import { useState } from 'react';

//Boostrap Components
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Register (){

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function validateForm() {
      return firstName.length > 0 && lastName.length > 0 && username.length > 0 && password.length > 0;
    }

    let handleSubmit = (e) => {
        e.preventDefault();
          fetch('http://localhost:8080/users', {
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             },
            method: "POST",
            body: JSON.stringify({
              first_name: firstName,
              last_name: lastName,
              username: username,
              password: password

            }),
          })
          .then((res) => res.json())
          .catch((err) => console.log('error from fetch'))
        }

    return(
      <Container>
        <Form className="align-items-center" action="/posts" onSubmit={handleSubmit}>
          <h1>Register Your Account</h1>
          <Row className="w-50" className="align-items-center">
          <Col >
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Control
                autofocus
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} />
              </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
            </Col>
          </Row>
          <Row xs="auto" className="mx-auto mb-2">
            <Button variant="primary" type="submit" disabled={!validateForm()}>Register</Button>
          </Row>
        </Form>
      </Container>

    )

};

