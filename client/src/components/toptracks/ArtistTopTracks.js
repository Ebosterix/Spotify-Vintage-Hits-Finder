import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from '../Search/SearchBar';




class ArtistTopTracks extends Component {
  constructor() {
    super();
    this.state = { listOfTracks: [] };
  }

  getArtistTopTracks = (trackName) => {
    axios.get("/api/find-getArtistTopTracks/" + trackName)
      .then(responseFromApi => {
        console.log(responseFromApi.data.body.tracks);
        this.setState({
          listOfTracks: responseFromApi.data.body.tracks
        })
      })
  }


  render() {
    return (
      <div>
        <SearchBar changeSearch={this.getArtistTopTracks}></SearchBar>
        <div style={{ width: '60%', float: "left" }}>
          {this.state.listOfTracks.map(track => {
            return (
              <div>
                <h4>Track Name:</h4>{track.name}
                <h4> Artist:</h4>{track.artists.map(artist =>
                  <p>{artist.name}</p>
                )}

              </div>
            )
          })
          }
        </div>

      </div>
    )
  }
}

export default ArtistTopTracks;