const AWS = require('aws-sdk');
const keyKeeper = require('./keyKeeper');
const keys = keyKeeper.keys;

AWS.config.credentials = {
	accessKeyId:keys.awsClient,
	secretAccessKey: keys.awsSecret,
	region: "us-east-1"
};

const S3 = new AWS.S3({apiVersion: '2006-03-01'});

exports.AWS = AWS;
exports.S3 = S3;
