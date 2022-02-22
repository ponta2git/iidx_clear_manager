(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./resources/js/scores/Chart.js":
/*!**************************************!*\
  !*** ./resources/js/scores/Chart.js ***!
  \**************************************/
/*! exports provided: Chart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart", function() { return Chart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}


var Chart = function Chart(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      showDetail = _useState2[0],
      setShowDetail = _useState2[1];

  var setLamp = function setLamp() {
    switch (props.chart.clear_lamp_id) {
      case 1:
        return 'lamp lamp-failed';

      case 2:
        return 'lamp lamp-assist';

      case 3:
        return 'lamp lamp-easy';

      case 4:
        return 'lamp lamp-clear';

      case 5:
        return 'lamp lamp-hard';

      case 6:
        return 'lamp lamp-exh';

      case 7:
        return 'lamp lamp-fc';

      default:
        return 'lamp';
    }
  };

  var handleClickChartName = function handleClickChartName(e) {
    setShowDetail(!showDetail);
  };

  var handleChangeClearLamp = function handleChangeClearLamp(value) {
    props.onChangeClearLamp(value, props.chart.chart_id, props.index);

    if (props.closeAfter === 1) {
      setShowDetail(false);
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "chart-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: setLamp()
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "chart-info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "chart-name",
    onClick: handleClickChartName
  }, props.chart.chart_name), showDetail ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "detail"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "clear-lamp"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: function onClick() {
      handleChangeClearLamp(0);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "N")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: function onClick() {
      handleChangeClearLamp(1);
    },
    className: "lamp-failed"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "F")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: function onClick() {
      handleChangeClearLamp(2);
    },
    className: "lamp-assist"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "A")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: function onClick() {
      handleChangeClearLamp(3);
    },
    className: "lamp-easy"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "E")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: function onClick() {
      handleChangeClearLamp(4);
    },
    className: "lamp-clear"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "C")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: function onClick() {
      handleChangeClearLamp(5);
    },
    className: "lamp-hard"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "H")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: function onClick() {
      handleChangeClearLamp(6);
    },
    className: "lamp-exh"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "EXH")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: function onClick() {
      handleChangeClearLamp(7);
    },
    className: "lamp-fc"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "FC")))) : ""));
};

/***/ }),

/***/ "./resources/js/scores/ChartList.js":
/*!******************************************!*\
  !*** ./resources/js/scores/ChartList.js ***!
  \******************************************/
/*! exports provided: ChartList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartList", function() { return ChartList; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Chart */ "./resources/js/scores/Chart.js");
/* harmony import */ var _ChartListHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChartListHeader */ "./resources/js/scores/ChartListHeader.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}





var ChartList = function ChartList(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      charts = _useState2[0],
      setCharts = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var fetchCharts = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios__WEBPACK_IMPORTED_MODULE_4___default.a.get("/api/charts", {
                  params: {
                    type: props.settings.sort_type,
                    subtype: props.settings.sub_sort_type,
                    order: props.settings.sort_order
                  }
                }).then(function (res) {
                  setCharts(res.data);
                })["catch"](function (error) {
                  console.log(error);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function fetchCharts() {
        return _ref.apply(this, arguments);
      };
    }();

    fetchCharts();
  }, [props.settings.sort_type, props.settings.sub_sort_type, props.settings.sort_order]);

  var changeClearLamp = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(value, chart_id, idx) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(charts[idx].clear_lamp_id === value)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              setCharts(function (prevState) {
                var newState = prevState;
                newState[idx].clear_lamp_id = value;
                return Object.assign([], newState);
              });
              _context2.next = 5;
              return axios__WEBPACK_IMPORTED_MODULE_4___default.a.post('/api/clear', {
                headers: {
                  csrfToken: document.getElementsByName('csrf-token').content
                },
                chart_id: chart_id,
                clear_lamp_id: value
              })["catch"](function (error) {
                console.log(error);
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function changeClearLamp(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  var specifyAbility = function specifyAbility(barometer) {
    if (props.settings.sub_sort_type === "exh") {
      if (barometer === -1) return "未登録";
      if (barometer === 12) return "???";
      return "難易度" + (12 - barometer);
    } //easy , clear


    switch (barometer) {
      case 0:
        return "地力S+";

      case 1:
        return "個人差S+";

      case 2:
        return "地力S";

      case 3:
        return "個人差S";

      case 4:
        return "地力A+";

      case 5:
        return "個人差A+";

      case 6:
        return "地力A";

      case 7:
        return "個人差A";

      case 8:
        return "地力B+";

      case 9:
        return "個人差B+";

      case 10:
        return "地力B";

      case 11:
        return "個人差B";

      case 12:
        return "地力C";

      case 13:
        return "個人差C";

      case 14:
        return "地力D";

      case 15:
        return "個人差D";

      case 16:
        return "地力E";

      case 17:
        return "個人差E";

      case 18:
        return "地力F";

      case 19:
        return "未登録";
    }
  };

  var contentHeader = function contentHeader(memo, barometer) {
    if (props.settings.sort_type === 'ability') {
      return memo !== barometer ? specifyAbility(barometer) : null;
    } //cpi


    if (memo === "") return "未登録";
    barometer = Math.floor(barometer / 10);
    memo = Math.floor(memo / 10);
    if (memo === null && barometer > 0) return barometer;
    if (barometer > memo) return barometer * 10;
    return null;
  };

  var showCharts = function showCharts() {
    var memo = "";
    var chartTags = charts.map(function (chart, idx) {
      var res;
      var headerContent = contentHeader(memo, chart.barometer);

      if (headerContent !== null) {
        memo = chart.barometer;
        res = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ChartListHeader__WEBPACK_IMPORTED_MODULE_3__["ChartListHeader"], {
          headerContent: headerContent,
          barometerType: props.settings.sort_type,
          barometerSubType: props.settings.sub_sort_type
        });
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
        key: idx
      }, res, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Chart__WEBPACK_IMPORTED_MODULE_2__["Chart"], {
        key: chart.chart_id,
        chart: chart,
        index: idx,
        closeAfter: props.settings.close_after_set_result,
        onChangeClearLamp: changeClearLamp
      }));
    });
    return chartTags;
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, showCharts()));
};

/***/ }),

/***/ "./resources/js/scores/ChartListHeader.js":
/*!************************************************!*\
  !*** ./resources/js/scores/ChartListHeader.js ***!
  \************************************************/
/*! exports provided: ChartListHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartListHeader", function() { return ChartListHeader; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ChartListHeader = function ChartListHeader(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "chart-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "chart-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, props.headerContent)));
};

/***/ })

}]);