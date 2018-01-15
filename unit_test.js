'use strict';

let fs = require('fs');
let assert = require("assert")
let exec = require('child_process').exec;

let getConfig = () =>{
	return JSON.parse(fs.readFileSync('store_config.json'))
}

let saveConfig = (object) => {
	let output = JSON.stringify(object, null, 2);	;
	fs.writeFileSync('store_config.json', output);
}

let config;

module.exports = {
	setStorage: function(storage){
		config = getConfig();
		if(storage=="default"){
			config["currentStorage"] = config["defaultStorage"];
			console.log("Default storage set: "+config["currentStorage"]);
			saveConfig(config);
		}else if(storage=="test"){
			config["currentStorage"] = config["testStorage"];
			console.log("Test storage set: "+config["currentStorage"]);
			saveConfig(config);
		}
	},

	resetTestStorage: function(){
		exec("rm test_storage.json", function(error, stdout, stderr) {
		});
		exec("touch test_storage.json", function(error, stdout, stderr) {
		});
		console.log("test_storage.json is reset");
	},

	checkAdding: function(){
		exec("store add testKey1 testValue1", function(error, stdout, stderr) {
			assert.equal(stdout, 'Entry {"testKey1":"testValue1"} added to storage\n');
			assert.equal(stderr, "");
			assert.equal(JSON.parse(fs.readFileSync('test_storage.json')).hasOwnProperty("testKey1"), true);
			console.log("Adding check completed");
		});
	},

	checkListing: function(){
		exec("store list", function(error, stdout, stderr) {
			assert.equal(stdout, '{\n  "testKey1": "testValue1"\n}\n');
			assert.equal(stderr, "");
			console.log("Listing check completed");
		});
	},

	checkFindbyKey: function(){
		exec("store get testKey1", function(error, stdout, stderr) {
			assert.equal(stdout, '{"testKey1":"testValue1"}\n');
			assert.equal(stderr, "");
			console.log("Find-by-key check completed");
		});
	},

	checkRemoveByKey: function(){
		exec("store remove testKey1", function(error, stdout, stderr) {
			assert.equal(stdout, '{"testKey1":"testValue1"} is deleted\n');
			assert.equal(stderr, "");
			assert.equal(JSON.parse(fs.readFileSync('test_storage.json')).hasOwnProperty("testKey1"), false);
			console.log("Remove-by-key check completed");
		});
	}
}