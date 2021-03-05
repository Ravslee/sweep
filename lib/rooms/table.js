"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const card_1 = require("../sim-table/card");
const handler_1 = require("./handler");
const schema_1 = require("@colyseus/schema");
const MAX_CLIENTS = 1;
class Table {
    constructor(gameRoom) {
        this.gameRoom = gameRoom;
        this.deck = card_1.CardRules.getDeck();
        logger_1.Logger.i(">>> TABLE INITIALIZED <<<");
        this.handler = new handler_1.Handler(gameRoom); // set Handler
    }
    startMatch() {
        logger_1.Logger.i(">>> MATCH STARTED <<<");
        //SHUFFLE CARDS
        this.shuffleDeck(this.deck);
        logger_1.Logger.i(">>> DECK SHUFFLED <<<");
        //TODO:1 FOR TESTING, WITH SINGLE CLIENT, COMMENT THIS
        // this.playerStartedAt = Math.floor((Math.random() * MAX_CLIENTS) + 1);
        //TODO:1 FOR TESTING, WITH SINGLE CLIENT, UNCOMMENT THIS
        this.playerStartedAt = 0;
        //Biding, serve only 4 cards to this player.
        let client = this.gameRoom.mClients[this.playerStartedAt];
        let playerToBid = this.gameRoom.state.entities[client.sessionId];
        playerToBid.cardsInHand = new schema_1.ArraySchema();
        let valid = false;
        while (!valid) {
            for (let i = 0; i < 4; i++) {
                playerToBid.cardsInHand.push(this.deck[i]);
            }
            valid = !!playerToBid.cardsInHand.find((card) => card.isFace);
        }
        playerToBid.isHisMove = true;
    }
    ensureClients() {
        //TODO 1. CHECK IF ALL CLIENTS ARE CONNECTED
        return true;
    }
    serveCard() {
    }
    shuffleDeck(array) {
        array.sort(() => Math.random() - 0.5);
    }
}
exports.Table = Table;
