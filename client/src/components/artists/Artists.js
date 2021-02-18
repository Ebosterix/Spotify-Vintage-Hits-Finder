import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from '../SearchBar';






class Artists extends Component {
  constructor() {
    super();
    this.state = { listOfArtists: [] };
  }
  getArtists = (artistsName) => {
    axios.get("/api/find-artists/" + artistsName)
      .then(responseFromApi => {
        console.log(responseFromApi.data.body.artists.items);
        this.setState({
          listOfArtists: responseFromApi.data.body.artists.items
        })
      })
  }


  render() {
    return (
      <div>
        <SearchBar changeSearch={this.getArtists} buttonTitle="search artists"></SearchBar>
        <div style={{ width: '60%', float: "left" }}>
          {this.state.listOfArtists.map(artists => {
            console.log(artists.images)
            return (
              <div>
                <h4> Artist Name:</h4>{artists.name}
                <p><img src={artists.images[0] ? artists.images[0].url : "https://images.app.goo.gl/DNbVmWNmwLvop7Lr6"} alt="" /></p>
              </div>
            )
          })
          }
        </div>

      </div>
    )
  }
}

export default Artists;