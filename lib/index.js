/**
*
*	COMPUTE: lmidmean
*
*
*	DESCRIPTION:
*		- Computes the interquartile mean of the values below the median for a numeric array (lower midmean).
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Rebekah Smith.
*
*
*	AUTHOR:
*		Rebekah Smith. rebekahjs17@gmail.com. 2014.
*
*/

'use strict';

// FUNCTIONS //

/**
* FUNCTION: ascending( a, b )
*	Comparator function used to sort values in ascending order.
*
* @private
* @param {Number} a
* @param {Number} b
* @returns {Number} difference between `a` and `b`
*/
function ascending( a, b ) {
	return a - b;
} // end FUNCTION ascending()


// LOWER MIDMEAN //

/**
* FUNCTION: lmidmean( arr[, sorted] )
*	Computes the interquartile mean of the values below the median in a numeric array (lower midmean).
*
* @param {Array} arr - numeric array
* @param {Boolean} [sorted] - boolean flag indicating if the input array is sorted in ascending order
* @returns {Number} lower midmean
*/
function lmidmean( arr, sorted ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'lmidmean()::invalid input argument. Must provide an array.' );
	}
	if ( arguments.length > 1 && typeof sorted !== 'boolean' ) {
		throw new TypeError( 'lmidmean()::invalid input argument. Second argument must be a boolean.' );
	}
	if ( arr.length < 6 ) {
		throw new Error( 'lmidmean()::invalid input argument. Input array must have 6 or more elements.' );
	}
	if ( !sorted ) {
		arr = arr.slice();
		arr.sort( ascending );
	}
	var len = arr.length,
		mean = 0,
		N = 0,
		delta,
		low,
		high;

	// Quartiles sit between values
	if ( len%8 === 0 ) {
		low = len*0.125;
		high = len*0.375 - 1;
	}
	else {
		low = Math.ceil( len*0.125 );
		high = Math.floor( len*0.375 ) - 1;
	}

	// Compute an arithmetic mean...
	for ( var i = low; i <= high; i++ ) {
		N += 1;
		delta = arr[ i ] - mean;
		mean += delta / N;
	}

	return mean;
} // end FUNCTION lmidmean()


// EXPORTS //

module.exports = lmidmean;
