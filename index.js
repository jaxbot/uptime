var http = require("http");
var exec = require("child_process").exec;
var hangoutsBot = require("hangouts-bot");

var config = require("./config.json");
var sites = config.sites;

function test() {
	for (var i = 0; i < sites.length; i++) {
		http.get(sites[i].url, assert(sites[i])).on("error", failedSite(sites[i]));
	}
}

function failedSite(site) {
	return (function() {
		failed(site);
	});
}

function assert(site) {
	return (function(res) {
		var data = "";

		if (res.statusCode != 200)
			return failed(site);

		res.on("data", function(chunk) {
			data += chunk.toString();
		});
		res.on("end", function() {
			if (data.indexOf(site.contents) === -1) {
				failed(site);
			}
		});
	});
}

function failed(site) {
	console.log("Failed: " + site.url);

	var bot = new hangoutsBot(config.hangouts.username, config.hangouts.password);

	bot.on('online', function() {
		bot.sendMessage(config.to, "Site is down: " + site.url);
	});
}

test();
setInterval(test, 30000);

