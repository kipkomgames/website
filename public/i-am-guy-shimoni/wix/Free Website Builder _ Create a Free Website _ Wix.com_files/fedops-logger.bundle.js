(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("fedops-logger", [], factory);
	else if(typeof exports === 'object')
		exports["fedops-logger"] = factory();
	else
		root["fedops-logger"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	__webpack_require__.p = typeof window !== 'undefined' && window.__STATICS_BASE_URL__ || __webpack_require__.p;
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!************************************!*\
  !*** ./data-items/bi-base-item.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataItem = __webpack_require__(/*! ./data-item */ 1);

var _dataItem2 = _interopRequireDefault(_dataItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents bi events from the "fed monitoring" source:
 * http://bo.wix.com/bi-catalog-webapp/#/sources/72
 */
var BiBaseDataItem = function (_DataItem) {
  _inherits(BiBaseDataItem, _DataItem);

  function BiBaseDataItem(evid, sessionId) {
    _classCallCheck(this, BiBaseDataItem);

    return _possibleConstructorReturn(this, (BiBaseDataItem.__proto__ || Object.getPrototypeOf(BiBaseDataItem)).call(this, {
      src: 72,
      evid: evid,
      session_id: sessionId, // eslint-disable-line
      _: new Date().getTime() // cache buster
    }));
  }

  return BiBaseDataItem;
}(_dataItem2.default);

exports.default = BiBaseDataItem;

/***/ }),
/* 1 */
/*!*********************************!*\
  !*** ./data-items/data-item.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataItem = function () {
  function DataItem() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    _classCallCheck(this, DataItem);

    this.data = data;
  }

  _createClass(DataItem, [{
    key: 'isActive',
    value: function isActive() {
      return true;
    }
  }, {
    key: 'export',
    value: function _export() {
      return this.data;
    }
  }]);

  return DataItem;
}();

exports.default = DataItem;

/***/ }),
/* 2 */
/*!************************!*\
  !*** ./tools/tools.js ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Converts object to query string
 *
 * @param   {Object} data   a map to convert
 * @returns {String}        query string
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
function mapToQuery(data) {
  var res = [];

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      // eslint-disable-line
      res.push(key + '=' + encodeURIComponent(data[key]));
    }
  }

  return res.join('&');
}

/**
 * Generates a valid GUID
 *
 * @returns {String}  GUID
 */
function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : r & 0x3 | 0x8; // eslint-disable-line
    return v.toString(16);
  });
}

exports.default = {
  mapToQuery: mapToQuery,
  generateGuid: generateGuid
};

/***/ }),
/* 3 */
/*!************************!*\
  !*** ./base-logger.js ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dataSource = __webpack_require__(/*! ./data-source/data-source */ 15);

var _dataSource2 = _interopRequireDefault(_dataSource);

var _biAppVersionItem = __webpack_require__(/*! ./data-items/bi-app-version-item */ 16);

var _biAppVersionItem2 = _interopRequireDefault(_biAppVersionItem);

var _biLoadPhaseItem = __webpack_require__(/*! ./data-items/bi-load-phase-item */ 17);

var _biLoadPhaseItem2 = _interopRequireDefault(_biLoadPhaseItem);

var _durationItem = __webpack_require__(/*! ./data-items/duration-item */ 4);

var _durationItem2 = _interopRequireDefault(_durationItem);

var _biErrorItem = __webpack_require__(/*! ./data-items/bi-error-item */ 8);

var _biErrorItem2 = _interopRequireDefault(_biErrorItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base Logger
 *
 * Before adding new parameters to the reported events, please make sure the BI schema supports them:
 * http://bo.wix.com/bi-catalog-webapp/#/sources/72
 */
var BaseLogger = function () {
  function BaseLogger(appName, appVersion, reporter, _ref) {
    var sessionId = _ref.sessionId,
        errorHandlerToggle = _ref.errorHandlerToggle,
        disableAutoLoadFinish = _ref.disableAutoLoadFinish;

    _classCallCheck(this, BaseLogger);

    this.appName = appName;
    this.appVersion = appVersion;
    this.reporter = reporter;
    this.params = { sessionId: sessionId };
    this.errorHandlerToggle = errorHandlerToggle;
    this.disableAutoLoadFinish = disableAutoLoadFinish;

    this.dataSource = new _dataSource2.default({ appName: appName });

    if (errorHandlerToggle) {
      window.fedopsLoggerErrorHandler.subscribeListener(appName, this.reportError.bind(this));
    }
  }

  _createClass(BaseLogger, [{
    key: 'reportAppMetadata',
    value: function reportAppMetadata() {
      var dataSource = this.dataSource.clone().addItem({ v: this.appVersion }).addItem(new _biAppVersionItem2.default(this.sessionId));

      this._report(dataSource);
    }
  }, {
    key: 'reportError',
    value: function reportError(error, errorType, errorInfo) {
      var interactionName = void 0;

      if (!this._appLoadedCalled) {
        interactionName = '[APP LOAD]';
      } else {
        interactionName = Object.keys(this._outgoingInteractions)[0];
      }

      var dataSource = this.dataSource.clone().addItem({ interactionName: interactionName }).addItem({ errorType: errorType }).addItem({ errorInfo: errorInfo }).addItem(new _biErrorItem2.default(this.sessionId));

      // const stackTrace = error.stack;

      if (interactionName) {
        this._report(dataSource);
      }
    }
  }, {
    key: '_report',
    value: function _report(dataSource) {
      return this.reporter.report(dataSource.mergeItems());
    }
  }, {
    key: 'getAppName',
    value: function getAppName() {
      return this.appName;
    }
  }, {
    key: 'getAppVersion',
    value: function getAppVersion() {
      return this.appVersion;
    }
  }, {
    key: 'getReporter',
    value: function getReporter() {
      return this.reporter;
    }
  }, {
    key: 'getParam',
    value: function getParam(paramName) {
      return this.params[paramName];
    }
  }, {
    key: '_isDisableAutoLoadFinish',
    value: function _isDisableAutoLoadFinish() {
      return this.disableAutoLoadFinish;
    }
  }, {
    key: 'appLoadingPhase',


    /**
     * Custom phase (http://bo.wix.com/bi-catalog-webapp/#/sources/72/events/13)
     * Call this method to report custom phases during initial application load.
     *
     * @param {String} phaseName  phase name
     */
    value: function appLoadingPhase(phaseName) {
      var dataSource = this.dataSource.clone().addItem({ name: phaseName }).addItem(new _biLoadPhaseItem2.default(this.sessionId)).addItem(new _durationItem2.default());

      return this._report(dataSource);
    }
  }, {
    key: 'sessionId',
    get: function get() {
      return this.getParam('sessionId');
    }
  }]);

  return BaseLogger;
}();

exports.default = BaseLogger;

/***/ }),
/* 4 */
/*!*************************************!*\
  !*** ./data-items/duration-item.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _time = __webpack_require__(/*! ../time/time */ 5);

