
var Promise = require("bluebird")

function initial(req){
	let fullUrl = req.url;
	let url = fullUrl;
	let method = req.method.toLowerCase();
	let parameters = {};
	//Only use url parameters for a GET request!
	//Don't muddy the waters
	if(method === 'get') {
		let parsedURL = parseURL(url);
		url = parsedURL.url;
		parameters = parsedURL.parameters;
	}
	console.log({url, parameters, method});
	return {url, parameters, method};
}

function waitOnBody(request) {
	return new Promise((resolve, reject) => {
	  let body = [];
	  request.on('error', (err) => {
	    console.error(err);
	    reject(err);
	  }).on('data', (chunk) => {
	    body.push(chunk);
	  }).on('end', () => {
	  	if(!body.length) {
	  		resolve();
	  	}
	    try {
	    	body = JSON.parse(body);
	    	resolve(body);
	    } catch(e) {
	    	reject(new Error('Only JSON please'));
	    }
	  });
	})
}


function attachBody(req, formattedRequest) {
	return waitOnBody(req)
		.then(body => {
			formattedRequest.body = body;
		});
}

function parseURL(url) {
	const parameters = {};
	
	if(url.indexOf('?') === -1) return { parameters, url };

	const parts = getBeforeAndAfter(url, '?');
	const rootURL = parts[0]
	if(!parts[1]) return { parameters, url: rootURL };

	const queryParts = parts[1].split('&');

	for(let i in queryParts) {
		let part = queryParts[i];
		let keyAndValue = getBeforeAndAfter(part, '=');
		if(keyAndValue[0] && keyAndValue[1]) {
			parameters[keyAndValue[0]] = keyAndValue[1];
		}
	}

	return { parameters, url:rootURL };
}

function getBeforeAndAfter(str, target) {
	if(str.indexOf(target) === -1) return [str, ''];
	const post = str.substring(str.indexOf(target)+1);
	const pre = str.substring(0, str.indexOf(target));
	return [pre, post];
}



module.exports = { initial, attachBody };