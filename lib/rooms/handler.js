"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
var Moves;
(function (Moves) {
    Moves[Moves["BID"] = 0] = "BID";
    Moves[Moves["THROW"] = 1] = "THROW";
    Moves[Moves["PICKED"] = 2] = "PICKED";
    Moves[Moves["HOUSE_ADD"] = 3] = "HOUSE_ADD";
    Moves[Moves["HOUSE_CREATE"] = 4] = "HOUSE_CREATE";
    Moves[Moves["SWEEP"] = 5] = "SWEEP";
    Moves[Moves["DEAL"] = 6] = "DEAL";
})(Moves || (Moves = {}));
class Handler {
    constructor(gameRoom) {
        this.gameRoom = gameRoom;
        logger_1.Logger.i(">>> HANDLER INITIALIZED <<<");
        this.gameRoom.onMessage("*", (client, type, message) => {
            console.log(`received message "${type}" from ${client.sessionId}:`, message);
            this.messageRouter(client, type, message);
        });
    }
    messageRouter(client, type, message) {
        switch (type) {
            case Moves.BID: {
                this.bidMoveHandle(client, message);
                break;
            }
            case Moves.THROW: {
                this.cardThrowHandle(client, message);
                break;
            }
            case Moves.HOUSE_CREATE: {
                this.houseCreateHandle(client, message);
                break;
            }
            case Moves.HOUSE_ADD: {
                this.houseAddHandle(client, message);
                break;
            }
            case Moves.SWEEP: {
                this.sweepCallHandle(client, message);
                break;
            }
            case Moves.DEAL: {
                this.dealCard(client, message);
                break;
            }
        }
    }
    sweepCallHandle(client, message) {
        console.log("Sweep done");
    }
    dealCard(client, message) {
        this.gameRoom.mTable.startMatch();
    }
    bidMoveHandle(client, message) {
    }
    cardThrowHandle(client, message) {
    }
    houseCreateHandle(client, message) {
    }
    houseAddHandle(client, message) {
    }
}
exports.Handler = Handler;
