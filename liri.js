//write the code you need to grab the data from keys.js.
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var keys = require("./keys.js");
var spotify = require("spotify");
var inquirer = require("inquirer");

var movieName = "";

///WORKING     GET USER INPUT///

var inquirer = require('inquirer');
inquirer.prompt([{
    type: "list",
    message: "Welcome to LIRI!. Choose an option below to get started.",
    choices: ["Twitter - use this to get the most recent 20 tweets", "Spotify - Search Spotify for your song", "OMDB - Retrieve info about your movie"],
    name: "choice"
  }

]).then(function(choice) {
  if (choice.choice == "Twitter - use this to get the most recent 20 tweets") {
    twitter();

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
function twitter() {
  var client = new Twitter(keys.twitterKeys);

  var params = {
    screen_name: 'jf2862'
  };
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {

      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  })
};
// var request = require("request");
// var movieName = input.movieName;
// if (movieName == "") {
//   movieName = "Mr. Nobody";

function spotifyThisSong() {
  inquirer.prompt([{
    type: "input",
    message: "Type in a song name:",
    name: "songName"
  }]).then(function(input) {
    spotify.search({
      type: 'track',
      query: 'songName'
    }, function(err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }
      console.log(data);
      //     }

      var getArtist = function(artist){
      return artist.name;
    };

      //     var getSpotify = function() {
      //       if (songName === undefined) {
      //         songName = "What's my name again?";
      //       }
    })
  })
};
//       var params = {
//         type: "input",
//         query: songName,
//         limit: 20
//
//         } else {
//
//           for (var i = 0; i < data.tracks.items.length; i++) {
//             console.log(
//               "Artist: " + data.tracks.items[i].artists[0].name +
//               "Album Name: " + data.tracks.items[i].album.name +
//               "Song Name: " + data.tracks.items[i].name +
//               "Preview link for song: " + data.tracks.items[i].preview_url
//             );
//           };
//         };
//
//       });
//     };
//   });
// };

///  WORKING  MOVIE SEARCH ON OMDB
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
// pseudocode

//spotify and twitter integration with existing OMDB
// for spottify, grab title of song provided: return data including artist, album, song name and preview link
//default to "the sign"
// for twitter, return last 20 tweets from user
// define do-what-it-says
//use fs node package - will take what is inside random txt file and should run ...
//return spotify for "I want it that way"

//issue is difficulty integrating all three API's