var _time2 = _interopRequireDefault(_time);

var _dataItem = __webpack_require__(/*! ./data-item */ 1);

var _dataItem2 = _interopRequireDefault(_dataItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DurationDataItem = function (_DataItem) {
  _inherits(DurationDataItem, _DataItem);

  function DurationDataItem(appName) {
    _classCallCheck(this, DurationDataItem);

    var _this = _possibleConstructorReturn(this, (DurationDataItem.__proto__ || Object.getPrototypeOf(DurationDataItem)).call(this, {
      duration: Math.floor(_time2.default.appLoadTime(appName))
    }));

    _this.appName = appName;
    return _this;
  }

  _createClass(DurationDataItem, [{
    key: 'setFirstRequestDuration',
    value: function setFirstRequestDuration() {
      this.data.frd = Math.floor(_time2.default.firstRequestDuration(this.appName));
      return this;
    }
  }]);

  return DurationDataItem;
}(_dataItem2.default);

exports.default = DurationDataItem;

/***/ }),
/* 5 */
/*!**********************!*\
  !*** ./time/time.js ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appData = __webpack_require__(/*! ../app-data/app-data */ 6);

var _appData2 = _interopRequireDefault(_appData);

var _performance = __webpack_require__(/*! ../performance/performance */ 7);

var _performance2 = _interopRequireDefault(_performance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startLoadTime(appName) {
  return _appData2.default.getStartLoadTime(appName) || 0;
}

function endLoadTime() {
  return _performance2.default.now();
}

/**
 * calculates the app load time
 */
exports.default = {
  appLoadTime: function appLoadTime(appName) {
    return endLoadTime() - startLoadTime(appName);
  },
  loadStarted: function loadStarted(appName) {
    _appData2.default.setStartLoadTime(appName, _performance2.default.now());
  },
  firstRequestDuration: function firstRequestDuration(appName) {
    return startLoadTime(appName);
  }
};

/***/ }),
/* 6 */
/*!******************************!*\
  !*** ./app-data/app-data.js ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * window.fedops.apps wrapper (for tests mainly)
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getAppData(appName) {
  return window.fedops.apps[appName];
}

exports.default = {
  init: function init(appName) {
    window.fedops.apps[appName] = window.fedops.apps[appName] || {};
  },
  getStartLoadTime: function getStartLoadTime(appName) {
    var appData = getAppData(appName);
    if (!appData) {
      return null;
    }
    return appData.startLoadTime;
  },
  setStartLoadTime: function setStartLoadTime(appName, startLoadTime) {
    return getAppData(appName).startLoadTime = startLoadTime;
  }
};

/***/ }),
/* 7 */
/*!************************************!*\
  !*** ./performance/performance.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * window.performance wrappers (for tests mainly)
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getNavigation: function getNavigation() {
    return window && window.performance ? window.performance.navigation : {};
  },


  /**
   * get all loaded resources
   */
  getResources: function getResources() {
    return window && window.performance && window.performance.getEntriesByType('resource') || [];
  },
  getTiming: function getTiming() {
    return window && window.performance ? window.performance.timing : {};
  },


  /**
   * Duration relative to navigation start (window.performance.timing.navigationStart)
   */
  now: function now() {
    return window && window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  },


  /**
   * Create a performance timestamp
   */
  mark: function mark(name) {
    window && window.performance && window.performance.mark && window.performance.mark(name);
  },


  /**
   * Record a performance measurement
   */
  measure: function measure(name, startMark, endMark) {
    window && window.performance && window.performance.measure && window.performance.measure(name, startMark, endMark);
  }
};

/***/ }),
/* 8 */
/*!*************************************!*\
  !*** ./data-items/bi-error-item.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVID = undefined;

var _biBaseItem = __webpack_require__(/*! ./bi-base-item */ 0);

var _biBaseItem2 = _interopRequireDefault(_biBaseItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EVID = exports.EVID = 17;
/**
 * Represents the "load finished" bi event:
 * http://bo.wix.com/bi-catalog-webapp/#/sources/72/events/11
 *
 * It should be used to monitor the initial application load.
 */

var BiErrorItem = function (_BiBaseDataItem) {
  _inherits(BiErrorItem, _BiBaseDataItem);

  function BiErrorItem(sessionId) {
    _classCallCheck(this, BiErrorItem);

    return _possibleConstructorReturn(this, (BiErrorItem.__proto__ || Object.getPrototypeOf(BiErrorItem)).call(this, EVID, sessionId));
  }

  return BiErrorItem;
}(_biBaseItem2.default);

exports.default = BiErrorItem;

/***/ }),
/* 9 */
/*!***************************!*\
  !*** ./logger-factory.js ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;

var _loggerBuilder = __webpack_require__(/*! ./logger-builder */ 10);

var _loggerBuilder2 = _interopRequireDefault(_loggerBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a logger instance, initialized with application name.
 *
 * @param {String} appName application name (will be used as an application identifier in the monitoring tool, e.g. Grafana)
 * @param {Boolean} isWidgetLogger
 */
function create(appName) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$baseUrl = _ref.baseUrl,
        baseUrl = _ref$baseUrl === undefined ? null : _ref$baseUrl,
        _ref$appId = _ref.appId,
        appId = _ref$appId === undefined ? null : _ref$appId,
        _ref$isWidgetLogger = _ref.isWidgetLogger,
        isWidgetLogger = _ref$isWidgetLogger === undefined ? false : _ref$isWidgetLogger,
        _ref$errorHandlerTogg = _ref.errorHandlerToggle,
        errorHandlerToggle = _ref$errorHandlerTogg === undefined ? false : _ref$errorHandlerTogg,
        _ref$disableAutoLoadF = _ref.disableAutoLoadFinish,
        disableAutoLoadFinish = _ref$disableAutoLoadF === undefined ? false : _ref$disableAutoLoadF,
        _ref$swallowException = _ref.swallowExceptions,
        swallowExceptions = _ref$swallowException === undefined ? false : _ref$swallowException,
        _ref$interactionTimeo = _ref.interactionTimeout,
        interactionTimeout = _ref$interactionTimeo === undefined ? null : _ref$interactionTimeo,
        _ref$timeoutHook = _ref.timeoutHook,
        timeoutHook = _ref$timeoutHook === undefined ? null : _ref$timeoutHook,
        _ref$startHook = _ref.startHook,
        startHook = _ref$startHook === undefined ? null : _ref$startHook,
        _ref$endHook = _ref.endHook,
        endHook = _ref$endHook === undefined ? null : _ref$endHook,
        _ref$networkAnalysis = _ref.networkAnalysis,
        networkAnalysis = _ref$networkAnalysis === undefined ? false : _ref$networkAnalysis;

    var appVersion = typeof window !== 'undefined' ? "1.0.0-SNAPSHOT" : null;

    return new _loggerBuilder2.default().setAppName(appName).setAppVersion(appVersion).setBaseUrl(baseUrl).setAppId(appId).setErrorHandlerToggle(errorHandlerToggle).setSwallowExceptions(swallowExceptions).setWidgetLogger(isWidgetLogger).setInteractionTimeout(interactionTimeout).setTimeoutHook(timeoutHook).setStartHook(startHook).setEndHook(endHook).setDisableAutoLoadFinish(disableAutoLoadFinish).setNetworkAnalysis(networkAnalysis).build();
}

