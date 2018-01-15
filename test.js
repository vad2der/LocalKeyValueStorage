#!/usr/bin/env node

'use strict';

let test = require('./unit_test.js');

let arg1 = process.argv[2];

if (arg1){
	if(arg1 == "storage"){
		if(process.argv[3] == "default"){
			test.setStorage("default");
		}else if(process.argv[3] == "test"){
			test.setStorage("test");
		}else if(process.argv[3] == "reset"){
			test.resetTestStorage();
		}
	}else if(arg1 == "checkAdding"){
		test.checkAdding();
	}else if(arg1 == "checkListing"){
		test.checkListing();
	}else if(arg1 == "checkGetByKey"){
		test.checkFindbyKey();
	}else if(arg1 == "checkRemoveByKey"){
		test.checkRemoveByKey();
	}else if(arg1 == "?"){
		const info = "\r\nAvailable commands:\r\n\r\n"+
		"test storage test                 (switches to test_storage.json)\r\n"+
		"test storage default              (switches to storage.json)\r\n"+
		"test storage reset                (resets current storage)\r\n"+
		"test checkAdding                  (check adding)\r\n"+
		"test checkListing                 (check listing)\r\n"+
		"test checkFindbyKey               (check get by key)\r\n"+
		"test checkRemoveByKey             (check remove by key)\r\n"+
		"test ?                            (available commands)"
		console.log(info);
	}else{
		console.log("No action for the argument '"+arg1+"'. Try 'test ?' command");
	}
}