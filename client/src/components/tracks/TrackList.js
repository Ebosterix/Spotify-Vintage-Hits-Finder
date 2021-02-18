import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar';




class TrackList extends Component {
  constructor() {
    super();
    this.state = { listOfTracks: [] };
  }

  getAllTracks = (trackName) => {
    axios.get("/api/find-tracks/" + trackName)
      .then(responseFromApi => {
        console.log(responseFromApi.data.body.tracks.items);
        this.setState({
          listOfTracks: responseFromApi.data.body.tracks.items
        })
      })
  }


  render() {
    return (
      <div>
        <SearchBar changeSearch={this.getAllTracks} buttonTitle="search track"></SearchBar>
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

export default TrackList;