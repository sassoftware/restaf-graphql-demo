/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iapp = iapp;
exports.app = app;
exports.service = service;
exports.UIapp = UIapp;

require("babel-polyfill");

var _fs = _interopRequireDefault(require("fs"));

var _iService = _interopRequireDefault(require("./iService"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UIapp(uTable, rootHandler, rafEnv) {
  var asset = setup(rafEnv);
  (0, _iService.default)(uTable, uTable !== null, asset, rootHandler, null);
}

function service(uTable, rootHandler, rafEnv) {
  var asset = setup(rafEnv);
  (0, _iService.default)(uTable, false, asset, rootHandler, null);
}

function app(appData) {
  var rafEnv = process.argv.length === 3 ? process.argv[2] : null;
  console.log(rafEnv === null ? 'NOTE: Using settings from environment variables' : "NOTE: env file is: ".concat(rafEnv));
  iapp(appData, rafEnv);
}

function iapp(appSrc, rafEnv) {
  var asset = setup(rafEnv);
  var uTable = null;

  if (appSrc !== null) {
    createPayload(appSrc, function (err, appEnv) {
      if (err) {
        console.log(err);
        process.exit(1);
      } else {
        (0, _iService.default)(uTable, uTable !== null, asset, null, appEnv);
      }
    });
  } else {
    var appEnv = getAllEnv(null);
    (0, _iService.default)(uTable, uTable !== null, asset, null, appEnv);
  }
}

function setup(rafEnv) {
  (0, _config.default)(rafEnv);
  var asset = process.env.APPLOC === '.' ? process.cwd() : process.env.APPLOC;
  process.env.APPASSET = asset;
  return asset;
}

function createPayload(srcName, cb) {
  var src = _fs.default.readFileSync(srcName, 'utf8');

  if (src === null) {
    cb("".concat(srcName, " read failed"));
  }

  try {
    // console.log(src);
    var f = new Function(src);
    console.log("".concat(srcName, " compile completed"));
    var r = f();
    f = null;
    var ar = getAllEnv(r);
    cb(null, ar);
  } catch (err) {
    console.log("".concat(srcName, " compile failed"));
    cb(err);
  }
}

function getAllEnv(userData) {
  var env;
  var l;
  var authflow = trimit('AUTHFLOW');

  if (authflow === 'implicit') {
    l = {
      authType: authflow,
      host: trimit('VIYA_SERVER'),
      clientID: trimit('CLIENTID'),
      redirect: "".concat(trimit('APPNAME'), "/").concat(trimit('REDIRECT'))
    };
  } else {
    l = {
      authType: authflow,
      passThru: trimit('VIYA_SERVER')
    };
  }

  env = "let LOGONPAYLOAD = ".concat(JSON.stringify(l), ";");

  if (userData !== null) {
    env += "let APPENV = ".concat(JSON.stringify(userData), ";");
  } else {
    env += "let APPENV = {none: 'none'};";
  }

  return env;
}

function trimit(e) {
  var a = process.env[e];
  return a == null ? null : a.trim();
}