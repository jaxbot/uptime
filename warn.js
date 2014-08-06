var http = require("http");
var exec = require("child_process").exec;
var hangoutsBot = require("hangouts-bot");

var config = require("./config.json");
var bot = new hangoutsBot(config.hangouts.username, config.hangouts.password);

var msg = "Applepi generated a warning";

if (process.argv[2] == "test")
	msg = "Don't freak out. This is your weekly notification that Applepi is functioning properly.";

bot.on('online', function() {
	bot.sendMessage(config.to, msg);
	setTimeout(function() {
		process.exit();
	}, 60 * 1000);
});

