const S3 = require('../AWS').S3;

function getS3(formattedRequest) {
	const params = formattedRequest.parameters;
	if(!params) throw new Error('No "resource" parameter supplied');
	const object = params.resource;
	if(!object) throw new Error('No "resource" parameter supplied');
	return S3.getObject(object).then(S3Obj => {
		const response = {};
		response.headers = {
			'Content-Length' : S3Obj.contentLength,
			'Content-Type' : S3Obj.contentType
		};
		response.body = S3Obj.body;
		return response;
	}).catch(e => {
		response.body = 'Not found';
		response.headers = {};
		return response;
	});
}

module.exports = {
	url:'/get-resource',
	method:'get',
	handler: getS3,
	headers: true
}