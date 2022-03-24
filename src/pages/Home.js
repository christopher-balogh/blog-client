import React, {useState, useEffect, useContext} from 'react';
import './pages.css';
import { AppContext } from '../Context';

//Components Import
// import DetailedCard from '../components/DetailedCard.js';
// import '../components/button.css';

//Pages Import
// import AboutMe from './AboutMe.js';?

//Boostrap Components
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


export default function Home (){
  // const [posts, setPosts] = useState([]);
  const {posts, setPosts} = useContext(AppContext);

  useEffect(() => {
    fetch('http://localhost:8080/posts')
        .then((res) => res.json())
        .then(json => setPosts(json))
        .catch((err) => console.log(err))
  }, []);

    return(
      <Container>
          <h1>Welcome to blogosphere.</h1>
          <Stack gap={4} className="col-md-5 mx-auto">
            {posts.map(post => {
              let title = post.title;
              let content = post.content;
              let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              let time = post.created_at.slice(0,10);
              return (
                <Card style={{ width: '30rem' }}>
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{time}</Card.Subtitle>
                    <Card.Text>{content}</Card.Text>
                    {/* <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
                  </Card.Body>
                </Card>
              )
            })}
          </Stack>
        </Container>
    )
};