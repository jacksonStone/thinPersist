const { getHandler } = require('./trafficControl')
const { format, verify } = require('./incomingRequests')

//This connects 
var router = function(req, res) {

	if(!verify(req)) {
		res.writeHead(401);
		return res.end('Hmm, try again?');
	}

	const formattedReq = format.initial(req);
	const handler = getHandler(formattedReq);
	if(!handler) {
		res.writeHead(404); 
		return res.end('Invalid Route');
	}

  return format.attachBody(req, formattedReq)
  	.then(() => {
  		return handler(formattedReq); 
  	})
  	.then(handlerRes => {
			console.log(handlerRes);
			if(typeof handlerRes === 'object') {
				handlerRes = JSON.stringify(handlerRes);
			}
			res.writeHead(200);
			res.write(handlerRes ||  "Ok");
			res.end();
		})
		.catch(err => {
			res.writeHead(400);
			res.end(err.message);
		});
}


module.exports = router;

