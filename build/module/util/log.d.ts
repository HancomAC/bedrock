declare function log(...args: any[]): void;
declare namespace log {
    var error: typeof import("./log").error;
}
export declare function logm(arg: string): void;
export declare function error(...args: any[]): void;
export default log;
