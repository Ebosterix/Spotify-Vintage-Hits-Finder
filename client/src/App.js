
import React, { Component } from 'react';
import './App.css';
import { Route, Link, Redirect } from 'react-router-dom';

import TrackList from './components/tracks/TrackList';
import AlbumList from './components/albums/AlbumList';
import Artists from './components/artists/Artists';
import ArtistTopTracks from './components/toptracks/ArtistTopTracks';


import Signup from './components/Signup'
import Login from './components/Login'
import axios from 'axios';



class App extends Component {


  state = {
    listOfShowcaseAlbums: [],
    currentUser: this.props.user.userDoc // this is coming from index.js from the request to /api/checkuser
  }

  componentDidMount() {
    let arr = ['Abba', 'Michael Jackson', 'UB40']
    let ranPos = Math.floor(Math.random() * arr.length)
    let randomArtistName = arr[ranPos]
    this.getShowcaseAlbums(randomArtistName)
  }

  updateCurrentUser = (userObjFromBackend) => {
    this.setState({
      currentUser: userObjFromBackend
    })
  }

  getShowcaseAlbums = (artistName) => {
    axios.get("/api/find-albums-by-artistname/" + artistName)
      .then(responseFromApi => {
        console.log(responseFromApi)
        this.setState({
          listOfShowcaseAlbums: responseFromApi.data.body.albums.items
        })
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
          <Link to="/"><img src="Vintage-logo1.png" alt="Vintage-logo.png" /></Link>
          <ul className="nav-items">

            {this.state.currentUser && <li><Link to="/tracks" style={{ textDecoration: 'none' }}>Track List</Link></li>}
            {this.state.currentUser && <li><Link to="/albums" style={{ textDecoration: 'none' }}>Top Albums</Link></li>}
            {this.state.currentUser && <li><Link to="/artists" style={{ textDecoration: 'none' }}>Top Artists</Link></li>}
            {this.state.currentUser && <li><Link to="/toptracks" style={{ textDecoration: 'none' }}>Top Tracks</Link></li>}
            {!this.state.currentUser && <li><Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></li>}

          </ul>
          {this.state.currentUser && <button onClick={this.logoutHandler}>Logout</button>}
        </nav>
        {/* ternary operator */}

        <Route exact path="/">

          <div className="signup">
            {this.state.currentUser ? <h1 className='welcome'>Welcome {this.state.currentUser.username}</h1> : null}
            <label className="title"><h1>Vintage Hits To Love</h1></label>
            {!this.state.currentUser && <p><h3>Signup Below!</h3></p>}
            {!this.state.currentUser && <Signup></Signup>}
          </div>

          <h1 className="showcasealbums">OUR CURRENT ALBUMS FAVOURITES</h1>
          {this.state.listOfShowcaseAlbums.map((album) => (
            <div className='albumWrapper'>
              <div style={{ width: "30%" }}>
              <h3>{album.name}</h3>
              <h3>{album.release_date}</h3>
                <h3>Total Tracks:  
                  {album.total_tracks}</h3>
                  
              

              
              </div>
              <p style={{ width: "30%" }}><img width="200px" src={album.images[0] ? album.images[0].url : "https://images.app.goo.gl/DNbVmWNmwLvop7Lr6"} alt="" /></p>

              <iframe style={{ width: "30%" }} src={"https://open.spotify.com/embed/album/" + album.id} width="250" height="200" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
          ))}


               
               



        </Route>

        <Route exact path="/login" component={Login}>
          <div className="login">
            {!this.state.currentUser && <h1>Login</h1>}
            {!this.state.currentUser && <Login updateCurrentUser={this.updateCurrentUser}></Login>}
          </div>

        </Route>




        <Route exact path="/tracks" render={() => {
          return this.state.currentUser
            ? <TrackList />
            : <Redirect to="/login"></Redirect>
        }} />
        <Route exact path="/albums" component={AlbumList} />
        <Route exact path="/artists" component={Artists} />
        <Route exact path="/toptracks" component={ArtistTopTracks} />



      </div>
    );
  }
}

export default App;