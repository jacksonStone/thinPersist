const AWS = require('aws-sdk');
const keyKeeper = require('./keyKeeper');
const Promise = require("bluebird");
const keys = keyKeeper.keys;
const devMode = keyKeeper.devMode;
const BUCKET_NAME = devMode ? 'thin-persist-dev' : 'thin-persist';

AWS.config.credentials = {
	accessKeyId:keys.awsClient,
	secretAccessKey: keys.awsSecret,
	region: "us-east-1"
};

const S3_SDK = new AWS.S3({apiVersion: '2006-03-01'});

const S3 = {
	getObject(objectName) {
		return new Promise((resolve, reject) => {
			S3_SDK.getObject({ Bucket: BUCKET_NAME, Key: objectName}, (err, data) => {
				if(err) {
					return reject(err);
				}
				return resolve({
					body: data.Body,
					contentLength: data.ContentLength,
					contentType: data.ContentType
				});
			})
		});
	},
	streamObject(objectName, req) {
		return new Promise((resolve, reject) => {
			S3_SDK.upload({ Bucket: BUCKET_NAME, Key: objectName, Body: req }, (err, data) => {
				if(err) {
					console.log(err);
					return reject(err);
				}
				return resolve(data);
			})
		});
	}
}

exports.AWS = AWS;
exports.S3 = S3;
