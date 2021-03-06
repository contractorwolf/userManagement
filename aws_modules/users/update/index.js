/**
 * AWS Module: CREATE RECORD
 */

var AWS = require("aws-sdk");
var dynamodbDoc = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

const tableName = process.env.TABLE_NAME + "-" + process.env.JAWS_STAGE;

// Export for Lambda Handler
module.exports.run = function(event, context, cb) {
	console.log("index.js - update: started with event: " + JSON.stringify(event));
  	try {
	    UpdateRecord(event,cb);
	} catch (error) {
		//catch action errors
		cb("Caught: " + error);
	}
};


// CRUD: update
var UpdateRecord = function(event,cb) {
	console.log("index.js - update: UpdateRecord() called");
	var params = {
    	TableName: tableName,
    	//below maps incoming data from the body of the request 
    	//to the object you are trying to store
    	Item: {
	        "username": event.username,
	        "userType": event.userType,
	        "edited": Date.now()
	    }
	};

	//log full dynamo object
	console.log("Data: %j", params);

	//attempt to store in db
	var response = dynamodbDoc.put(params, function(err, data) {
		console.log("index.js - show: put requested on " + tableName);
	  	if (err) {
	  		//log db storage errors
	    	cb("Error in putItem " + err);
	    	console.log("index.js - update: err: " + JSON.stringify(err));
	  	} else {
	  		//SUCCESS
	    	cb(null,"Successfully Updated: " + event.username);
	    	console.log("index.js - update: success: " + JSON.stringify(data));
	  	}
	});
};