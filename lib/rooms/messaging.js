"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
class Messaging {
    constructor(gameRoom) {
        this.gameRoom = gameRoom;
        logger_1.Logger.i(">>> MESSAGING  INITIALIZED <<<");
    }
    sendGreetMessage(client, msg) {
        this.sendMessage("greeting", client, msg);
    }
    sendMessage(type, client, msg) {
        client.send(msg, {});
    }
}
exports.Messaging = Messaging;
