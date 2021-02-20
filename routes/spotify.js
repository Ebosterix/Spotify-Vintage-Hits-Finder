const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));


// /api/find-tracks
router.get('/find-tracks/:trackName', (req, res, next) => {
  spotifyApi
    .searchTracks('track:' + req.params.trackName)
    .then(data => {
      console.log('The received data from the API: ', data.body);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      res.json(data)
    })
});

router.get('/find-albums/:albumTitle', (req, res, next) => {
  spotifyApi
    .searchAlbums('year:1940-2015 album:' + req.params.albumTitle)
    .then(data => {
      console.log('The received data from the API: ', data.body);

      res.json(data)
    })
});

router.get('/find-albums-by-artistname/:artistname', (req, res, next) => {
  spotifyApi
    .searchAlbums('year:1940-2015 artist:' + req.params.artistname)
    .then(data => {
      console.log('The received data from the API: ', data.body);

      res.json(data)
    })
});


// /api/find-artist
router.get('/find-artists/:artistName', (req, res, next) => {
  spotifyApi
    .searchArtists('artist:' + req.params.artistName)
    .then(data => {
      console.log('The received data from the API: ', data.body);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      res.json(data)
    })
});



// Get artists Top Tracks

// http://localhost:5555/find-getArtistTopTracks/drake
router.get('/find-getArtistTopTracks/:artistName', (req, res, next) => {
  spotifyApi.searchArtists(req.params.artistName).then((data) => {
    console.log('The received first artist from the API: ', data.body.artists.items[0]);



    spotifyApi.getArtistTopTracks(data.body.artists.items[0].id, 'DE')
      .then(data => {
        console.log('The received top tracks from the API: ', data.body);
        // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
        res.json(data)
      })
  }
  )

});








module.exports = router;
