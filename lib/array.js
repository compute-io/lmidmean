'use strict';

// FUNCTIONS //

var ascending = require( './ascending.js' );

//  LMIDMEAN //

/**
* FUNCTION: lmidmean( arr[, sorted] )
*   Computes the interquartile mean of the values below the median in a numeric array (lower midmean).
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Boolean} [sorted=false] - boolean flag indicating if the input array is sorted in ascending order
* @returns {Number|Null} lmidmean or null
*/
function lmidmean( arr, sorted ) {
	var len = arr.length,
		low,
		high,
		delta,
		mean = 0,
		N = 0,
		i;

	if ( len < 6 ) {
		return null;
	}

	if ( !sorted ) {
		arr = Array.prototype.slice.call( arr );
		// Borrow prototype method as typed arrays do not have sort
		Array.prototype.sort.call( arr, ascending );
	}

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
	for ( i = low; i <= high; i++ ) {
		N += 1;
		delta = arr[ i ] - mean;
		mean += delta / N;
	}
	return mean;

} // end FUNCTION lmidmean()


// EXPORTS //

module.exports = lmidmean;
