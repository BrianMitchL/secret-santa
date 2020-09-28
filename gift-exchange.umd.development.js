(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.GiftExchange = {}));
}(this, (function (exports) { 'use strict';

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var shuffle = function shuffle(array) {
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
  };
  var DerangementError = /*#__PURE__*/function (_Error) {
    _inheritsLoose(DerangementError, _Error);

    function DerangementError() {
      var _this;

      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      _this = _Error.call.apply(_Error, [this].concat(params)) || this;
      Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof DerangementError ? this.constructor : void 0).prototype);
      _this.name = 'DerangementError';
      return _this;
    }

    return DerangementError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  var validateMatches = function validateMatches(a, b, exclusions) {
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
  };
  function derange(people, exclusionsOrOptions) {
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
      if (Date.now() - startTime > timeout) throw new DerangementError('No derangement found');
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
  /**
   * @deprecated
   * This is thread blocking, even when in wrapped in a Promise
   * A better non-blocking approach would be to wrap the call in a WebWorker
   */

  function calculate(people, exclusionsOrOptions) {
    return new Promise(function (resolve, reject) {
      try {
        resolve(derange(people, exclusionsOrOptions));
      } catch (e) {
        reject(e);
      }
    });
  }

  exports.DerangementError = DerangementError;
  exports.calculate = calculate;
  exports.calculateSync = derange;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gift-exchange.umd.development.js.map
