/*global describe, it, expect */
/*jslint browser: true */
describe('storage', function () {
    'use strict';

    it('key', function () {
        sessionStorage.clear();
        sessionStorage.setItem('test1', 'item1');
        sessionStorage.setItem('test2', JSON.stringify(123));
        sessionStorage.setItem('test3', JSON.stringify([10, 20, 30]));

        expect(sessionStorage.key(2)).toEqual('test3');
        expect(sessionStorage.key(3)).toBeFalsy();
    });

    it('setItem', function () {
        sessionStorage.clear();
        sessionStorage.setItem('test1', 'item1');
        sessionStorage.setItem('test1', 'item2');
        sessionStorage.setItem('test2', JSON.stringify(123));
        sessionStorage.setItem('test2', JSON.stringify(456));
        sessionStorage.setItem('test3', JSON.stringify([10, 20, 30]));
        sessionStorage.setItem('test4', JSON.stringify({'item': 'value'}));

        expect(sessionStorage.length).toEqual(4);
    });

    it('getItem', function () {
        sessionStorage.clear();
        sessionStorage.setItem('test1', 'item1');
        sessionStorage.setItem('test1', 'item2');
        sessionStorage.setItem('test2', JSON.stringify(123));
        sessionStorage.setItem('test2', JSON.stringify(456));
        sessionStorage.setItem('test3', JSON.stringify([10, 20, 30]));
        sessionStorage.setItem('test4', JSON.stringify({'item': 'value'}));

        expect(sessionStorage.getItem('test1')).toEqual('item2');
        expect(JSON.parse(sessionStorage.getItem('test2'))).toEqual(456);
        expect(JSON.parse(sessionStorage.getItem('test3'))).toEqual([10, 20, 30]);
        expect(JSON.parse(sessionStorage.getItem('test4'))).toEqual({'item': 'value'});
        expect(JSON.parse(sessionStorage.getItem('test5'))).toBeFalsy();
    });

    it('removeItem', function () {
        sessionStorage.clear();
        sessionStorage.setItem('test1', 'item1');
        sessionStorage.setItem('test1', 'item2');
        sessionStorage.setItem('test2', JSON.stringify(123));
        sessionStorage.setItem('test2', JSON.stringify(456));
        sessionStorage.setItem('test3', JSON.stringify([10, 20, 30]));
        sessionStorage.setItem('test4', JSON.stringify({'item': 'value'}));
        sessionStorage.removeItem('test1');
        sessionStorage.removeItem('test1');
        sessionStorage.removeItem('test2');
        sessionStorage.removeItem('test2');

        expect(sessionStorage.length).toEqual(2);
    });

    it('clear', function () {
        sessionStorage.clear();
        sessionStorage.setItem('test1', 'item1');
        sessionStorage.setItem('test1', 'item2');
        sessionStorage.setItem('test2', JSON.stringify(123));
        sessionStorage.setItem('test2', JSON.stringify(456));
        sessionStorage.setItem('test3', JSON.stringify([10, 20, 30]));
        sessionStorage.setItem('test4', JSON.stringify({'item': 'value'}));
        sessionStorage.clear();

        expect(sessionStorage.length).toEqual(0);
    });

});
