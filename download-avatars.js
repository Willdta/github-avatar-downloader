var request = require('request');
var token = require('./secrets');
var fs = require('fs');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

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
    cb(err, body);
	});
}

function sortAvatars(err, body) {
	
	var parsed = JSON.parse(body);

	for (item of parsed) {
		downloadImageByURL(item.avatar_url, './avatars/' + item.login + ' .jpg');
	}
}

function downloadImageByURL(url, filePath) {
	
	request(url)
		.on('error', () => {
			throw err;
		})
	
		.on('response', (response) => {
		
			console.log('Status Code: ', response.statusCode)
	
		})
	
		.pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner, repoName, sortAvatars);