/***/ }),
/* 10 */
/*!***************************!*\
  !*** ./logger-builder.js ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.setFactory = setFactory;

var _tools = __webpack_require__(/*! ./tools/tools */ 2);

var _tools2 = _interopRequireDefault(_tools);

var _storage = __webpack_require__(/*! ./storage/storage */ 11);

var _storage2 = _interopRequireDefault(_storage);

var _reporter = __webpack_require__(/*! ./reporter/reporter */ 12);

var _reporter2 = _interopRequireDefault(_reporter);

var _loggerInstance = __webpack_require__(/*! ./logger-instance */ 14);

var _loggerInstance2 = _interopRequireDefault(_loggerInstance);

var _widgetLoggerInstance = __webpack_require__(/*! ./widget-logger-instance */ 23);

var _widgetLoggerInstance2 = _interopRequireDefault(_widgetLoggerInstance);

var _errorHandler = __webpack_require__(/*! ./error-handler */ 25);

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _conf = __webpack_require__(/*! ./conf */ 27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getSessionId() {
  var res = typeof window !== 'undefined' && window.fedops && window.fedops.sessionId;
  res = res || _storage2.default.getItem(_conf.SESSION_ID_STORAGE_KEY);
  res = res || _tools2.default.generateGuid();

  _storage2.default.setItem(_conf.SESSION_ID_STORAGE_KEY, res);

  return res;
}

var ReporterFactory = _reporter2.default; // good for tests

function setFactory(factory) {
  ReporterFactory = factory;
}
/**
 * Builds a logger instance.
 */

var LoggerBuilder = function () {
  function LoggerBuilder() {
    _classCallCheck(this, LoggerBuilder);
  }

  _createClass(LoggerBuilder, [{
    key: 'setAppName',
    value: function setAppName(name) {
      this.appName = name;
      return this;
    }
  }, {
    key: 'setAppVersion',
    value: function setAppVersion(version) {
      this.appVersion = version;
      return this;
    }
  }, {
    key: 'setErrorHandlerToggle',
    value: function setErrorHandlerToggle(toggle) {
      this.errorHandlerToggle = toggle;
      return this;
    }
  }, {
    key: 'setSwallowExceptions',
    value: function setSwallowExceptions(swallow) {
      this.swallowExceptions = swallow;
      return this;
    }
  }, {
    key: 'setAppId',
    value: function setAppId(appId) {
      this.appId = appId;
      return this;
    }
  }, {
    key: 'setBaseUrl',
    value: function setBaseUrl(url) {
      this.baseUrl = url;
      return this;
    }
  }, {
    key: 'setWidgetLogger',
    value: function setWidgetLogger(isWidgetLogger) {
      this.isWidgetLogger = isWidgetLogger;
      return this;
    }
  }, {
    key: 'setInteractionTimeout',
    value: function setInteractionTimeout(interactionTimeout) {
      this.interactionTimeout = interactionTimeout;
      return this;
    }
  }, {
    key: 'setTimeoutHook',
    value: function setTimeoutHook(timeoutHook) {
      this.timeoutHook = timeoutHook;
      return this;
    }
  }, {
    key: 'setStartHook',
    value: function setStartHook(startHook) {
      this.startHook = startHook;
      return this;
    }
  }, {
    key: 'setEndHook',
    value: function setEndHook(endHook) {
      this.endHook = endHook;
      return this;
    }
  }, {
    key: 'setDisableAutoLoadFinish',
    value: function setDisableAutoLoadFinish(disableAutoLoadFinish) {
      this.disableAutoLoadFinish = disableAutoLoadFinish;
      return this;
    }
  }, {
    key: 'setNetworkAnalysis',
    value: function setNetworkAnalysis(enableNetworkAnalysis) {
      this.enableNetworkAnalysis = enableNetworkAnalysis;
      return this;
    }
  }, {
    key: 'build',
    value: function build() {
      if (!this.appName) {
        return null;
      }

      if (!this.appVersion) {
        this.appVersion = _conf.DEFAULT_APP_VERSION;
      }

      var reporter = new ReporterFactory(this.baseUrl || _conf.BI_BASE_URL);
      var errorHandlerToggle = this.errorHandlerToggle;
      var swallowExceptions = this.swallowExceptions;
      var interactionTimeout = this.interactionTimeout;
      var timeoutHook = this.timeoutHook;
      var startHook = this.startHook;
      var endHook = this.endHook;
      var disableAutoLoadFinish = this.disableAutoLoadFinish;
      var enableNetworkAnalysis = this.enableNetworkAnalysis;

      if (errorHandlerToggle) {
        window.fedopsLoggerErrorHandler = window.fedopsLoggerErrorHandler || new _errorHandler2.default({ swallowExceptions: swallowExceptions });
      }

      var logger = null;

      if (this.isWidgetLogger) {
        logger = new _widgetLoggerInstance2.default(this.appName, this.appVersion, reporter, { sessionId: getSessionId(), errorHandlerToggle: errorHandlerToggle, swallowExceptions: swallowExceptions, disableAutoLoadFinish: disableAutoLoadFinish, enableNetworkAnalysis: enableNetworkAnalysis });
      } else {
        logger = new _loggerInstance2.default(this.appName, this.appVersion, reporter, { sessionId: getSessionId(), errorHandlerToggle: errorHandlerToggle, swallowExceptions: swallowExceptions, disableAutoLoadFinish: disableAutoLoadFinish, interactionTimeout: interactionTimeout, timeoutHook: timeoutHook, startHook: startHook, endHook: endHook, enableNetworkAnalysis: enableNetworkAnalysis });
      }

      return logger;
    }
  }]);

  return LoggerBuilder;
}();

exports.default = LoggerBuilder;

/***/ }),
/* 11 */
/*!****************************!*\
  !*** ./storage/storage.js ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Local storage wrapper (for tests mainly)
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getItem: function getItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {}
  },
  setItem: function setItem(key, value) {
    try {
      return window.localStorage.setItem(key, value);
    } catch (e) {}
  }
};

/***/ }),
/* 12 */
/*!******************************!*\
  !*** ./reporter/reporter.js ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pixel = __webpack_require__(/*! ../pixel/pixel */ 13);

