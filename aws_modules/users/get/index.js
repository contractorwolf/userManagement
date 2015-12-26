/**
 * AWS Module: Action: Modularized Code
 */
// Export For Lambda Handler
module.exports.run = function(event, context, cb) {
  return cb(null, action(event));
}

// Your Code
var action = function(event) {
  const tableName = process.env.TABLE_NAME + "-" + process.env.JAWS_STAGE;

  return {
    message: "User requested: " + event.username,
    table: tableName
  };
};