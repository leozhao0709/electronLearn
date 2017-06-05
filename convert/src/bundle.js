/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAllVideos = exports.removeVideo = exports.setFormat = exports.addVideo = exports.showInFolder = exports.convertVideos = exports.addVideos = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(12);

var _types = __webpack_require__(4);

// TODO: Communicate to MainWindow process that videos
// have been added and are pending conversion
var addVideos = exports.addVideos = function addVideos(videos) {
  return function (dispatch) {
    _electron.ipcRenderer.send('videos:added', videos);
    _electron.ipcRenderer.on('metadata:complete', function (event, videosWithData) {
      dispatch({
        type: _types.ADD_VIDEOS,
        payload: videosWithData
      });
    });
  };
};

// TODO: Communicate to MainWindow that the user wants
// to start converting videos.  Also listen for feedback
// from the MainWindow regarding the current state of
// conversion.
var convertVideos = exports.convertVideos = function convertVideos() {
  return function (dispatch, getState) {
    _electron.ipcRenderer.send('conversion:start', getState().videos);

    _electron.ipcRenderer.on('conversion:end', function (event, _ref) {
      var video = _ref.video,
          outputPath = _ref.outputPath;

      console.log(video);
      dispatch({
        type: _types.VIDEO_COMPLETE,
        payload: _extends({}, video, {
          outputPath: outputPath
        })
      });
    });

    _electron.ipcRenderer.on('conversion:progress', function (event, _ref2) {
      var video = _ref2.video,
          timemark = _ref2.timemark;

      dispatch({
        type: _types.VIDEO_PROGRESS,
        payload: _extends({}, video, {
          timemark: timemark
        })
      });
    });
  };
};

// TODO: Open the folder that the newly created video
// exists in
var showInFolder = exports.showInFolder = function showInFolder(outputPath) {
  return function (dispatch) {
    _electron.ipcRenderer.send('folder:open', outputPath);
  };
};

var addVideo = exports.addVideo = function addVideo(video) {
  return {
    type: _types.ADD_VIDEO,
    payload: _extends({}, video)
  };
};

var setFormat = exports.setFormat = function setFormat(video, format) {
  return {
    type: _types.ADD_VIDEO,
    payload: _extends({}, video, {
      format: format,
      err: ""
    })
  };
};

var removeVideo = exports.removeVideo = function removeVideo(video) {
  return {
    type: _types.REMOVE_VIDEO,
    payload: video
  };
};

