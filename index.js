#!/usr/bin/env node

'use strict';

let fs = require('fs');

// getting storage name from store_config.json
let getStorageName =() =>{
	if(fs.existsSync('store_config.json')){		
		try{
			let output = fs.readFileSync('store_config.json').toString();
			let jsonOutput = JSON.parse(output);	
			return jsonOutput["currentStorage"];
		}catch(e){
			return 'storage.json';
		}
	}else{return 'storage.json';}
}

let storageName = getStorageName();

let saveToStorage = (object) => {
	fs.writeFile(storageName, JSON.stringify(object, null, 2), function(error){
		if(error){console.log(error);}
	});
}

let getAllEntries = () => {
	if(fs.existsSync(storageName)){		
		return JSON.parse(fs.readFileSync(storageName));
	}else{return {};}
}

let getEntryByKey = (key) => {
	let storage = getAllEntries();
	let entry = {};
	entry[key] = storage[key];	
	if(storage.hasOwnProperty(key)){
		return JSON.stringify(entry);
	}else{
		return "No such key, value pair in the storage";
	}
}

let removeEntryByKey = (key) => {
	let storage = getAllEntries();
	let entry = {};
	if(storage.hasOwnProperty(key)){
		entry[key] = storage[key];
		delete storage[key];
		saveToStorage(storage);
		return JSON.stringify(entry)+' is deleted';
	}else{
		return "No such key, value pair in the storage";
	}
}

let addEntry = (k, v) => {
	let entry = {};
	entry[k] = v;
	let storage = {};
	if(fs.existsSync(storageName)){
		storage = getAllEntries();		
	}
	storage[k] = v;	
	saveToStorage(storage);
	console.log('Entry '+JSON.stringify(entry)+' added to storage');
}

//action argument [add, list, get, remove, test]
let arg1 = process.argv[2];

if (arg1){
	if(arg1 == "add"){
		try{
			let k = process.argv[3];
			let v = process.argv[4];
			(k && v) ? addEntry(k, v) : console.log("format is 'storage add key value'");
		}catch(e){
			console.log(e);			
		}		
	}else if(arg1 == "list"){
		console.log(JSON.stringify(getAllEntries(), null, 2));
	}else if(arg1 == "get"){
		(process.argv[3]) ? console.log(getEntryByKey(process.argv[3])) : console.log("Enter the key to look for");
	}else if(arg1 == "remove"){
		(process.argv[3]) ? console.log(removeEntryByKey(process.argv[3])) : console.log("Enter the key for the entry to delete");
	}else if(arg1 == "?" || arg1 == "-h"){
		const info = "\r\nAvailable commands:\r\n\r\n"+
					"store list              (gives the the object with all entries)\r\n"+
					"store add key value     (adding to the store key, value pair)\r\n"+
					"store get key           (returns an entry with requiested key)\r\n"+
					"store remove key        (removes entry with requested key from the storage)\r\n"+
					"store ? <-h>            (available commands)"
		console.log(info);
	}else{
		console.log("No action for the argument '"+arg1+"'. Try 'store ?' command");
	}
}