var _pixel2 = _interopRequireDefault(_pixel);

var _tools = __webpack_require__(/*! ../tools/tools */ 2);

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reporter = function () {
  function Reporter(baseUrl) {
    _classCallCheck(this, Reporter);

    this.baseUrl = baseUrl;
  }

  _createClass(Reporter, [{
    key: 'getBaseUrl',
    value: function getBaseUrl() {
      return this.baseUrl;
    }
  }, {
    key: 'report',
    value: function report(data) {
      if (!data) {
        return null;
      }

      return _pixel2.default.fetch(this.baseUrl + '?' + _tools2.default.mapToQuery(data));
    }
  }]);

  return Reporter;
}();

exports.default = Reporter;

/***/ }),
/* 13 */
/*!************************!*\
  !*** ./pixel/pixel.js ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Simple GET request wrapper (for tests mainly)
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  fetch: function fetch(url) {
    return new window.Image().src = url;
  }
};

/***/ }),
/* 14 */
/*!****************************!*\
  !*** ./logger-instance.js ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseLogger = __webpack_require__(/*! ./base-logger */ 3);

var _baseLogger2 = _interopRequireDefault(_baseLogger);

var _biLoadFinishItem = __webpack_require__(/*! ./data-items/bi-load-finish-item */ 18);

var _biLoadFinishItem2 = _interopRequireDefault(_biLoadFinishItem);

var _durationItem = __webpack_require__(/*! ./data-items/duration-item */ 4);

var _durationItem2 = _interopRequireDefault(_durationItem);

var _resourceItem = __webpack_require__(/*! ./data-items/resource-item */ 19);

var _resourceItem2 = _interopRequireDefault(_resourceItem);

var _biInteractionStartItem = __webpack_require__(/*! ./data-items/bi-interaction-start-item */ 21);

var _biInteractionStartItem2 = _interopRequireDefault(_biInteractionStartItem);

var _biInteractionEndItem = __webpack_require__(/*! ./data-items/bi-interaction-end-item */ 22);

var _biInteractionEndItem2 = _interopRequireDefault(_biInteractionEndItem);

var _biErrorItem = __webpack_require__(/*! ./data-items/bi-error-item */ 8);

var _biErrorItem2 = _interopRequireDefault(_biErrorItem);

var _performance = __webpack_require__(/*! ./performance/performance */ 7);

var _performance2 = _interopRequireDefault(_performance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var callHook = function callHook(hook, hookArgs) {
  if (hook) {
    return hook(hookArgs);
  }
};

/**
 * Logs application load phases.
 *
 * Before adding new parameters to the reported events, please make sure the BI schema supports them:
 * http://bo.wix.com/bi-catalog-webapp/#/sources/72
 */

var LoggerInstance = function (_BaseLogger) {
  _inherits(LoggerInstance, _BaseLogger);

  function LoggerInstance(appName, appVersion, reporter, _ref) {
    var sessionId = _ref.sessionId,
        errorHandlerToggle = _ref.errorHandlerToggle,
        disableAutoLoadFinish = _ref.disableAutoLoadFinish,
        interactionTimeout = _ref.interactionTimeout,
        timeoutHook = _ref.timeoutHook,
        startHook = _ref.startHook,
        endHook = _ref.endHook,
        enableNetworkAnalysis = _ref.enableNetworkAnalysis;

    _classCallCheck(this, LoggerInstance);

    var _this = _possibleConstructorReturn(this, (LoggerInstance.__proto__ || Object.getPrototypeOf(LoggerInstance)).call(this, appName, appVersion, reporter, { sessionId: sessionId, errorHandlerToggle: errorHandlerToggle, disableAutoLoadFinish: disableAutoLoadFinish }));

    _this._outgoingInteractions = {};
    _this.interactionTimeout = interactionTimeout;
    _this.timeoutHook = timeoutHook;
    _this.startHook = startHook;
    _this.endHook = endHook;
    _this.enableNetworkAnalysis = enableNetworkAnalysis;
    return _this;
  }

  /**
   * Final phase (http://bo.wix.com/bi-catalog-webapp/#/sources/72/events/11)
   * Call this method when your application finishes loading and after all custom phases.
   */


  _createClass(LoggerInstance, [{
    key: 'appLoaded',
    value: function appLoaded() {
      if (this._appLoadedCalled) {
        return;
      }

      if (window && window.fedops && typeof window.fedops.clearLoadTimeout === 'function') {
        window.fedops.clearLoadTimeout();
      }

      if (this.enableNetworkAnalysis) {
        var resources = _performance2.default.getResources();
        new _resourceItem2.default(resources).prettyLocalReport();
      }

      var dataSource = this.dataSource.clone().addItem(new _biLoadFinishItem2.default(this.sessionId)).addItem(new _durationItem2.default(this.appName).setFirstRequestDuration());

      this._appLoadedCalled = true;
      _performance2.default.mark('[fedops] app-loaded');
      _performance2.default.measure('[fedops] app-loaded', 'navigationStart', '[fedops] app-loaded');
      return this._report(dataSource);
    }

    /**
     * Custom interaction start (http://bo.wix.com/bi-catalog-webapp/#/sources/72/events/15)
     *
     * @param {String} interactionName  interaction name
     */

  }, {
    key: 'interactionStarted',
    value: function interactionStarted(interactionName) {
      var _this2 = this;

      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          interactionTimeout = _ref2.interactionTimeout,
          startHook = _ref2.startHook,
          timeoutHook = _ref2.timeoutHook;

      _performance2.default.mark(interactionName + ' started');
      var scheduleTimeoutEvent = function scheduleTimeoutEvent() {
        if (interactionTimeout || _this2.interactionTimeout) {
          return setTimeout(function () {
            var dataSource = _this2.dataSource.clone().addItem({ interactionName: interactionName }).addItem({ errorType: 'timeout' }).addItem(new _biErrorItem2.default(_this2.sessionId));

            _this2._report(dataSource);
            callHook(timeoutHook || _this2.timeoutHook, { name: interactionName, timeout: interactionTimeout || _this2.interactionTimeout });
          }, interactionTimeout || _this2.interactionTimeout);
        }
      };
      var dataSource = this.dataSource.clone().addItem({ name: interactionName }).addItem(new _biInteractionStartItem2.default(this.sessionId));

      this._outgoingInteractions[interactionName] = {
        timestamp: _performance2.default.now(),
        timeout: interactionTimeout || this.interactionTimeout
      };
      this._report(dataSource);
      callHook(startHook || this.startHook, { name: interactionName });

      var timeoutId = scheduleTimeoutEvent();
      return {
        timeoutId: timeoutId
      };
    }

    /**
     * Custom interaction end (http://bo.wix.com/bi-catalog-webapp/#/sources/72/events/16)
     *
     * @param {String} interactionName  interaction name
     */

  }, {
    key: 'interactionEnded',
    value: function interactionEnded(interactionName) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          timeoutId = _ref3.timeoutId,
          endHook = _ref3.endHook;

      _performance2.default.mark(interactionName + ' ended');
      _performance2.default.measure(interactionName + ' duration', interactionName + ' started', interactionName + ' ended');

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      var duration = this._outgoingInteractions[interactionName] ? Math.floor(_performance2.default.now() - this._outgoingInteractions[interactionName].timestamp) : '';

      callHook(endHook || this.endHook, {
        name: interactionName,
        duration: duration,
        timeout: this._outgoingInteractions[interactionName] && this._outgoingInteractions[interactionName].timeout
      });

      var dataSource = this.dataSource.clone().addItem({ name: interactionName }).addItem({ duration: duration }).addItem(new _biInteractionEndItem2.default(this.sessionId));

      delete this._outgoingInteractions[interactionName];

      this._report(dataSource);
    }
  }, {
    key: 'isDisableAutoLoadFinish',
    value: function isDisableAutoLoadFinish() {
      return this._isDisableAutoLoadFinish();
    }
  }]);

  return LoggerInstance;
}(_baseLogger2.default);

