var path = require("path");

/*
 * GET home page.
 */
module.exports.home = function (request, result) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
};
