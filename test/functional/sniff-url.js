// This file is part of pa11y.
// 
// pa11y is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// pa11y is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with pa11y.  If not, see <http://www.gnu.org/licenses/>.

/* jshint maxlen: false, maxstatements: false */
/* global before, describe, it */
'use strict';

var assert = require('proclaim');
var runPa11y = require('./helper/run-pa11y');

describe('pa11y http://localhost:4117/normal', function () {

	before(function (done) {
		var that = this;
		runPa11y('http://localhost:4117/normal', function (err, result) {
			that.result = result;
			done();
		});
	});

	it('should be successful', function () {
		assert.isNull(this.result.err);
	});

	it('should output the expected messages', function () {
		assert.match(this.result.stdout, /results \(3\)/i);
		assert.match(this.result.stdout, /check that the title element/i);
		assert.match(this.result.stdout, /alt text serves the same purpose/i);
	});

});

describe('pa11y http://localhost:4117/failing', function () {

	before(function (done) {
		var that = this;
		runPa11y('http://localhost:4117/failing', function (err, result) {
			that.result = result;
			done();
		});
	});

	it('should not be successful', function () {
		assert.isNotNull(this.result.err);
	});

	it('should output the expected messages', function () {
		assert.match(this.result.stdout, /results \(2\)/i);
		assert.match(this.result.stdout, /html element should have a lang/i);
	});

});

describe('pa11y http://localhost:4117/redirecting', function () {

	before(function (done) {
		var that = this;
		runPa11y('http://localhost:4117/redirecting', function (err, result) {
			that.result = result;
			done();
		});
	});

	it('should be successful', function () {
		assert.isNull(this.result.err);
	});

	it('should output the expected messages', function () {
		assert.match(this.result.stdout, /results \(3\)/i);
		assert.match(this.result.stdout, /check that the title element/i);
		assert.match(this.result.stdout, /alt text serves the same purpose/i);
	});

});

describe('pa11y http://localhost:12345678/this-had-better-not-be-a-real-url', function () {

	before(function (done) {
		var that = this;
		runPa11y('http://localhost:12345678/this-had-better-not-be-a-real-url', function (err, result) {
			that.result = result;
			done();
		});
	});

	it('should not be successful', function () {
		assert.isNotNull(this.result.err);
	});

	it('should output the expected error message', function () {
		assert.match(this.result.stderr, /url could not be loaded/i);
	});

});
