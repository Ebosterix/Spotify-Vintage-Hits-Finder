import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar';




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
        <SearchBar changeSearch={this.getArtistTopTracks} buttonTitle="Top Tracks"></SearchBar>
        <div style={{ width: '60%', float: "left" }}>
          {this.state.listOfTracks.map(track => {
            return (
              <div>
                <h4>Track Name:</h4>{track.name}
                <h4> Artist:</h4>{track.artists.map(artist =>
                  <div>
                    <p>{artist.name}</p>
                  </div>
                )}
                <p><img src={track.album.images[0] ? track.album.images[0].url : "https://images.app.goo.gl/DNbVmWNmwLvop7Lr6"} alt="" /></p>


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