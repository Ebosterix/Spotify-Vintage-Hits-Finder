
import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';

import TrackList from './components/tracks/TrackList';
import AlbumList from './components/albums/AlbumList';
import Artists from './components/artists/Artists';
import ArtistTopTracks from './components/toptracks/ArtistTopTracks';


import Signup from './components/Signup'
import Login from './components/Login'
import axios from 'axios';



class App extends Component {


  state = {
    currentUser: this.props.user.userDoc // this is coming from index.js from the request to /api/checkuser
  }

  updateCurrentUser = (userObjFromBackend) => {
    this.setState({
      currentUser: userObjFromBackend
    })
  }

  logoutHandler = () => {
    axios.post('/api/logout').then(() => {
      this.setState({
        currentUser: null
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="nav-style">
        <Link to="/"><img src="VlogoWhite.png" alt=""/></Link>
          <ul className="nav-items">
            <li><Link to="/tracks" style={{ textDecoration: 'none' }}>Track List</Link></li>
            <li><Link to="/albums" style={{ textDecoration: 'none' }}>Top Albums</Link></li>
            <li><Link to="/artists" style={{ textDecoration: 'none' }}>Top Artists</Link></li>
            <li><Link to="/toptracks" style={{ textDecoration: 'none' }}>Top Tracks</Link></li>
            <li><Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></li>

          </ul>
          {this.state.currentUser && <button onClick={this.logoutHandler}>Logout</button>}
        </nav>
        {/* ternary operator */}

        <Route exact path="/">

          <div className="signup">
            {this.state.currentUser ? <h1>Welcome {this.state.currentUser.username}</h1> : null}
            <label className="title"><h1>Vintage Hits Finder</h1></label>
            {!this.state.currentUser && <p><h4>Signup Here!</h4></p>}
            {!this.state.currentUser && <Signup></Signup>}</div>


        </Route>

        <Route exact path="/login">
          <div className="login">
          {!this.state.currentUser && <h1>Login</h1>}
          {!this.state.currentUser && <Login updateCurrentUser={this.updateCurrentUser}></Login>}
          </div>

        </Route>



        
        <Route exact path="/tracks" component={TrackList} />
        <Route exact path="/albums" component={AlbumList} />
        <Route exact path="/artists" component={Artists} />
        <Route exact path="/toptracks" component={ArtistTopTracks} />



      </div>
    );
  }
}

export default App;