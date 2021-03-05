"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MsgTypes;
(function (MsgTypes) {
    MsgTypes[MsgTypes["GREETING"] = 0] = "GREETING";
    MsgTypes[MsgTypes["PLAYER_BID"] = 1] = "PLAYER_BID";
    MsgTypes[MsgTypes["MOVE_REQUEST"] = 2] = "MOVE_REQUEST";
    MsgTypes[MsgTypes["MOVE_SUCCESS"] = 3] = "MOVE_SUCCESS";
    MsgTypes[MsgTypes["SERVE_BID"] = 4] = "SERVE_BID";
    MsgTypes[MsgTypes["SERVE_CARDS"] = 5] = "SERVE_CARDS";
})(MsgTypes = exports.MsgTypes || (exports.MsgTypes = {}));
