function log(...args) {
    console.log(`[$API][$TS=${Date.now()}][$LOG]`, ...args);
}
export function logm(arg) {
    console.log(`[$API][$TS=${Date.now()}][$LOG]`, arg.substring(0, arg.length - 1));
}
export function error(...args) {
    console.error(`[$API][$TS=${Date.now()}][$ERR]`, ...args);
}
log.error = error;
export default log;
//# sourceMappingURL=log.js.map