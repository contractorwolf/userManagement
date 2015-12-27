/**
 * AWS Module: Action: Modularized Code
 */

var AWS = require("aws-sdk");
var dynamodbDoc = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

const tableName = process.env.TABLE_NAME + "-" + process.env.JAWS_STAGE;

// Export for Lambda Handler
module.exports.run = function(event, context, cb) {
  	try {
	    action(event.username,cb);
	} catch (error) {
		cb("Caught: " + error);
	}
};


// Your code
var action = function(username,cb) {
	var params = {
    	TableName: tableName
	};


	var response = dynamodbDoc.scan(params, function(err, data) {
	  	if (err) {
	    	cb("Error in query: " + err);
	  	} else {
	    	cb(null,data);
	  	}
	});
};


