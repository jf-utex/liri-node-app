//write the code you need to grab the data from keys.js.
var fs = require("fs");
var request = require("request");
var twitter = require("twitter");
var keys = require("./keys.js");
var spotify = require("spotify");
var inquirer = require("inquirer");

var movieName = "";

///GET USER INPUT///

// var inquirer = require('inquirer');
inquirer.prompt([{
    type: "list",
    message: "Welcome to LIRI!. Choose an option below to get started.",
    choices: ["Twitter - use this to get the most recent 20 tweets", "Spotify - Search Spotify for your song", "OMDB - Retrieve info about your movie"],
    name: "choice"
  }

]).then(function(choice) {
  if (choice.choice == "Twitter - use this to get the most recent 20 tweets") {
    myTweets();

  } else if (choice.choice == "Spotify - Search Spotify for your song") {
    spotifyThisSong();

  } else if (choice.choice == "OMDB - Retrieve info about your movie") {
    movieThis();

    // } else {
    //   doWhatItSays();
    // }
  }
});

///TWITTER SEARCH///
//
// function myTweets() {
// inquirer.prompt([{
//   type: "input",
//   message: "Please enter a Twitter user.",
//   name: "twitUser"
//
// }]).then(function(input){
// var keys = require("./keys.js");
//   consumer_key: 'keys.twitterKeys.consumer_key',
//   consumer_secret: 'keys.twitterKeys.consumer_secret',
//   access_token_key: 'keys.twitterKeys.access_token_key',
//   access_token_secret: 'keys.twitterKeys.access_token_secret';
//
// }
//
//   });
//
//   var params = {
//     screen_name: 'nodejs'
//   };
//   client.get('statuses/user_timeline', params, function(error, tweets, response) {
//     if (!error) {
//       for (i = 0; i < tweets.length; i++) {
//         console.log(i);
//       }
//       console.log(tweets);
//     }
//   });


///MOVIE SEARCH ON OMDB
function movieThis() {
  inquirer.prompt([{
    type: "input",
    message: "Please provide a movie title.",
    name: "movieName"
  }]).then(function(input) {
    var request = require("request");
    var movieName = input.movieName;
    if (movieName == "") {
      movieName = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short=true&apikey=40e9cece";
    // console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

      // If the request is successful
      if (!error && response.statusCode === 200) {

        // Parse the body of the site and return useful information in JSON
        console.log("Movie Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Country: " + JSON.parse(body).Country);
        // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
        console.log("Language: " + JSON.parse(body).Language);

      }
    });
  });
};

///SPOTIFY



function spotifyThisSong() {
  inquirer.prompt([{
    type: "input",
    message: "Great! Type in a song name:",
    name: "songName"
  }]).then(function(input) {
    var spotify = require("spotify");
    var songName = input.songName;
    if (songName == "") {
      songName = "The Sign";
    }
    var params = {
      type: "track",
      query: songName,
      limit: "20"
    };
    var dataArr = data.split(",");
    spotify.search(params, function(err, data) {
      if (!err) {
        console.log(
          "Information for songs named " + songName);
        for (var i = 0; i < data.tracks.items.length; i++) {
          console.log(
            "Artist: " + data.tracks.items[i].artists[0].name +
            "Album Name: " + data.tracks.items[i].album.name +
            "Song Name: " + data.tracks.items[i].name +
            "Preview link for song: " + data.tracks.items[i].preview_url
          );
        }
      } else {
        console.log(err);

      }
    });
  });
}