// vim: set ts=2 sw=2 tw=80 et :


exports.default = LoggerInstance;

/***/ }),
/* 15 */
/*!************************************!*\
  !*** ./data-source/data-source.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dataItem = __webpack_require__(/*! ../data-items/data-item */ 1);

var _dataItem2 = _interopRequireDefault(_dataItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Data accumulator
 */
var DataSource = function () {
  function DataSource() {
    var _this = this;

    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, DataSource);

    this.items = [];

    if (item) {
      (typeof item.length === 'undefined' ? [item] : item).forEach(function (item) {
        return _this.addItem(item);
      });
    }
  }

  /**
   * Creates a new DataSource instance and clones internal state.
   *
   * @returns {DataSource}
   */


  _createClass(DataSource, [{
    key: 'clone',
    value: function clone() {
      return new DataSource(this.items.slice());
    }

    /**
     * Adds a new item.
     *
     * @param {Object | DataItem} item
     *
     * @return {DataSource} self
     */

  }, {
    key: 'addItem',
    value: function addItem(item) {
      this.items.push(item instanceof _dataItem2.default ? item : new _dataItem2.default(item));

      return this;
    }

    /**
     * Merges all added items into one plain object.
     *
     * @returns {Object}
     */

  }, {
    key: 'mergeItems',
    value: function mergeItems() {
      var res = {};

      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];

        if (!item.isActive()) {
          res = null;
          break;
        }

        var data = item.export();

        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            // eslint-disable-line
            res[key] = data[key];
          }
        }
      }

      return res;
    }
  }]);

  return DataSource;
}();

exports.default = DataSource;

/***/ }),
/* 16 */
/*!*******************************************!*\
  !*** ./data-items/bi-app-version-item.js ***!
  \*******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _biBaseItem = __webpack_require__(/*! ./bi-base-item */ 0);

var _biBaseItem2 = _interopRequireDefault(_biBaseItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents the "app version" bi event:
 * http://bo.wix.com/bi-catalog-webapp/#/sources/72/events/18
 *
 * It should indicate an app of a certain version has run
 */
var BiAppVersionDataItem = function (_BiBaseDataItem) {
  _inherits(BiAppVersionDataItem, _BiBaseDataItem);

  function BiAppVersionDataItem(sessionId) {
    _classCallCheck(this, BiAppVersionDataItem);

    return _possibleConstructorReturn(this, (BiAppVersionDataItem.__proto__ || Object.getPrototypeOf(BiAppVersionDataItem)).call(this, 18, sessionId));
  }

  return BiAppVersionDataItem;
}(_biBaseItem2.default);

exports.default = BiAppVersionDataItem;

/***/ }),
/* 17 */
/*!******************************************!*\
  !*** ./data-items/bi-load-phase-item.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _biBaseItem = __webpack_require__(/*! ./bi-base-item */ 0);

var _biBaseItem2 = _interopRequireDefault(_biBaseItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents the "load phase" bi event:
 * http://bo.wix.com/bi-catalog-webapp/#/sources/72/events/13
 *
 * It should be used to monitor custom application load phases.
 */
var BiLoadPhaseDataItem = function (_BiBaseDataItem) {
  _inherits(BiLoadPhaseDataItem, _BiBaseDataItem);

  function BiLoadPhaseDataItem(sessionId) {
    _classCallCheck(this, BiLoadPhaseDataItem);

    return _possibleConstructorReturn(this, (BiLoadPhaseDataItem.__proto__ || Object.getPrototypeOf(BiLoadPhaseDataItem)).call(this, 13, sessionId));
  }

  return BiLoadPhaseDataItem;
}(_biBaseItem2.default);

exports.default = BiLoadPhaseDataItem;

/***/ }),
/* 18 */
/*!*******************************************!*\
  !*** ./data-items/bi-load-finish-item.js ***!
  \*******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _biBaseItem = __webpack_require__(/*! ./bi-base-item */ 0);

var _biBaseItem2 = _interopRequireDefault(_biBaseItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents the "load finished" bi event:
 * http://bo.wix.com/bi-catalog-webapp/#/sources/72/events/11
 *
 * It should be used to monitor the initial application load.
 */
var BiLoadFinishDataItem = function (_BiBaseDataItem) {
  _inherits(BiLoadFinishDataItem, _BiBaseDataItem);

  function BiLoadFinishDataItem(sessionId) {
    _classCallCheck(this, BiLoadFinishDataItem);

    return _possibleConstructorReturn(this, (BiLoadFinishDataItem.__proto__ || Object.getPrototypeOf(BiLoadFinishDataItem)).call(this, 11, sessionId));
  }

  return BiLoadFinishDataItem;
}(_biBaseItem2.default);

exports.default = BiLoadFinishDataItem;

/***/ }),
/* 19 */
/*!*************************************!*\
  !*** ./data-items/resource-item.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dataItem = __webpack_require__(/*! ./data-item */ 1);

var _dataItem2 = _interopRequireDefault(_dataItem);

