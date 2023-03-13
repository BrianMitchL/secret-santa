(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.GiftExchange = {}));
})(this, (function (exports) { 'use strict';

  function shuffle(array) {
      let i = array.length;
      let j;
      while (i !== 0) {
          j = Math.floor(Math.random() * i);
          i -= 1;
          const swap = array[i];
          array[i] = array[j];
          array[j] = swap;
      }
      return array;
  }
  function validateMatches(a, b, exclusions = []) {
      if (a.length !== b.length)
          return false;
      // pA - person a, pB - person b
      return a.every((pA, i) => {
          const pB = b[i];
          // skip matches that are the same name
          if (pA.name === pB.name)
              return false;
          // skip matches that are in the same group, if groups are defined
          if ((pA.group || pB.group) && pA.group === pB.group)
              return false;
          return (exclusions
              // filter to exclusions of subjects that match pA
              .filter((exclusion) => pA[exclusion.type] === exclusion.subject)
              // reject pB if they have an excludedType of excludedValue
              .every((exclusion) => pB[exclusion.excludedType] !== exclusion.excludedSubject));
      });
  }
  function calculate(people, exclusionsOrOptions) {
      var _a, _b;
      if (people.length < 2) {
          return people.slice(0);
      }
      let exclusions;
      let timeout = 1000;
      if (Array.isArray(exclusionsOrOptions)) {
          exclusions = exclusionsOrOptions;
      }
      else {
          exclusions = (_a = exclusionsOrOptions === null || exclusionsOrOptions === void 0 ? void 0 : exclusionsOrOptions.exclusions) !== null && _a !== void 0 ? _a : [];
          timeout = (_b = exclusionsOrOptions === null || exclusionsOrOptions === void 0 ? void 0 : exclusionsOrOptions.timeout) !== null && _b !== void 0 ? _b : 1000;
      }
      let buffer1 = [];
      let buffer2 = [];
      // https://www.youtube.com/watch?v=5kC5k5QBqcc
      const shuffleAndSlide = () => {
          const shuffled = shuffle(people.slice());
          buffer1 = shuffled.slice(0);
          buffer2 = shuffled.slice(0);
          // slide each element over by one on buffer2.
          // we check the people array before this, and are mutating buffers for
          // performance, so it is safe to use a non-null assertion here.
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          buffer2.push(buffer2.shift());
      };
      const startTime = Date.now();
      const testDerangement = (...args) => {
          // prevent infinite loops when no combination is found
          if (Date.now() - startTime > timeout) {
              const error = new Error("No combinations found");
              error.name = "GiftExchangeError";
              throw error;
          }
          return validateMatches(...args);
      };
      shuffleAndSlide();
      while (!testDerangement(buffer1, buffer2, exclusions)) {
          shuffleAndSlide();
      }
      // map back to the order of the given person argument
      return people.map((p) => {
          const personIndex = buffer1.findIndex((match) => match.name === p.name);
          return buffer2[personIndex];
      });
  }

  exports.calculate = calculate;
  exports.validateMatches = validateMatches;

}));
//# sourceMappingURL=giftexchange.umd.development.js.map
