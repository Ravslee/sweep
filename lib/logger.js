"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static d(msg) {
        console.log(msg);
    }
    static i(msg) {
        console.info(msg);
    }
    static w(msg) {
        console.warn(msg);
    }
    static e(msg) {
        console.error(msg);
    }
}
exports.Logger = Logger;
