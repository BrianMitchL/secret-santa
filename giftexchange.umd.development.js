(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.GiftExchange = {}));
}(this, (function (exports) { 'use strict';

  function shuffle(array) {
    var i = array.length;
    var j;

    while (i !== 0) {
      j = Math.floor(Math.random() * i);
      i -= 1;
      var swap = array[i];
      array[i] = array[j];
      array[j] = swap;
    }

    return array;
  }

  function validateMatches(a, b, exclusions) {
    if (exclusions === void 0) {
      exclusions = [];
    }

    if (a.length !== b.length) return false; // pA - person a, pB - person b

    return a.every(function (pA, i) {
      var pB = b[i]; // skip matches that are the same name

      if (pA.name === pB.name) return false; // skip matches that are in the same group, if groups are defined

      if ((pA.group || pB.group) && pA.group === pB.group) return false;
      return exclusions // filter to exclusions of subjects that match pA
      .filter(function (exclusion) {
        return pA[exclusion.type] === exclusion.subject;
      }) // reject pB if they have an excludedType of excludedValue
      .every(function (exclusion) {
        return pB[exclusion.excludedType] !== exclusion.excludedSubject;
      });
    });
  }
  function calculate(people, exclusionsOrOptions) {
    if (people.length < 2) {
      return people.slice(0);
    }

    var exclusions;
    var timeout = 1000;

    if (Array.isArray(exclusionsOrOptions)) {
      exclusions = exclusionsOrOptions;
    } else {
      var _exclusionsOrOptions$, _exclusionsOrOptions$2;

      exclusions = (_exclusionsOrOptions$ = exclusionsOrOptions == null ? void 0 : exclusionsOrOptions.exclusions) != null ? _exclusionsOrOptions$ : [];
      timeout = (_exclusionsOrOptions$2 = exclusionsOrOptions == null ? void 0 : exclusionsOrOptions.timeout) != null ? _exclusionsOrOptions$2 : 1000;
    }

    var buffer1 = [];
    var buffer2 = []; // https://www.youtube.com/watch?v=5kC5k5QBqcc

    var shuffleAndSlide = function shuffleAndSlide() {
      var shuffled = shuffle([].concat(people));
      buffer1 = shuffled.slice(0);
      buffer2 = shuffled.slice(0); // slide each element over by one on buffer2

      buffer2.push(buffer2.shift());
    };

    var startTime = Date.now();

    var testDerangement = function testDerangement() {
      // prevent infinite loops when no combination is found
      if (Date.now() - startTime > timeout) {
        var error = new Error('No combinations found');
        error.name = 'GiftExchangeError';
        throw error;
      }

      return validateMatches.apply(void 0, arguments);
    };

    shuffleAndSlide();

    while (!testDerangement(buffer1, buffer2, exclusions)) {
      shuffleAndSlide();
    } // map back to the order of the given person argument


    return people.map(function (p) {
      var personIndex = buffer1.findIndex(function (match) {
        return match.name === p.name;
      });
      return buffer2[personIndex];
    });
  }

  exports.calculate = calculate;
  exports.validateMatches = validateMatches;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=giftexchange.umd.development.js.map
