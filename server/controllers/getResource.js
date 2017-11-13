const keyKeeper = require('../keyKeeper');
const devMode = keyKeeper.devMode;
const BUCKET_NAME = devMode ? 'thin-persist-dev' : 'thin-persist';
const S3 = require('../AWS').S3;

function getS3(formattedRequest) {
	return BUCKET_NAME;
}

module.exports = {
	url:'/get-resource',
	method:'get',
	handler: getS3
}