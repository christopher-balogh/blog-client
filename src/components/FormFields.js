import React from 'react'


//Boostrap Components
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function FormFields() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Row className="w-50" className="align-items-center">
        <Col xs="auto"><Button href="/" variant="secondary">Cancel</Button></Col>
        <Col xs="auto"><Button variant="primary" type="submit">Save</Button></Col>
      </Row>
    </Form>
  )
}
