const { error } = require('console');
const tesseract = require('node-tesseract');
const { text } = require('express');
const fs = require("fs");
const path = require("path");
const { exit } = require('process');
let data = {content: ''}
// var options = {
// 	l: 'eng',
// 	psm: 3,
// 	binary: '/usr/bin/tesseract'
// };


function file_finder(location){
	const getMostRecentFile = (dir) => {
		const files = orderReccentFiles(dir);
		return files[0]['file'];
	  };
	  
	const orderReccentFiles = (dir) => {
		return fs.readdirSync(dir)
		  .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
		  .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
		  .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
	  };
	filename = getMostRecentFile(location);
	parser(filename, location)
}

function parser(filename, location){
    try{
        tesseract.process(location+filename,function(err, text){
            if(err) {
                console.error("Error Occurred");
            }    
            else{
                data.content = text;
            }
        })
    }
    catch(err){
        console.log("Error Occurred");
    }
} 

module.exports = {file_finder, data}