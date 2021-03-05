"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colyseus_1 = require("colyseus");
const table_1 = require("./table");
const logger_1 = require("../logger");
const player_1 = require("../sim-table/player");
const MAX_CLIENTS = 2;
class GameRoom extends colyseus_1.Room {
    onCreate(options) {
        logger_1.Logger.i(">>> GAME ROOM CREATED <<<");
        this.setState(new player_1.RoomState());
        this.initRoom();
        return undefined;
    }
    onJoin(client, options, auth) {
        logger_1.Logger.i("CLIENT JOINED :: " + client.sessionId);
        this.state.entities[client.sessionId] = this.initPlayer(client, options);
        this.clients.push(client);
        logger_1.Logger.i("Total Clients ::" + this.clients.length);
        // if (this.mClients.length === MAX_CLIENTS) {
        this.table.startMatch();
        // }
        return undefined;
    }
    onLeave(client, consented) {
        logger_1.Logger.i("Client Left ::" + client.sessionId);
        this.clients = this.clients.filter(cl => cl.sessionId !== client.sessionId);
        logger_1.Logger.i("Total Clients ::" + this.clients.length);
        undefined;
    }
    onDispose() {
        logger_1.Logger.i(">>> GAME ROOM DISPOSED <<<");
        return undefined;
    }
    initRoom() {
        logger_1.Logger.i(">>> GAME ROOM INITIALIZED <<<");
        this.clients = [];
        this.table = new table_1.Table(this);
    }
    initPlayer(client, options) {
        let player = new player_1.Player();
        player.sessionId = client.sessionId;
        player.name = options.name;
        return player;
    }
}
exports.GameRoom = GameRoom;
