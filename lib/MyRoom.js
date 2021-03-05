"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const colyseus_1 = require("colyseus");
const schema_1 = require("@colyseus/schema");
class Entity extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.name = "";
    }
}
__decorate([
    schema_1.type("string")
], Entity.prototype, "name", void 0);
class Player extends Entity {
    constructor() {
        super(...arguments);
        this.connected = true;
    }
}
__decorate([
    schema_1.type("boolean")
], Player.prototype, "connected", void 0);
class State extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.entities = new schema_1.MapSchema();
    }
}
__decorate([
    schema_1.type({ map: Entity })
], State.prototype, "entities", void 0);
class Message extends schema_1.Schema {
}
__decorate([
    schema_1.type("number")
], Message.prototype, "num", void 0);
__decorate([
    schema_1.type("string")
], Message.prototype, "str", void 0);
class MyRoom extends colyseus_1.Room {
    onCreate(options) {
        console.log("MyRoom", options);
        this.setState(new State());
        this.onMessage("*", (client, type, message) => {
            console.log(message);
        });
    }
    onJoin(client, options) {
        console.log("client joined!", client.sessionId);
        this.state.entities[client.sessionId] = new Player();
        client.send("type", { hello: true });
    }
    onLeave(client, consented) {
    }
    onDispose() {
    }
}
exports.MyRoom = MyRoom;