var removeAllVideos = exports.removeAllVideos = function removeAllVideos() {
  return {
    type: _types.REMOVE_ALL_VIDEOS
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ADD_VIDEO = exports.ADD_VIDEO = 'add_video';
var REMOVE_VIDEO = exports.REMOVE_VIDEO = 'remove_video';
var REMOVE_ALL_VIDEOS = exports.REMOVE_ALL_VIDEOS = 'remove_all_videos';
var ADD_VIDEOS = exports.ADD_VIDEOS = 'add_videos';
var VIDEO_PROGRESS = exports.VIDEO_PROGRESS = 'video_progress';
var VIDEO_COMPLETE = exports.VIDEO_COMPLETE = 'video_complete';

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = __webpack_require__(16);

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _reactRedux = __webpack_require__(1);

var _actions = __webpack_require__(2);

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoSelectScreen = function (_Component) {
  _inherits(VideoSelectScreen, _Component);

  function VideoSelectScreen() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VideoSelectScreen);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoSelectScreen.__proto__ || Object.getPrototypeOf(VideoSelectScreen)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      hovering: false
    }, _this.onDrop = function (files) {
      // invalid file types are not added to files object
      var videos = _lodash2.default.map(files, function (_ref2) {
        var name = _ref2.name,
            path = _ref2.path,
            size = _ref2.size,
            type = _ref2.type;

        return { name: name, path: path, size: size, type: type };
      });

      if (videos.length) {
        _this.props.addVideos(videos);

        if (!_this.props.small) {
          _this.props.history.push('/convert');
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VideoSelectScreen, [{
    key: 'renderChildren',
    value: function renderChildren(_ref3) {
      var isDragActive = _ref3.isDragActive,
          isDragReject = _ref3.isDragReject;

      if (isDragActive) {
        return _react2.default.createElement(
          'h4',
          { className: 'drop-message' },
          'Omnomnom, let me have those videos!'
        );
      } else if (isDragReject) {
        return _react2.default.createElement(
          'h4',
          { className: 'drop-message' },
          'Uh oh, I don\'t know how to deal with that type of file!'
        );
      } else {
        return _react2.default.createElement(
          'h4',
          { className: 'drop-message' },
          'Drag and drop some files on me, or click to select.'
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.small ? "video-select-screen-small" : "video-select-screen" },
        _react2.default.createElement(
          _reactDropzone2.default,
          {
            onDrop: this.onDrop,
            multiple: true,
            accept: 'video/*',
            className: 'dropzone',
            activeClassName: 'dropzone-active',
            rejectClassName: 'dropzone-reject'
          },
          this.renderChildren
        )
      );
    }
  }]);

  return VideoSelectScreen;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(null, actions)(VideoSelectScreen);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(15);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(18);

var _reactRedux = __webpack_require__(1);

var _reducers = __webpack_require__(9);

var _reducers2 = _interopRequireDefault(_reducers);

var _VideoSelectScreen = __webpack_require__(5);

var _VideoSelectScreen2 = _interopRequireDefault(_VideoSelectScreen);

var _ConvertScreen = __webpack_require__(11);

var _ConvertScreen2 = _interopRequireDefault(_ConvertScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _reducers2.default },
  _react2.default.createElement(
    _reactRouterDom.HashRouter,
    null,
    _react2.default.createElement(
      'div',
      { className: 'app' },
      _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { path: '/convert', component: _ConvertScreen2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/', component: _VideoSelectScreen2.default })
      )
    )
  )
), document.getElementById('root'));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(17);

var _actions = __webpack_require__(2);

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConvertPanel = function (_Component) {
  _inherits(ConvertPanel, _Component);

  function ConvertPanel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ConvertPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConvertPanel.__proto__ || Object.getPrototypeOf(ConvertPanel)).call.apply(_ref, [this].concat(args))), _this), _this.onCancelPressed = function () {
      _this.props.removeAllVideos();
      _this.props.history.push('/');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ConvertPanel, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'convert-panel' },
        _react2.default.createElement(
          'button',
          { className: 'btn red', onClick: this.onCancelPressed },
          'Cancel'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn', onClick: this.props.convertVideos },
          'Convert!'
        )
      );
    }
  }]);

  return ConvertPanel;
}(_react.Component);

exports.default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(null, actions)(ConvertPanel));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = __webpack_require__(13);

var _moment2 = _interopRequireDefault(_moment);

__webpack_require__(14);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VIDEO_FORMATS = [{ value: 'avi', option: 'AVI' }, { value: 'm4v', option: 'M4V raw MPEG-4' }, { value: 'mov', option: 'MOV / QuickTime' }, { value: 'mp4', option: 'MP4 / QuickTime' }, { value: 'mpeg', option: 'MPEG' }, { value: 'ogv', option: 'OGV' }];

var VideoList = function (_Component) {
  _inherits(VideoList, _Component);

  function VideoList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VideoList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoList.__proto__ || Object.getPrototypeOf(VideoList)).call.apply(_ref, [this].concat(args))), _this), _this.renderProgressBar = function (_ref2) {
      var duration = _ref2.duration,
          timemark = _ref2.timemark,
          complete = _ref2.complete;

      if (timemark) {
        return 100 - _moment2.default.duration(timemark).asMilliseconds() / (duration * 10) + '%';
      } else if (complete) {
        return '0%';
      } else {
        return '100%';
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VideoList, [{
    key: 'showStatus',
    value: function showStatus(_ref3) {
      var _this2 = this;

      var complete = _ref3.complete,
          timemark = _ref3.timemark,
          outputPath = _ref3.outputPath,
          err = _ref3.err;

      if (complete) {
        return _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.props.onFolderOpen(outputPath);
            }, className: 'btn' },
          'Open Folder'
        );
      } else if (err) {
        return _react2.default.createElement(
          'p',
          { className: 'red-text' },
          err
        );
      }
      return '';
    }
  }, {
    key: 'renderVideos',
    value: function renderVideos() {
      var _this3 = this;

      return _lodash2.default.map(this.props.videos, function (video) {
        var name = video.name,
            path = video.path,
            duration = video.duration,
            format = video.format,
            timemark = video.timemark,
            complete = video.complete,
            outputPath = video.outputPath,
            err = video.err;

        var formatedDuration = _moment2.default.duration(duration, 's').format("hh:mm:ss", { trim: false });
        return _react2.default.createElement(
          'li',
          { className: 'collection-item avatar', key: path },
          _react2.default.createElement('div', { style: _extends({}, styles.progressBar, { right: _this3.renderProgressBar(video) }) }),
          _react2.default.createElement(
            'i',
            { className: 'material-icons circle btn-floating', onClick: function onClick() {
                return _this3.props.removeVideo(video);
              } },
            'clear'
          ),
          _react2.default.createElement(
            'div',
            { style: styles.fileName },
            _react2.default.createElement(
              'p',
              null,
              name
            ),
            _react2.default.createElement(
              'p',
              null,
              formatedDuration
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'secondary-content', style: styles.secondaryContent },
            _react2.default.createElement(
              'select',
              {
                className: complete || timemark ? "hidden" : "browser-default right",
                value: format,
                onChange: function onChange(e) {
                  return _this3.props.onFormatChange(video, e.target.value);
                }
              },
              VIDEO_FORMATS.map(function (outFormat) {
                return _react2.default.createElement(
                  'option',
                  { key: outFormat.value, value: outFormat.value },
                  outFormat.option
                );
              })
            ),
            _this3.showStatus({ complete: complete, timemark: timemark, outputPath: outputPath, err: err })
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'ul',
        { className: 'collection video-list' },
        this.renderVideos()
      );
    }
  }]);

  return VideoList;
}(_react.Component);

