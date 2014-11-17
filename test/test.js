'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	lmidmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-lmidmean', function tests() {

	it( 'should export a function', function test() {
		expect( lmidmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				lmidmean( value, true );
			};
		}
	});

	it( 'should throw an error if provided a non-boolean for the second argument', function test() {
		var values = [
			'5',
			5,
			[],
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				lmidmean( [], value );
			};
		}
	});

	it( 'should throw an error if provided an array of insufficient length', function test() {
		var data = [ 2, 5, 7, 7, 1 ];

		function foo() {
			lmidmean( data );
		}		

		expect( foo ).to.throw( Error );

	});

	it( 'should compute the lmidmean when the array length divides by 8', function test() {
		var data, expected;

		data = [ 15, 9, 4, 12, 14, 8, 2, 5, 16, 1, 10, 3, 6, 7, 11, 13 ];
		expected = 4.5;

		// Unsorted test:
		assert.strictEqual( lmidmean( data ), expected );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a - b;
		});

		// Sorted test:
		assert.strictEqual( lmidmean( data, true ), expected );
	});

	it( 'should compute the lmidmean when the array length does not divide by 8', function test() {
		var data, expected;

		data = [ 9, 4, 12, 8, 2, 5, 1, 10, 3, 6, 7, 11 ];
		expected = 3.5;

		// Unsorted test:
		assert.strictEqual( lmidmean( data ), expected );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a - b;
		});

		// Sorted test:
		assert.strictEqual( lmidmean( data, true ), expected );
	});

});
