import React, {useState, useEffect, useContext} from 'react';
import { useParams } from "react-router-dom"
import { AppContext } from '../Context';
import { useNavigate } from 'react-router';

//Boostrap Components
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Dashboard() {
  const {username, setUsername, posts, setPosts, password, setPassword, activeUser, setActiveUser, userPosts, setUserPosts } = useContext(AppContext);


  useEffect(() => {
    fetch(`http://localhost:8080/posts/${activeUser.id}`)
        .then((res) => res.json())
        .then(json => setUserPosts(json))
        .catch((err) => console.log(err))
  }, []);

  let navigate = useNavigate();

  let handleClick = (e) => {
    e.preventDefault();
    navigate('/new');
  }



  let deletePost = (postID) => {
    fetch(`http://localhost:8080/posts/${postID}`, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      method: "DELETE"
    })
    .then((res) => res.json())
    .then(() => window.location.reload())
    .catch((err) => console.log('error from fetch'))
  }

  let handleDelete = (e) => {
    e.preventDefault();
    let postID = e.target.value;
    console.log(postID)
    // deletePos
    // navigate('/new');
  }

  const editPost = (postID) => {
    console.log(postID)
    navigate(`/posts/edit/${postID}`)
  }

  return(
    <Container>
    <h1>Welcome back {username}!</h1>
    <Button variant="primary" type="button" onClick={handleClick}>New Post</Button>
    {userPosts && userPosts.length === 0 ?
      <div> No posts </div> :
      <Stack gap={4} className="col-md-5 mx-auto">
            {userPosts.map(post => {
              let title = post.title;
              let content = post.content;
              let time = post.created_at.slice(0,10);
              return (
                <Card style={{ width: '30rem' }} className="text-center">
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{time}</Card.Subtitle>
                    <Card.Text>{content}</Card.Text>
                    {/* <Card.Link onClick={() => editPost(post.id)}>Edit Post</Card.Link> */}
                    <Row>
                      <Col>
                        <Button type="button" onClick={() => editPost(post.id)} variant="info">Edit Post</Button>
                      </Col>
                      <Col>
                        <Button type="button" variant="secondary">Delete Post</Button>
                      </Col>
                    </Row>
                    {/* <Card.Link onClick={handleDelete}>Delete Post</Card.Link> */}
                  </Card.Body>
                </Card>
                )
              })}
            </Stack>
      }
    </Container>
  );
}