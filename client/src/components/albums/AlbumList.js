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
      <div>
        <SearchBar changeSearch={this.getAlbums}></SearchBar>
        <div style={{ width: '60%' }}>
          {this.state.listOfAlbums.map(album => {
            return (
              <div>
                <h4>Album Name:</h4>{album.name}
                <h4>Release Date:</h4>{album.release_date}
                <h4>Total Tracks:</h4>{album.total_tracks}
                <p><img width="200px" src={album.images[0] ? album.images[0].url : "https://images.app.goo.gl/DNbVmWNmwLvop7Lr6"} alt="" /></p>



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