/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

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

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
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
				lmidmean( value );
			};
		}
	});

	it( 'should throw an error if provided a dimension which is greater than 2 when provided a matrix', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				lmidmean( matrix( [2,2] ), {
					'dim': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				lmidmean( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should compute the lmidmean', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 2;

		assert.strictEqual( lmidmean( data ), expected );
	});

	it( 'should compute the lmidmean of a typed array', function test() {
		var data, expected;

		data = new Int8Array( [ 2, 4, 5, 3, 8, 2 ] );
		expected = 2;

		assert.strictEqual( lmidmean( data ), expected );
	});

	it( 'should compute the lmidmean using an accessor function', function test() {
		var data, expected, actual;
		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		expected = 2;
		actual = lmidmean( data, {
			'accessor': getValue
		});

		assert.strictEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the lmidmean along a matrix dimension', function test() {
		var expected,
			data,
			mat,
			mu,
			i;

		data = new Int8Array( 36 );
		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [6,6], 'int8' );

		// Default:
		mu = lmidmean( mat );
		expected = '1;7;13;19;25;31';

		assert.strictEqual( mu.toString(), expected, 'default' );

		// Along columns:
		mu = lmidmean( mat, {
			'dim': 2
		});
		expected = '1;7;13;19;25;31';

		assert.strictEqual( mu.toString(), expected, 'dim: 2' );

		// Along rows:
		mu = lmidmean( mat, {
			'dim': 1
		});
		expected = '6,7,8,9,10,11';

		assert.strictEqual( mu.toString(), expected, 'dim: 1' );
	});

	it( 'should compute the lmidmean of 1d matrices (vectors)', function test() {
		var data, mat;

		data = [ 2, 4, 5, 3, 8, 2 ];

		// Row vector:
		mat = matrix( data, [1,6], 'int8' );
		assert.strictEqual( lmidmean( mat ), 2 );

		// Column vector:
		mat = matrix( data, [6,1], 'int8' );
		assert.strictEqual( lmidmean( mat ), 2 );
	});

});