var styles = {
  progressBar: {
    transitionProperty: 'right',
    transitionDuration: '0.25s',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#03a9f4',
    opacity: 0.25
  },
  secondaryContent: {
    zIndex: 1,
    width: '180px',
    top: 'auto',
    botton: 'auto'
  },
  fileName: {
    width: '65%'
  }
};

exports.default = VideoList;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(19);

var _reduxThunk = __webpack_require__(20);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _videos_reducer = __webpack_require__(10);

var _videos_reducer2 = _interopRequireDefault(_videos_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  videos: _videos_reducer2.default
});

var store = (0, _redux.createStore)(rootReducer, {}, (0, _redux.applyMiddleware)(_reduxThunk2.default));

exports.default = store;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = __webpack_require__(3);

var _lodash2 = _interopRequireDefault(_lodash);

var _types = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = {};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _types.VIDEO_COMPLETE:
      return _extends({}, state, _defineProperty({}, action.payload.path, _extends({}, action.payload, { complete: true })));
    case _types.VIDEO_PROGRESS:
      return _extends({}, state, _defineProperty({}, action.payload.path, action.payload));
    case _types.ADD_VIDEOS:
      return _extends({}, state, _lodash2.default.mapKeys(action.payload, 'path'));
    case _types.ADD_VIDEO:
      return _extends({}, state, _defineProperty({}, action.payload.path, action.payload));
    case _types.REMOVE_VIDEO:
      return _lodash2.default.omit(state, action.payload.path);
    case _types.REMOVE_ALL_VIDEOS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _VideoList = __webpack_require__(8);

var _VideoList2 = _interopRequireDefault(_VideoList);

var _ConvertPanel = __webpack_require__(7);

var _ConvertPanel2 = _interopRequireDefault(_ConvertPanel);

var _VideoSelectScreen = __webpack_require__(5);

var _VideoSelectScreen2 = _interopRequireDefault(_VideoSelectScreen);

var _actions = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConvertScreen = function (_Component) {
  _inherits(ConvertScreen, _Component);

  function ConvertScreen() {
    _classCallCheck(this, ConvertScreen);

    return _possibleConstructorReturn(this, (ConvertScreen.__proto__ || Object.getPrototypeOf(ConvertScreen)).apply(this, arguments));
  }

  _createClass(ConvertScreen, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(_VideoSelectScreen2.default, { small: true }),
        _react2.default.createElement(_VideoList2.default, {
          videos: this.props.videos,
          onFormatChange: this.props.setFormat,
          onFolderOpen: this.props.showInFolder,
          removeVideo: this.props.removeVideo

        }),
        _react2.default.createElement(_ConvertPanel2.default, null)
      );
    }
  }]);

  return ConvertScreen;
}(_react.Component);

function mapStateToProps(state) {
  return { videos: state.videos };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { setFormat: _actions.setFormat, removeVideo: _actions.removeVideo, showInFolder: _actions.showInFolder })(ConvertScreen);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("moment-duration-format");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react-dropzone");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ })
/******/ ]);