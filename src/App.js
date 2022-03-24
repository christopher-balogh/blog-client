import './App.css';
import React, { useState, useContext } from 'react';
import { Routes, Route, Switch} from 'react-router-dom';
import { AppContext } from './Context';

//Component imports
import Navbar from './components/Navbar.js';
import useToken from './components/UseToken.js';

// import Footer from './components/footer.js'

//Pages import
import Home from './pages/Home.js';
import Login from './pages/Login';
import Register from './pages/Register';
import NewPost from './pages/NewPost';
import Dashboard from './pages/Dashboard';
import EditPost from './pages/EditPost';




function App() {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ activeUser, setActiveUser ] = useState([]);


  const provider = {username, setUsername, posts, setPosts, password, setPassword, activeUser, setActiveUser, userPosts, setUserPosts }

  return (
    <div className="App">
      <AppContext.Provider value={provider}>
        <Navbar />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={ <Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/new' element={<NewPost />} />
              <Route path='/dashboard/:username' element={<Dashboard />} />
              <Route path='/posts/edit/:id' element={<EditPost />} />
          </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
