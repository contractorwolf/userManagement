/**
 * AWS Module: SHOW ALL
 */

var AWS = require("aws-sdk");
var dynamodbDoc = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

const tableName = process.env.TABLE_NAME + "-" + process.env.JAWS_STAGE;

// Export for Lambda Handler
module.exports.run = function(event, context, cb) {
	console.log("index.js - show: started")
  	try {
	    RetreiveRecords(cb);
	} catch (error) {
		cb("Caught: " + error);
	}
};




// CRUD: Retreive (all in this case)
var RetreiveRecords = function(cb) {
	var params = {
    	TableName: tableName
	};

	//log full dynamo object
	console.log("Data: %j",params);

	//make dynamo request
	var response = dynamodbDoc.scan(params, function(err, data) {
		console.log("index.js - show: scan requested on " + tableName);
	  	if (err) {
	  		//log db retieval errors
	    	cb("Error in query: " + err);
	    	console.log("index.js - show: error - " + err)
	  	} else {
	  		//SUCCESS
	    	cb(null,data.Items);
	    	console.log("index.js - show: data returned: " + JSON.stringify(data));
	  	}
	});
};


