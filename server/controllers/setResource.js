const S3 = require('../AWS').S3;

function setS3(formattedRequest, req) {
	const params = formattedRequest.parameters;
	if(!params) throw new Error('No "resource" parameter supplied');
	const object = params.resource;
	if(!object) throw new Error('No "resource" parameter supplied');

	return S3.streamObject(object, req);
}

module.exports = {
	url:'/set-resource',
	method:'post',
	handler: setS3,
	streamBody: true,
	headers: true
}