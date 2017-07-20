const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {
		res.writeHead(200, { 'Content-Type': 'text/plain' });

		const config = JSON.parse(process.env.APP_CONFIG);
		const MongoClient = require('mongodb').MongoClient;
		const mongoPassword = 'your_password_here';

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