var _location = __webpack_require__(/*! ../app-data/location */ 20);

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var types = {
  xmlhttprequest: {
    count: 'xhrRequested',
    unsupported: 'unsupportedXhrPercentage',
    duration: 'xhrRequestedTotalTime',
    total: 'totalSizeOfXhrRequested',
    longest: 'xhrRequestLongest'
  },
  script: {
    count: 'scriptsLoaded',
    unsupported: 'unsupportedScriptsPercentage',
    duration: 'scriptsLoadingTotalTime',
    total: 'totalSizeOfScriptsLoaded'
  },
  link: {
    count: 'cssLoaded',
    unsupported: 'unsupportedCssPercentage',
    duration: 'cssLoadingTotalTime',
    total: 'totalSizeOfCssLoaded'
  }
};

var getResourcesByType = function getResourcesByType(resources, type) {
  return resources.filter(function (r) {
    return type === r.initiatorType;
  });
};

var countAllResourcesByType = function countAllResourcesByType(resources) {
  return Object.keys(types).reduce(function (acc, cur) {
    var sameTypeResources = getResourcesByType(resources, cur);
    if (types[cur].count) {
      acc[types[cur].count] = getSupportedResourcesCount(sameTypeResources);
    }
    if (types[cur].duration) {
      acc[types[cur].duration] = getResourceLoadDuration(sameTypeResources);
    }
    if (types[cur].longest) {
      acc[types[cur].longest] = getResourceLoadLongestDuration(sameTypeResources);
    }
    if (types[cur].total) {
      acc[types[cur].total] = isTotalSupported(sameTypeResources, 'transferSize') ? getTotalSizeOfResource(sameTypeResources) : -1;
    }
    if (types[cur].unsupported) {
      acc[types[cur].unsupported] = getPercentageOfUnsupportedResources(sameTypeResources);
    }
    return acc;
  }, {});
};

function isTotalSupported(resources) {
  // transferSize property is 0 for cached resources and resources which came from cross-origin without 'timing-allow-origin' header
  return resources.length ? resources.some(function (r) {
    return !!r.transferSize;
  }) : false;
}

function getTotalSizeOfResource(resources) {
  var counter = 0;
  resources.forEach(function (r) {
    return counter += r.transferSize;
  });
  return counter;
}

function getResourceLoadLongestDuration(resources) {
  if (resources.length === 0) {
    return -1;
  }
  var longest = resources.reduce(function (acc, cur) {
    return cur.responseEnd - cur.startTime >= acc.responseEnd - acc.startTime ? cur : acc;
  });

  return longest.responseEnd - longest.startTime;
}

function getResourceLoadDuration(resources) {
  var loadStartStop = {
    startTime: Infinity,
    responseEnd: 0
  };

  resources.forEach(function (r) {
    if (loadStartStop.startTime > r.startTime) {
      loadStartStop.startTime = r.startTime;
    }
    if (loadStartStop.responseEnd < r.responseEnd) {
      loadStartStop.responseEnd = r.responseEnd;
    }
  });

  return loadStartStop.responseEnd - loadStartStop.startTime;
}

function getSupportedResourcesCount(resources) {
  return resources.length - resources.filter(isResourceUnsupported).length;
}

function getPercentageOfUnsupportedResources(resources) {
  var totalCount = resources.length;
  if (totalCount === 0) {
    return 0;
  }
  var unsupportedCount = resources.filter(isResourceUnsupported).length;
  return Math.round(unsupportedCount * 100 / totalCount);
}

function isResourceUnsupported(resource) {
  return isCORS(resource.name) && resource.transferSize === 0 && resource.requestStart === 0;
}

function isCORS(resourceName) {
  var host = _location2.default.getHost();
  return !!host && !resourceName.includes(host);
}

var ResourceDataItem = function (_DataItem) {
  _inherits(ResourceDataItem, _DataItem);

  function ResourceDataItem(resources) {
    _classCallCheck(this, ResourceDataItem);

    return _possibleConstructorReturn(this, (ResourceDataItem.__proto__ || Object.getPrototypeOf(ResourceDataItem)).call(this, countAllResourcesByType(resources)));
  }

  _createClass(ResourceDataItem, [{
    key: 'prettyLocalReport',
    value: function prettyLocalReport() {
      if (console.debug) {
        console.debug(JSON.stringify(this.data, null, 4) /*new ResourceDataItem(resources).export()*/);
      }
    }
  }]);

  return ResourceDataItem;
}(_dataItem2.default);

exports.default = ResourceDataItem;

/***/ }),
/* 20 */
/*!******************************!*\
  !*** ./app-data/location.js ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getHost: function getHost() {
    return typeof window !== 'undefined' && window.location && window.location.host;
  }
};

/***/ }),
/* 21 */
/*!*************************************************!*\
  !*** ./data-items/bi-interaction-start-item.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INTERACTION_START_EVID = undefined;

var _biBaseItem = __webpack_require__(/*! ./bi-base-item */ 0);

var _biBaseItem2 = _interopRequireDefault(_biBaseItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INTERACTION_START_EVID = exports.INTERACTION_START_EVID = 15;
/**
 * Represents the "load finished" bi event:
 * http://bo.wix.com/bi-catalog-webapp/#/sources/72/events/11
 *
 * It should be used to monitor the initial application load.
 */

var BiInteractionStartDataItem = function (_BiBaseDataItem) {
  _inherits(BiInteractionStartDataItem, _BiBaseDataItem);

  function BiInteractionStartDataItem(sessionId) {
    _classCallCheck(this, BiInteractionStartDataItem);

    return _possibleConstructorReturn(this, (BiInteractionStartDataItem.__proto__ || Object.getPrototypeOf(BiInteractionStartDataItem)).call(this, INTERACTION_START_EVID, sessionId));
  }

  return BiInteractionStartDataItem;
}(_biBaseItem2.default);

exports.default = BiInteractionStartDataItem;

/***/ }),
/* 22 */
/*!***********************************************!*\
  !*** ./data-items/bi-interaction-end-item.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INTERACTION_END_EVID = undefined;

var _biBaseItem = __webpack_require__(/*! ./bi-base-item */ 0);

var _biBaseItem2 = _interopRequireDefault(_biBaseItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INTERACTION_END_EVID = exports.INTERACTION_END_EVID = 16;

/**
 * Represents the "load finished" bi event:
 * http://bo.wix.com/bi-catalog-webapp/#/sources/72/events/11
 *
 * It should be used to monitor the initial application load.
 */

var BiInteractionEndDataItem = function (_BiBaseDataItem) {
  _inherits(BiInteractionEndDataItem, _BiBaseDataItem);

  function BiInteractionEndDataItem(sessionId) {
    _classCallCheck(this, BiInteractionEndDataItem);

    return _possibleConstructorReturn(this, (BiInteractionEndDataItem.__proto__ || Object.getPrototypeOf(BiInteractionEndDataItem)).call(this, INTERACTION_END_EVID, sessionId));
  }

  return BiInteractionEndDataItem;
}(_biBaseItem2.default);

exports.default = BiInteractionEndDataItem;

/***/ }),
/* 23 */
/*!***********************************!*\
  !*** ./widget-logger-instance.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseLogger = __webpack_require__(/*! ./base-logger */ 3);

