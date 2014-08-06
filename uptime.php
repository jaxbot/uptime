<?php
sleep(rand(0,220));

$uptime_big = file_get_contents("/home/jonathan/uptime/uptime.txt");

system("touch /home/jonathan/cronisworking");

$urls = explode("\n", $uptime_big);

foreach ($urls as $url) {
	if ($url == "") continue;
	$d = file_get_contents($url);
	if (!$d) {
//		system("/usr/local/bin/node /home/jonathan/uptime/warn.js");
	}
}
