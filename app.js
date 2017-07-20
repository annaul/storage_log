var http = require('http');
var server = http.createServer(function(req, res) {
		res.writeHead(200, { 'Content-Type': 'text/plain' });

		var config = JSON.parse(process.env.APP_CONFIG);
		var MongoClient = require('mongodb').MongoClient;
		var mongoPassword = 'your_password_here';

		MongoClient.connect(
			"mongodb://" + config.mongo.user + ":" + mongoPassword + "@" +
		config.mongo.hostString,
			function(err, db) {
						if(!err) {
								res.end("We are connected to MongoDB\n");
						} else {
								res.end("Error while connecting to MongoDB\n");
						}
		});
});
server.listen(process.env.PORT);
