import {Schema, type, MapSchema, ArraySchema} from "@colyseus/schema";


export class CardSchema extends Schema {

    @type("string")
    id: string;
    @type("number")
    cardType: number;
    @type("number")
    rank: number;
    @type("number")
    value: number;
    @type("boolean")
    isFace: boolean;
    @type("boolean")
    isHouse: boolean;
}

export class Team extends Schema {
    @type('string')
    teamId: string;
    @type([CardSchema])
    bucket: CardSchema[] = new ArraySchema();
}

class PlayeMove extends Schema {
    @type('number')
    moveType: number;
    @type(CardSchema)
    card: CardSchema;
}

 export class House extends  Schema{
    @type('string')
    houseId: string;

    @type('number')
    houseNo: number;

    @type([CardSchema])
    cards: CardSchema[] = new ArraySchema<CardSchema>();
}

export class Player extends Schema {
    @type("boolean")
    connected: boolean;

    @type("string")
    sessionId: string;

    @type("string")
    id: string;

    @type("string")
    name: string;

    @type([CardSchema])
    cardsInHand: CardSchema[] = new ArraySchema<CardSchema>();

    @type(PlayeMove)
    move: PlayeMove;

    @type('string')
    partnerSessionId: string;

    @type([House])
    ownedHouses: House[] = new ArraySchema<House>();

    @type([CardSchema])
    cardsInBucket: CardSchema[] = new ArraySchema<CardSchema>();

    @type("boolean")
    isHisMove: boolean;

    @type("number")
    remainingSecs: number = 30

    @type("number")
    seatNo: number;

    @type(Team)
    team: Team;

}

export class Message extends Schema{

    @type("string")
    str: string;

    @type("number")
    type: number;
}

class WhatsOnTable extends Schema{
    @type([House])
    houses: House[] = new ArraySchema<House>();

    @type([CardSchema])
    orphanCards: CardSchema[] = new ArraySchema<CardSchema>();
}

export class RoomState extends Schema {

    @type({map: Player})
    entities = new MapSchema<Player>();

    @type(WhatsOnTable)
    whatsOnTable: WhatsOnTable;

    @type({map: Team})
    teams = new MapSchema<Team>();

}

export class  HouseContributionMessage extends Schema{

    @type("string")
    houseId: string;

    @type(["string"])
    cardIds: string[];

}

export class  HouseCreateMessage extends Schema{

    @type(["string"])
    cardIds: string[];

    @type('number')
    houseValue: number;

}

export  class CardThrowMessage extends Schema{

    @type("string")
    cardId: string;

}

export  class CardPickMessage extends Schema{

    @type("string")
    pickedCardId: string;

    @type("string")
    fromCardId: string;

}