var _baseLogger2 = _interopRequireDefault(_baseLogger);

var _biLoadStartItem = __webpack_require__(/*! ./data-items/bi-load-start-item */ 24);

var _biLoadStartItem2 = _interopRequireDefault(_biLoadStartItem);

var _time = __webpack_require__(/*! ./time/time */ 5);

var _time2 = _interopRequireDefault(_time);

var _appData = __webpack_require__(/*! ./app-data/app-data */ 6);

var _appData2 = _interopRequireDefault(_appData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Logs application load phases.
 *
 * Before adding new parameters to the reported events, please make sure the BI schema supports them:
 * http://bo.wix.com/bi-catalog-webapp/#/sources/72
 */
var WidgetLoggerInstance = function (_BaseLogger) {
  _inherits(WidgetLoggerInstance, _BaseLogger);

  function WidgetLoggerInstance(appName, appVersion, reporter, _ref) {
    var sessionId = _ref.sessionId,
        disableAutoLoadFinish = _ref.disableAutoLoadFinish;

    _classCallCheck(this, WidgetLoggerInstance);

    var _this = _possibleConstructorReturn(this, (WidgetLoggerInstance.__proto__ || Object.getPrototypeOf(WidgetLoggerInstance)).call(this, appName, appVersion, reporter, { sessionId: sessionId, disableAutoLoadFinish: disableAutoLoadFinish }));

    _appData2.default.init(_this.appName);
    return _this;
  }

  /**
   * Manual report for widget load start (http://bo.wix.com/bi-catalog-webapp/#/sources/72/events/14)
   * Call this method at the earliest point possible when your widget starts loading
   */


  _createClass(WidgetLoggerInstance, [{
    key: 'appLoadStarted',
    value: function appLoadStarted() {

      _time2.default.loadStarted(this.appName);

      var dataSource = this.dataSource.clone().addItem(new _biLoadStartItem2.default(this.sessionId));

      return this._report(dataSource);
    }
  }, {
    key: 'isDisableAutoLoadFinish',
    value: function isDisableAutoLoadFinish() {
      return this._isDisableAutoLoadFinish();
    }
  }]);

  return WidgetLoggerInstance;
}(_baseLogger2.default);

exports.default = WidgetLoggerInstance;

/***/ }),
/* 24 */
/*!******************************************!*\
  !*** ./data-items/bi-load-start-item.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _biBaseItem = __webpack_require__(/*! ./bi-base-item */ 0);

var _biBaseItem2 = _interopRequireDefault(_biBaseItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents the "load started" bi event:
 * http://bo.wix.com/bi-catalog-webapp/#/sources/72/events/14
 *
 * It should be used to monitor the initial application load.
 */
var BiLoadStartDataItem = function (_BiBaseDataItem) {
  _inherits(BiLoadStartDataItem, _BiBaseDataItem);

  function BiLoadStartDataItem(sessionId) {
    _classCallCheck(this, BiLoadStartDataItem);

    return _possibleConstructorReturn(this, (BiLoadStartDataItem.__proto__ || Object.getPrototypeOf(BiLoadStartDataItem)).call(this, 14, sessionId));
  }

  return BiLoadStartDataItem;
}(_biBaseItem2.default);

exports.default = BiLoadStartDataItem;

/***/ }),
/* 25 */
/*!**************************!*\
  !*** ./error-handler.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*eslint-disable camelcase*/

