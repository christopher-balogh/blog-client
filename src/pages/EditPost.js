import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../Context';
import { useNavigate, useParams } from 'react-router';
import './pages.css';

//Boostrap Components
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function EditPost (){
  const {activeUser, posts} = useContext(AppContext);
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // useEffect(() => {
  //   let index = id - 1;
  //   setTitle(posts[index].title)
  // }, []);

  let setup = () => {
    let index = id - 1;
    setTitle(posts[index].title)
  }

  let navigate = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();
      fetch('http://localhost:8080/posts', {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
        method: "POST",
        body: JSON.stringify({
          user_id: activeUser.id,
          title: title,
          content: content
        }),
      })
      .then((res) => res.json())
      .then(() => navigate(`/dashboard/${activeUser.username}`))
      .catch((err) => console.log('error from fetch'))
    }

    return(
      <>
        {setup}
        {console.log(id)}
          {!activeUser.id ?
          <div> You must be logged in to post. </div> :
            <Container>
              <h1>Whats on your mind?</h1>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" value={title} onChange={(e) => setTitle((e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={(e) => setContent((e.target.value))} />
                </Form.Group>
                <Row className="w-50" className="align-items-center">
                  <Col xs="auto"><Button href="/" variant="secondary">Cancel</Button></Col>
                  <Col xs="auto"><Button variant="primary" type="submit">Save</Button></Col>
                </Row>
              </Form>
            </Container>
          }
    </>
    )
};