var request = require('request');
var token = require('./secrets');
var fs = require('fs');

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

  request(options, (err, res, body) => {
    console.log('Status Code: ', res.statusCode)
		cb(err, body);
  });
}

function sortAvatars(err, body) {
	
	var parsed = JSON.parse(body);

	for (item of parsed) {
		console.log(item.avatar_url);
	}
}

function downloadImageByURL(url, filePath) {
	
	request.get(url, filePath)
	.on('error', () => {
		throw err;
	})
	.on('response', (response) => {
		console.log('Status Code: ', response.statusCode)
	})
	.pipe(fs.createWriteStream('./avatars.jpg'));
}

getRepoContributors('jquery', 'jquery', sortAvatars);

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")