var _window = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var ErrorHandler = function () {
  function ErrorHandler(_ref) {
    var swallowExceptions = _ref.swallowExceptions;

    _classCallCheck(this, ErrorHandler);

    this.swallowExceptions = swallowExceptions;
    this.listeners = {};

    //*************************************************************************
    // We are wrapping the browser's native methods with try/catch for several
    // reasons:
    //
    // 1. It provides us with a more elaborate stack trace.
    //    Currently we ignore the stack trace due to BI limitations, but it can
    //    be very useful for future support.
    //
    // 2. Makes it easier to classify the error types.
    //
    // 3. Some browsers don't support a global error handler.
    //*************************************************************************

    this.instrumentAjax();
    this.instrumentSetTimeout();
    this.instrumentSetInterval();
    this.instrumentAddEventListener();
    this.instrumentFetch();
    this.instrumentPromise();

    //Sometimes catches one of the instruments above? Need to verify...
    this.instrumentGloballyUnhandledError();
  }

  _createClass(ErrorHandler, [{
    key: 'subscribeListener',
    value: function subscribeListener(appName, cb) {
      this.listeners[appName] = cb;
    }
  }, {
    key: 'removeListener',
    value: function removeListener(appName) {
      delete this.listeners[appName];
    }
  }, {
    key: 'instrumentAjax',
    value: function instrumentAjax() {
      var self = this;

      if ('XMLHttpRequest' in _window) {
        var xhrproto = XMLHttpRequest.prototype;

        this._wrap(xhrproto, 'open', function (orig) {
          return function (method, url) {
            this.__fedops_xhr = {
              method: method,
              url: url,
              status_code: null
            };

            return orig.apply(this, arguments);
          };
        }, 'xhr');

        this._wrap(xhrproto, 'send', function (orig) {
          return function () {
            var xhr = this;

            function saveStatusCode() {
              if (xhr.readyState === 1 || xhr.readyState === 4) {
                try {
                  xhr.__fedops_xhr.status_code = xhr.status;
                } catch (e) {}

                if (self._isErrorStatusCode(xhr.__fedops_xhr.status_code)) {
                  self._reportError(xhr.__fedops_xhr, 'xhr', xhr.__fedops_xhr.status_code);
                }
              }
            }

            self._wrap(this, 'onload', function (orig) {
              return function () {
                orig && orig.apply(this, arguments);
              };
            }, 'xhr');

            self._wrap(this, 'onerror', function (orig) {
              return function () {
                orig && orig.apply(this, arguments);
              };
            }, 'xhr');

            self._wrap(this, 'onprogress', function (orig) {
              return function () {
                orig && orig.apply(this, arguments);
              };
            }, 'xhr');

            if ('onreadystatechange' in xhr && typeof xhr.onreadystatechange === 'function') {
              self._wrap(xhr, 'onreadystatechange', function (orig) {
                return function () {
                  saveStatusCode();
                  return orig.apply(this, arguments);
                };
              });
            } else {
              xhr.onreadystatechange = saveStatusCode;
            }

            return orig.apply(this, arguments);
          };
        }, 'xhr');
      }
    }
  }, {
    key: 'instrumentSetTimeout',
    value: function instrumentSetTimeout() {
      var self = this;

      this._wrap(_window, 'setTimeout', function (globalSetTimeout) {
        return function (fn) {
          for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
          }

          return globalSetTimeout.call.apply(globalSetTimeout, [this, self._wrapCallback(fn, 'setTimeout')].concat(rest));
        };
      });
    }
  }, {
    key: 'instrumentSetInterval',
    value: function instrumentSetInterval() {
      var self = this;

      this._wrap(_window, 'setInterval', function (globalSetInterval) {
        return function (fn) {
          for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            rest[_key2 - 1] = arguments[_key2];
          }

          return globalSetInterval.call.apply(globalSetInterval, [this, self._wrapCallback(fn, 'setInterval')].concat(rest));
        };
      });
    }
  }, {
    key: 'instrumentAddEventListener',
    value: function instrumentAddEventListener() {
      var self = this;

      function instrumentEventTarget(name) {
        var origTarget = _window[name] && _window[name].prototype;

        if (origTarget && Object.prototype.hasOwnProperty.call(origTarget, 'addEventListener')) {
          self._wrap(origTarget, 'addEventListener', function (orig) {
            return function (eventName, fn, capture, secure) {
              var wrapped = self._wrapCallback(fn, 'addEventListener');

              if (fn) {
                fn.__fedopsWrapper__ = wrapped;
              }

              return orig.call(this, eventName, wrapped, capture, secure);
            };
          });

          self._wrap(origTarget, 'removeEventListener', function (orig) {
            return function (eventName, fn, capture, secure) {
              fn = fn && (fn.__fedopsWrapper__ || fn);
              return orig.call(this, eventName, fn, capture, secure);
            };
          });
        }
      }

      var eventTargets = ['EventTarget', 'Window', 'Node', 'ApplicationCache', 'AudioTrackList', 'ChannelMergerNode', 'CryptoOperation', 'EventSource', 'FileReader', 'HTMLUnknownElement', 'IDBDatabase', 'IDBRequest', 'IDBTransaction', 'KeyOperation', 'MediaController', 'MessagePort', 'ModalWindow', 'Notification', 'SVGElementInstance', 'Screen', 'TextTrack', 'TextTrackCue', 'TextTrackList', 'WebSocket', 'WebSocketWorker', 'Worker', 'XMLHttpRequest', 'XMLHttpRequestEventTarget', 'XMLHttpRequestUpload'];
      eventTargets.forEach(function (name) {
        return instrumentEventTarget(name);
      });
    }
  }, {
    key: 'instrumentRequestAnimationFrame',
    value: function instrumentRequestAnimationFrame() {}
  }, {
    key: 'instrumentFetch',
    value: function instrumentFetch() {
      var self = this;

      this._wrap(_window, 'fetch', function (globalFetch) {
        return function (url, fetchOptions) {
          return globalFetch.apply(this, arguments).then(function (response) {
            var statusCode = response.status;

            if (self._isErrorStatusCode(statusCode)) {
              var requestInfo = {
                url: url,
                method: fetchOptions ? fetchOptions.method : 'GET',
                status_code: statusCode
              };

              self._reportError(requestInfo, 'fetch', statusCode);
            }

            return response;
          });
        };
      });
    }
  }, {
    key: 'instrumentPromise',
    value: function instrumentPromise() {
      var self = this;

      _window.addEventListener('unhandledrejection', function (err) {
        self._reportError(err, 'promise');
      });
    }
  }, {
    key: 'instrumentGloballyUnhandledError',
    value: function instrumentGloballyUnhandledError() {
      var _this = this;

      _window.addEventListener('error', function (err) {
        _this._reportError(err, 'windowOnError');
      });
    }
  }, {
    key: 'instrumentHistory',
    value: function instrumentHistory() {}
  }, {
    key: '_wrap',
    value: function _wrap(obj, fnName, replaced, errorType) {
      var self = this;
      var orig = obj[fnName];
      var r = replaced(orig);

      var wrapped = function wrapped() {
        try {
          return r.apply(this, arguments);
        } catch (err) {
          self._reportError(err, errorType);

          if (!self.swallowExceptions) {
            throw err;
          }
        }
      };

      obj[fnName] = wrapped;
    }
  }, {
    key: '_wrapCallback',
    value: function _wrapCallback(fn, errorType) {
      var self = this;

      return function () {
        try {
          return fn.apply(this, arguments);
        } catch (err) {
          self._reportError(err, errorType);

          if (!self.swallowExceptions) {
            throw err;
          }
        }
      };
    }
  }, {
    key: '_reportError',
    value: function _reportError(err, errorType, errorInfo) {
      var self = this;

      var actualError = err && (err.error || err);

      if (!actualError.__fedopsHandledError__) {
        var appNames = Object.keys(this.listeners);

        appNames.forEach(function (appName) {
          self.listeners[appName](actualError, errorType, errorInfo);
        });

        actualError.__fedopsHandledError__ = true;
      }
    }
  }, {
    key: '_isErrorStatusCode',
    value: function _isErrorStatusCode(statusCode) {
      return statusCode >= 400 || statusCode === 0;
    }
  }]);

  return ErrorHandler;
}();

/*eslint-enable camelcase*/


exports.default = ErrorHandler;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ 26)))

/***/ }),
/* 26 */
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 27 */
/*!*****************!*\
  !*** ./conf.js ***!
  \*****************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var BI_BASE_URL = exports.BI_BASE_URL = 'https://frog.wix.com/fed';
var SESSION_ID_STORAGE_KEY = exports.SESSION_ID_STORAGE_KEY = 'fedops.logger.sessionId';
var DEFAULT_APP_VERSION = exports.DEFAULT_APP_VERSION = '0.0.0';

/***/ }),
/* 28 */
/*!****************************!*\
  !*** ./app-initializer.js ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initiateApp = initiateApp;
function initiateApp() {
  window.fedops = window.fedops || {};
  window.fedops.apps = window.fedops.apps || {};
}

/***/ }),
/* 29 */
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _appInitializer = __webpack_require__(/*! ./app-initializer */ 28);

var _loggerFactory = __webpack_require__(/*! ./logger-factory */ 9);

(0, _appInitializer.initiateApp)();
window.fedops.logger = { create: _loggerFactory.create };
window.fedops.widgetLogger = { create: function create(appName) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$baseUrl = _ref.baseUrl,
        baseUrl = _ref$baseUrl === undefined ? null : _ref$baseUrl,
        _ref$appId = _ref.appId,
        appId = _ref$appId === undefined ? null : _ref$appId;

    return (0, _loggerFactory.create)(appName, { baseUrl: baseUrl, appId: appId, isWidgetLogger: true });
  } };

/***/ })
/******/ ]);
});
//# sourceMappingURL=fedops-logger.bundle.js.map