import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from '../SearchBar';






class AlbumList extends Component {
  constructor() {
    super();
    this.state = { listOfAlbums: [] };
  }

  getAlbums = (albumTitle) => {
    axios.get("/api/find-albums/" + albumTitle)
      .then(responseFromApi => {
        console.log(responseFromApi)
        this.setState({
          listOfAlbums: responseFromApi.data.body.albums.items
        })
      })
  }


  render() {
    return (
      <div className="albumSearch">
        <SearchBar changeSearch={this.getAlbums} buttonTitle="search album"></SearchBar>
        <div>
          {this.state.listOfAlbums.map(album => {
            return (
              <div className="cardWrapper">
                <div style={{ width: "30%" }}>
                  <h4>Album Name:</h4>{album.name}
                  <h4>Release Date:</h4>{album.release_date}
                  <h4>Total Tracks:</h4>{album.total_tracks}
                </div>
                <p style={{ width: "30%" }}><img width="200px" src={album.images[0] ? album.images[0].url : "https://images.app.goo.gl/DNbVmWNmwLvop7Lr6"} alt="" /></p>

                <iframe style={{ width: "30%" }} src={"https://open.spotify.com/embed/album/" + album.id} width="250" height="200" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

              </div>
            )
          })
          }
        </div>

      </div>
    )
  }
}

export default AlbumList;