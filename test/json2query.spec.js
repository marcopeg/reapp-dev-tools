
import {expect} from 'chai';
import { json2query } from '../src/utils/json2query';

describe('json2query', function() {
    it('should work with named colors', function() {
        var json = {
            COLOR: 'red',
        };
        var expectedQuery = '$COLOR:red;';
        expect(json2query(json)).to.equal(expectedQuery);
    });

    it('should work with hexadecimal colors', function() {
        var json = {
            COLOR: '#666',
        };
        var expectedQuery = '$COLOR:#666;';
        expect(json2query(json)).to.equal(expectedQuery);
    });

    it('should work with numbers', function() {
        var json = {
            SIZE: 123,
        };
        var expectedQuery = '$SIZE:123;';
        expect(json2query(json)).to.equal(expectedQuery);
    });

    it('should encode weird strings like urls', function() {
        var json = {
            SIZE: '/',
        };
        var expectedQuery = '$SIZE:"/";';
        expect(json2query(json)).to.equal(expectedQuery);
    });

    it('should skip functions', function() {
        var json = {
            foo: function() {},
        };
        var expectedQuery = '';
        expect(json2query(json)).to.equal(expectedQuery);
    });

    it('should skip objects', function() {
        var json = {
            foo: {},
        };
        var expectedQuery = '';
        expect(json2query(json)).to.equal(expectedQuery);
    });

    it('should skip arrays', function() {
        var json = {
            foo: [],
        };
        var expectedQuery = '';
        expect(json2query(json)).to.equal(expectedQuery);
    });
});
