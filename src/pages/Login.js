import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../Context';
import { useNavigate } from 'react-router';
import Register from './Register.js';
import './pages.css';


//Boostrap Components
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Login() {
  const { username, setUsername, password, setPassword, activeUser, setActiveUser } = useContext(AppContext);

  let navigate = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();
      fetch('http://localhost:8080/login', {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then((res) => res.json())
      .then(data => {return fetch(`http://localhost:8080/users/${username}`)})
      .then((res) => res.json())
      .then(data => setActiveUser(data[0]))
      .then(data => console.log(activeUser))
      .then(() => navigate(`/dashboard/${username}`))
      .catch((err) => console.log('error from fetch'))
    }

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }


    return (
      <Container>
          <Form className="align-items-center" onSubmit={handleSubmit} >
            <h1>Please Login</h1>
            <Row className="w-50" className="align-items-center" >
              <Col >
              <Form.Group className="mb-3" controlId="username">
                <Form.Control
                  autoFocus
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" />
                </Form.Group>
              </Col>
            </Row>
            <Row xs="auto" className="mx-auto mb-2"><Button variant="primary" type="submit" disabled={!validateForm()}>Login</Button></Row>
            <Row xs="auto" className="mx-auto"><Button href="/register" variant="secondary">Register</Button></Row>
          </Form>
      </Container>
    )
}
