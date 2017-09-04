//write the code you need to grab the data from keys.js.
var fs = require("fs");
var request = require("request");
var twitter = require("twitter");
var keys = require("./keys.js");
var spotify = require("spotify");

// the requested title of movie
var command = process.argv;

var movieName = "";
///TWITTER SEARCH
//
// function tweetie(user) {
//
//   var client = new twitter({
//     consumer_key: 'keys.twitterKeys.consumer_key',
//     consumer_secret: 'keys.twitterKeys.consumer_secret',
//     access_token_key: 'keys.twitterKeys.access_token_key',
//     access_token_secret: 'keys.twitterKeys.access_token_secret'
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

//3 because node is 0, filename is 1, command is 2 and title is 3
for (var i = 2; i < command.length; i++) {
  if (i > 2 && i < command.length) {
    movieName = movieName + "+" + command[i];
  } else {
    movieName += command[i];
  }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
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
  }
});

///SPOTIFY

spotify.search({
  type: 'track',
  query: 'dancing in the moonlight'
}, function(err, data) {
  if (err) {
    console.log('Error occurred: ' + err);
    return;
  }
  console.log("The song you chose is: " + data);
  return;

});
