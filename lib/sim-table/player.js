"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@colyseus/schema");
class CardSchema extends schema_1.Schema {
}
__decorate([
    schema_1.type("string")
], CardSchema.prototype, "id", void 0);
__decorate([
    schema_1.type("number")
], CardSchema.prototype, "cardType", void 0);
__decorate([
    schema_1.type("number")
], CardSchema.prototype, "rank", void 0);
__decorate([
    schema_1.type("number")
], CardSchema.prototype, "value", void 0);
__decorate([
    schema_1.type("boolean")
], CardSchema.prototype, "isFace", void 0);
__decorate([
    schema_1.type("boolean")
], CardSchema.prototype, "isHouse", void 0);
exports.CardSchema = CardSchema;
class PlayeMove extends schema_1.Schema {
}
__decorate([
    schema_1.type('number')
], PlayeMove.prototype, "moveType", void 0);
__decorate([
    schema_1.type(CardSchema)
], PlayeMove.prototype, "card", void 0);
class House extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.cards = new schema_1.ArraySchema();
    }
}
__decorate([
    schema_1.type('string')
], House.prototype, "houseValue", void 0);
__decorate([
    schema_1.type([CardSchema])
], House.prototype, "cards", void 0);
class Player extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.cardsInHand = new schema_1.ArraySchema();
        this.ownedHouses = new schema_1.ArraySchema();
        this.cardsInBucket = new schema_1.ArraySchema();
        this.remainingSecs = 30;
    }
}
__decorate([
    schema_1.type("boolean")
], Player.prototype, "connected", void 0);
__decorate([
    schema_1.type("string")
], Player.prototype, "sessionId", void 0);
__decorate([
    schema_1.type("string")
], Player.prototype, "id", void 0);
__decorate([
    schema_1.type("string")
], Player.prototype, "name", void 0);
__decorate([
    schema_1.type([CardSchema])
], Player.prototype, "cardsInHand", void 0);
__decorate([
    schema_1.type(PlayeMove)
], Player.prototype, "move", void 0);
__decorate([
    schema_1.type('string')
], Player.prototype, "partnerSessionId", void 0);
__decorate([
    schema_1.type([House])
], Player.prototype, "ownedHouses", void 0);
__decorate([
    schema_1.type([CardSchema])
], Player.prototype, "cardsInBucket", void 0);
__decorate([
    schema_1.type("boolean")
], Player.prototype, "isHisMove", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "remainingSecs", void 0);
exports.Player = Player;
class Message extends schema_1.Schema {
}
__decorate([
    schema_1.type("string")
], Message.prototype, "str", void 0);
__decorate([
    schema_1.type("number")
], Message.prototype, "type", void 0);
exports.Message = Message;
class RoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.entities = new schema_1.MapSchema();
    }
}
__decorate([
    schema_1.type({ map: Player })
], RoomState.prototype, "entities", void 0);
exports.RoomState = RoomState;
