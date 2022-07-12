"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.logm = void 0;
function log(...args) {
    console.log(`[$API][$TS=${Date.now()}][$LOG]`, ...args);
}
function logm(arg) {
    console.log(`[$API][$TS=${Date.now()}][$LOG]`, arg.substring(0, arg.length - 1));
}
exports.logm = logm;
function error(...args) {
    console.error(`[$API][$TS=${Date.now()}][$ERR]`, ...args);
}
exports.error = error;
log.error = error;
exports.default = log;
//# sourceMappingURL=log.js.map