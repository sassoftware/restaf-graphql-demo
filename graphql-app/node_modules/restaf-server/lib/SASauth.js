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
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bell = require('bell'),
    debug = require('debug')('auth'),
    qs = require('qs'),
    uuid = require('uuid'),
    cookie = require('hapi-auth-cookie');

function SASauth(_x) {
  return _SASauth.apply(this, arguments);
}

function _SASauth() {
  _SASauth = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(hapiServer) {
    var authCookieOptions, bellAuthOptions, provider, authURL;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //TBD: do we need keepalive?
            authCookieOptions = {
              password: uuid.v4(),
              cookie: 'authCookie',
              domain: process.env.APPHOST,
              isSecure: false,
              isSameSite: process.env.SAMESITE != null ? process.env.SAMESITE : 'Strict',
              validateFunc: function () {
                var _validateFunc = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(req, session) {
                  var credentials;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!(process.env.PROXYSERVER === 'YES')) {
                            _context.next = 7;
                            break;
                          }

                          _context.next = 3;
                          return req.server.app.cache.get(session.sid);

                        case 3:
                          credentials = _context.sent;
                          return _context.abrupt("return", {
                            valid: true,
                            credentials: credentials
                          });

                        case 7:
                          return _context.abrupt("return", {
                            valid: true,
                            credentials: req.auth.credentials
                          });

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                function validateFunc(_x2, _x3) {
                  return _validateFunc.apply(this, arguments);
                }

                return validateFunc;
              }()
            };

            if (!(process.env.OAUTH2 === 'YES')) {
              _context2.next = 13;
              break;
            }

            authURL = process.env.VIYA_SERVER;
            provider = {
              name: 'sas',
              protocol: 'oauth2',
              useParamsAuth: false,
              auth: authURL + '/SASLogon/oauth/authorize',
              token: authURL + '/SASLogon/oauth/token'
            };
            bellAuthOptions = {
              provider: provider,
              password: uuid.v4(),
              clientId: process.env.CLIENTID,
              clientSecret: process.env.CLIENTSECRET == null ? ' ' : process.env.CLIENTSECRET,
              isSecure: false
            };

            if (process.env.BELL_LOCATION != null) {
              bellAuthOptions.location = process.env.BELL_LOCATION;
            }

            _context2.next = 8;
            return hapiServer.register(bell);

          case 8:
            _context2.next = 10;
            return hapiServer.register(cookie);

          case 10:
            hapiServer.auth.strategy('sas', 'bell', bellAuthOptions);
            hapiServer.auth.strategy('session', 'cookie', authCookieOptions);
            hapiServer.auth.default('session');

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _SASauth.apply(this, arguments);
}

var _default = SASauth;
exports.default = _default;