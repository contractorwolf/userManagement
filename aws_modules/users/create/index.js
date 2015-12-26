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
    	TableName: tableName,
    	Item:{
	        "username": username
	    }
	};

	console.log("Data: %j",params);
	var response = dynamodbDoc.put(params, function(err, data) {
	  	if (err) {
	    	cb("Error in putItem " + err);
	  	} else {
	    	cb(null,"Successfully Inserted: " + username);
	  	}
	});
};


/*


// Your code
var action = function(event) {
  	const tableName = process.env.TABLE_NAME + "-" + process.env.JAWS_STAGE;
  	var responseMessage = "";

	var params = {
	    TableName:table,
	    Item:{
	        "username": event.username
	    }
	};


	dynamodbDoc.put(params, function(err, data) {
	    if (err) {
	        responseMessage = "Unable to add item. Error JSON:" + JSON.stringify(err, null, 2);
	    } else {
	        responseMessage = "Added item:" + JSON.stringify(data, null, 2);
	    }
	});




  	return {
    	message: responseMessage,
    	table: tableName
  	};
};



***************************
var AWS = require("aws-sdk");
var dynamodbDoc = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

// Export for Lambda Handler
module.exports.run = function(event, context) {
  return action(event, context);
};

// Your code
var action = function(event,context) {
  	const tableName = process.env.TABLE_NAME + "-" + process.env.JAWS_STAGE;

  	try {
    	putItem = function(username,tableName) {
			var params = {
		    	TableName: tableName,
		    	Item:{
			        "username": event.username
			    }
			};

			console.log("Data: %j",params);
			var response = dynamodbDoc.put(params, function(err, data) {
			  	if (err) {
			    	context.fail("Error in putItem " + err);
			  	} else {
			    	context.succeed("Successfully Inserted");
			  	}
			});
		};

	    putItem(event.username,tableName);

	} catch (error) {
		context.fail("Caught: " + error);
	}

};
 */