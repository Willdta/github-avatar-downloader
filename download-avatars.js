var request = require('request');
var token = require('./secrets');
var fs = require('fs');

//Passed as arguments in Node
var repoOwner = process.argv[2];
var repoName = process.argv[3];

//Welcome Message
console.log('Welcome to the GitHub Avatar Downloader!');

//Get repoOwner/Name and pass a callback to tell function what to do
function getRepoContributors(repoOwner, repoName, cb) {

	//If both parameters don't exist, stop the call
	if (!repoOwner || !repoName) {
		console.log('Please enter both keys!');
		return;
	}

	//What we are working with
  var options = {
    
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };

  //Request
  request(options, (err, res, body) => {
    
    //If there's an error, throw an error
    if (err) {
    	throw err;
    }
		
		cb(err, body);
	});
}

//Sort object to display avatar urls
function sortAvatars(err, body) {
	
	//Parse string to object
	var parsed = JSON.parse(body);

	//Loop through each avatar url
	for (item of parsed) {
		
		//Call function
		downloadImageByURL(item.avatar_url, './avatars/' + item.login + ' .jpg');
	}
}

//Download the image
function downloadImageByURL(url, filePath) {
	

	request(url)
		
		.on('error', () => {
			
			throw err;
		})
	
		.on('response', (response) => {
			
			//Lets us know whether request was successful
			console.log('Status Code: ', response.statusCode)
		})
		
		//Tell it where to go
		.pipe(fs.createWriteStream(filePath));
}

//Call function to execute
getRepoContributors(repoOwner, repoName, sortAvatars);