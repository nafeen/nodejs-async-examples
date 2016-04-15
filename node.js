/*
*		NodeJS Async Series Example with Nested functions
*
*		- Nafeen
*
*		Note - install ASYNC NPM package using "npm install --save async"
*/

var async = require('async');

/* 	add all sequential functions to async.series
		
		DO NOT forget the callbacks without which, async.series 
		will fail with no apparent error
*/ 

async.series([
	// series 1
	function(callback) {

		// outer function
		function outerFunction() {
			console.log("Series 1 - Entered outer function after 2s delay");
			
			// setTimeout simulates costly functions like dbConnection
			setTimeout(nestedFunction, 5000);	// run nested function after 5s delay
		}

		// nested function
		function nestedFunction() {
			console.log("Series 1 - Entered nested function after 5s delay!");
			
			// callback should always be inside nested function
			callback(null, 'Callback after completing series 1');  
		}

		// setTimeout simulates costly functions like dbConnection
		setTimeout(function() {
				outerFunction(); // run outer function after 5s delay
			}, 2000);
	}, // end of series 1

	// series 2
	function(callback) {
		console.log("Series 2 - This runs only after all the functions in function 1 completes!");
		callback(null, 'Callback after completing series 2');
	}], // end of series 2 and all tasks

	// optional callback - this runs after all the series functions get completed
	function(err, results) {
		console.log(results);
	}
);