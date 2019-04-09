/*
 * A common entrypoint for all components.
 *
 * Does some minimal environment configuration.
 */

require('./bignumber')

// Bluebird has the ability to include the entire call stack in a Promise (ie,
// including the original caller).
// This incurs a 4x-5x performance penalty, though, so only use it in dev +
// staging... but use Bluebird promises unconditionally to minimize the
// differences between production, staging, and dev.
global.Promise = require('bluebird')
global.Promise = require('bluebird')
;(Promise as any).longStackTraces()

// Enable more verbose debug logging outside of production
if (process.env.NODE_ENV != 'production') {
  let debug = require('debug')
  debug.enable([
    '-nodemon',
    '-express:application',
    '-sequelize:hooks',
    '-express:router*',
    '-socket.io:namespace',
    '-nock.*',
    '-mocha:*',
    '-sequelize:sql:pg',
    '-sequelize:connection:pg',
    '-follow-redirects',
    '-connect:redis',
    '-express-session',
  ].join(','))
}

;(global as any).fetch = require('fetch-ponyfill')().fetch

