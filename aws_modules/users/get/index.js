/**
 * AWS Module: Action: Modularized Code
 */
var AWS = require("aws-sdk");
var dynamodbDoc = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

const tableName = process.env.TABLE_NAME + "-" + process.env.JAWS_STAGE;

// Export for Lambda Handler
module.exports.run = function(event, context, cb) {
	console.log("index.js - get: started");
  	try {
	    action(event, cb);
	} catch (error) {
		cb("Caught: " + error);
	}
};

// CRUD: Retreive (by id)
var action = function(event, cb) {
	console.log("index.js - action() called with event: " + JSON.stringify(event));
	var params = {
    	TableName: tableName,
	 	Key: { 
	    	username: event.username
	    },//** comma after required for formatting weirdness 
	};

	//log full dynamo object
	console.log("Data: %j",params);

	//make dynamo request
	var response = dynamodbDoc.get(params, function(err, data) {
		console.log("index.js - get: get requested on: " + tableName);
	  	if (err) {
	  		//log db retrieval errors
	    	cb("Error in query: " + err);
	    	console.log("index.js - get: error - " + err);
	  	} else {
	  		//SUCCESS!
	    	cb(null, data.Item);
	    	console.log("index.js - get: data returned: " + JSON.stringify(data.Item));
	  	}
	});
};