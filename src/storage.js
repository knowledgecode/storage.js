/**
 * @preserve storage.js v0.2.0 (c) 2012 knowledgecode | MIT licensed
 */
/*global escape, unescape */
/*jslint browser: true, plusplus: true */
(function () {
    'use strict';

    if (!window.sessionStorage) {
        var sessionStorage = {},
            cookie = [],
            cache = {};

        (function () {
            var cookies = document.cookie.split('; '),
                i = 0,
                j = 0,
                pairs;

            while (cookies[i]) {
                if (cookies[i].indexOf('sessionStorage=') === 0) {
                    cookie = cookies[i].split('=')[1].split(',');
                    while (cookie[j]) {
                        pairs = cookie[j++].split(':');
                        cache[pairs[0]] = pairs[1];
                    }
                    break;
                }
                i++;
            }
        }());

        /**
         * @name length
         * @property
         */
        sessionStorage.length = cookie.length;

        /**
         * @name key
         * @function
         * @param {Number} index
         * @return {String} key
         */
        sessionStorage.key = function (index) {
            return cookie.hasOwnProperty(index) ?
                    unescape(cookie[index].split(':')[0]) : null;
        };

        /**
         * @name getItem
         * @function
         * @param {string} key
         * @return {string} value
         */
        sessionStorage.getItem = function (key) {
            var ekey = escape(key);

            return cache.hasOwnProperty(ekey) ? unescape(cache[ekey]) : null;
        };

        /**
         * @name setItem
         * @function
         * @param {string} key
         * @param {string} value
         */
        sessionStorage.setItem = function (key, value) {
            var ekey = escape(key),
                evalue = escape(value),
                i = 0;

            if (cache.hasOwnProperty(ekey)) {
                while (cookie[i]) {
                    if (cookie[i].indexOf(ekey + ':') === 0) {
                        cookie[i] = ekey + ':' + evalue;
                        break;
                    }
                    i++;
                }
            } else {
                cookie.push(ekey + ':' + evalue);
                this.length++;
            }
            cache[ekey] = evalue;
            document.cookie = 'sessionStorage=' + cookie.join(',');
        };

        /**
         * @name removeItem
         * @function
         * @param {string} key
         */
        sessionStorage.removeItem = function (key) {
            var ekey = escape(key),
                i = 0;

            if (cache.hasOwnProperty(ekey)) {
                while (cookie[i]) {
                    if (cookie[i].indexOf(ekey + ':') === 0) {
                        cookie.splice(i, 1);
                        break;
                    }
                    i++;
                }
                delete cache[ekey];
                this.length--;
                document.cookie = 'sessionStorage=' + cookie.join(',');
            }
        };

        /**
         * @name clear
         * @function
         */
        sessionStorage.clear = function () {
            document.cookie =
                'sessionStorage=; expires=Thu, 01-Jan-1970 00:00:00 GMT';
            cookie = [];
            cache = {};
            this.length = 0;
        };

        window.sessionStorage = sessionStorage;
    }

}());
