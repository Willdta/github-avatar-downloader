var request = require('request');
var token = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

console.log(token.GITHUB_TOKEN);

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    console.log('Status Code: ', res.statusCode)
		cb(err, body);
  });
}

getRepoContributors('jquery', 'jquery', sortAvatars);

function sortAvatars(err, body) {
	
	var parsed = JSON.parse(body);

	for (item of parsed) {
		console.log(item.avatar_url);
	}
}