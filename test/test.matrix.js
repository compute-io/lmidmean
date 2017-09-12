/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	lmidmean = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix lmidmean', function tests() {

	var data,
		mat,
		mat2,
		i;

	data = new Int32Array( 81 );
	for ( i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}
	mat = matrix( data, [9,9], 'int8' );
	mat2 = mat.mget( null, [ 0, 1, 2, 3, 4, 5, 6, 7 ] );

	it( 'should export a function', function test() {
		expect( lmidmean ).to.be.a( 'function' );
	});

	it( 'should compute the lmidmean along matrix columns', function test() {
		var out, midm, expected;

		out = matrix( [9,1], 'float64' );

		midm = lmidmean( out, mat );
		expected = '2;11;20;29;38;47;56;65;74';

		assert.strictEqual( midm.toString(), expected );

		midm = lmidmean( out, mat, false, 2 );
		expected = '2;11;20;29;38;47;56;65;74';

		assert.strictEqual( midm.toString(), expected );
	});

	it( 'should compute the lmidmean along matrix columns with row length divisible by 8', function test() {
		var out, midm, expected;

		out = matrix( [8,1], 'float64' );

		midm = lmidmean( out, mat2 );
		expected = '1.5;10.5;19.5;28.5;37.5;46.5;55.5;64.5';

		assert.strictEqual( midm.toString(), expected );

		midm = lmidmean( out, mat2, false, 2 );
		expected = '1.5;10.5;19.5;28.5;37.5;46.5;55.5;64.5';

		assert.strictEqual( midm.toString(), expected );
	});

    it( 'should compute the lmidmean along matrix columns for already sorted rows', function test() {
        var out, midm, expected;

        out = matrix( [9,1], 'float64' );

		midm = lmidmean( out, mat, true );
        expected = '2;11;20;29;38;47;56;65;74';

        assert.strictEqual( midm.toString(), expected );

		midm = lmidmean( out, mat, true, 2 );
        expected = '2;11;20;29;38;47;56;65;74';

        assert.strictEqual( midm.toString(), expected );
    });

	it( 'should compute the lmidmean along matrix rows', function test() {
		var out, midm, expected;

		out = matrix( [1,9], 'float64' );

		midm = lmidmean( out, mat, false, 1 );
		expected = '18,19,20,21,22,23,24,25,26';

		assert.strictEqual( midm.toString(), expected );
	});

	it( 'should return null if provided a matrix having one or more zero dimensions', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( lmidmean( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( lmidmean( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( lmidmean( out, mat ) );
	});

	it( 'should return null if provided a matrix with less than three elements on dimension for which to calculate the lmidmean' , function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [ 2, 10 ] );
		assert.isNull( lmidmean( out, mat, false, 1 ) );

		mat = matrix( [ 10, 2 ] );
		assert.isNull( lmidmean( out, mat, false, 2 ) );

	});

});
