"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("./player");
class CardType {
}
exports.CardType = CardType;
// clubs (♣), diamonds ( ), hearts (♥) and spades (♠)
CardType.CLUBS = 1;
CardType.DIAMONDS = 2;
CardType.HEARTS = 3;
CardType.SPADES = 4;
const CardTypes = ['Club', 'Diamond', 'Spade', 'Heart'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const CardValues = {
    [CardType.DIAMONDS + "-" + ranks[0]]: 1,
    [CardType.DIAMONDS + "-" + ranks[1]]: 0,
    [CardType.DIAMONDS + "-" + ranks[2]]: 0,
    [CardType.DIAMONDS + "-" + ranks[3]]: 0,
    [CardType.DIAMONDS + "-" + ranks[4]]: 0,
    [CardType.DIAMONDS + "-" + ranks[5]]: 0,
    [CardType.DIAMONDS + "-" + ranks[6]]: 0,
    [CardType.DIAMONDS + "-" + ranks[7]]: 0,
    [CardType.DIAMONDS + "-" + ranks[8]]: 0,
    [CardType.DIAMONDS + "-" + ranks[9]]: 6,
    [CardType.DIAMONDS + "-" + ranks[10]]: 0,
    [CardType.DIAMONDS + "-" + ranks[11]]: 0,
    [CardType.DIAMONDS + "-" + ranks[12]]: 0,
    [CardType.SPADES + "-" + ranks[0]]: 1,
    [CardType.SPADES + "-" + ranks[1]]: 2,
    [CardType.SPADES + "-" + ranks[2]]: 3,
    [CardType.SPADES + "-" + ranks[3]]: 4,
    [CardType.SPADES + "-" + ranks[4]]: 5,
    [CardType.SPADES + "-" + ranks[5]]: 6,
    [CardType.SPADES + "-" + ranks[6]]: 7,
    [CardType.SPADES + "-" + ranks[7]]: 8,
    [CardType.SPADES + "-" + ranks[8]]: 9,
    [CardType.SPADES + "-" + ranks[9]]: 10,
    [CardType.SPADES + "-" + ranks[10]]: 11,
    [CardType.SPADES + "-" + ranks[11]]: 12,
    [CardType.SPADES + "-" + ranks[12]]: 13,
    [CardType.HEARTS + "-" + ranks[0]]: 1,
    [CardType.HEARTS + "-" + ranks[1]]: 0,
    [CardType.HEARTS + "-" + ranks[2]]: 0,
    [CardType.HEARTS + "-" + ranks[3]]: 0,
    [CardType.HEARTS + "-" + ranks[4]]: 0,
    [CardType.HEARTS + "-" + ranks[5]]: 0,
    [CardType.HEARTS + "-" + ranks[6]]: 0,
    [CardType.HEARTS + "-" + ranks[7]]: 0,
    [CardType.HEARTS + "-" + ranks[8]]: 0,
    [CardType.HEARTS + "-" + ranks[9]]: 0,
    [CardType.HEARTS + "-" + ranks[10]]: 0,
    [CardType.HEARTS + "-" + ranks[11]]: 0,
    [CardType.HEARTS + "-" + ranks[12]]: 0,
    [CardType.CLUBS + "-" + ranks[0]]: 1,
    [CardType.CLUBS + "-" + ranks[1]]: 0,
    [CardType.CLUBS + "-" + ranks[2]]: 0,
    [CardType.CLUBS + "-" + ranks[3]]: 0,
    [CardType.CLUBS + "-" + ranks[4]]: 0,
    [CardType.CLUBS + "-" + ranks[5]]: 0,
    [CardType.CLUBS + "-" + ranks[6]]: 0,
    [CardType.CLUBS + "-" + ranks[7]]: 0,
    [CardType.CLUBS + "-" + ranks[8]]: 0,
    [CardType.CLUBS + "-" + ranks[9]]: 0,
    [CardType.CLUBS + "-" + ranks[10]]: 0,
    [CardType.CLUBS + "-" + ranks[11]]: 0,
    [CardType.CLUBS + "-" + ranks[12]]: 0,
};
//  export const Cards: CardSchema[] = [
//     {id: 1, type: CardType.SPADES, rank: 1, isFace: true, isHouse: false, value: CardValues[`${CardType.SPADES}-1`]},
//     {id: 2,type: CardType.SPADES, rank: 2, isFace: false, isHouse: false, value: CardValues[`${CardType.SPADES}-2`]},
//     {id: 3,type: CardType.SPADES, rank: 3, isFace: false, isHouse: false, value: CardValues[`${CardType.SPADES}-3`]},
//     {id: 4,type: CardType.SPADES, rank: 4, isFace: false, isHouse: false, value: CardValues[`${CardType.SPADES}-4`]},
//     {id: 5,type: CardType.SPADES, rank: 5, isFace: false, isHouse: false, value: CardValues[`${CardType.SPADES}-5`]},
//     {id: 6,type: CardType.SPADES, rank: 6, isFace: false, isHouse: false, value: CardValues[`${CardType.SPADES}-6`]},
//     {id: 7,type: CardType.SPADES, rank: 7, isFace: false, isHouse: false, value: CardValues[`${CardType.SPADES}-7`]},
//     {id: 8,type: CardType.SPADES, rank: 8, isFace: false, isHouse: false, value: CardValues[`${CardType.SPADES}-8`]},
//     {id: 9,type: CardType.SPADES, rank: 9, isFace: false, isHouse: true, value: CardValues[`${CardType.SPADES}-9`]},
//     {id: 10,type: CardType.SPADES, rank: 10, isFace: true, isHouse: true, value: CardValues[`${CardType.SPADES}-10`]},
//     {id: 11,type: CardType.SPADES, rank: 11, isFace: true, isHouse: true, value: CardValues[`${CardType.SPADES}-11`]},
//     {id: 12,type: CardType.SPADES, rank: 12, isFace: true, isHouse: true, value: CardValues[`${CardType.SPADES}-12`]},
//     {id: 13,type: CardType.SPADES, rank: 13, isFace: true, isHouse: true, value: CardValues[`${CardType.SPADES}-13`]},
//
//     {id: 14,type: CardType.HEARTS, rank: 1, isFace: true, isHouse: false, value: CardValues[`${CardType.HEARTS}-1`]},
//     {id: 15,type: CardType.HEARTS, rank: 2, isFace: false, isHouse: false, value: CardValues[`${CardType.HEARTS}-2`]},
//     {id: 16,type: CardType.HEARTS, rank: 3, isFace: false, isHouse: false, value: CardValues[`${CardType.HEARTS}-3`]},
//     {id: 17,type: CardType.HEARTS, rank: 4, isFace: false, isHouse: false, value: CardValues[`${CardType.HEARTS}-4`]},
//     {id: 18,type: CardType.HEARTS, rank: 5, isFace: false, isHouse: false, value: CardValues[`${CardType.HEARTS}-5`]},
//     {id: 19,type: CardType.HEARTS, rank: 6, isFace: false, isHouse: false, value: CardValues[`${CardType.HEARTS}-6`]},
//     {id: 20,type: CardType.HEARTS, rank: 7, isFace: false, isHouse: false, value: CardValues[`${CardType.HEARTS}-7`]},
//     {id: 21,type: CardType.HEARTS, rank: 8, isFace: false, isHouse: false, value: CardValues[`${CardType.HEARTS}-8`]},
//     {id: 22,type: CardType.HEARTS, rank: 9, isFace: false, isHouse: true, value: CardValues[`${CardType.HEARTS}-9`]},
//     {id: 23,type: CardType.HEARTS, rank: 10, isFace: true, isHouse: true, value: CardValues[`${CardType.HEARTS}-10`]},
//     {id: 24,type: CardType.HEARTS, rank: 11, isFace: true, isHouse: true, value: CardValues[`${CardType.HEARTS}-11`]},
//     {id: 25,type: CardType.HEARTS, rank: 12, isFace: true, isHouse: true, value: CardValues[`${CardType.HEARTS}-12`]},
//     {id: 26,type: CardType.HEARTS, rank: 13, isFace: true, isHouse: true, value: CardValues[`${CardType.HEARTS}-13`]},
//
//     {id: 27,type: CardType.DIAMONDS, rank: 1, isFace: true, isHouse: false, value: CardValues[`${CardType.DIAMONDS}-1`]},
//     {id: 28,type: CardType.DIAMONDS, rank: 2, isFace: false, isHouse: false, value: CardValues[`${CardType.DIAMONDS}-2`]},
//     {id: 29,type: CardType.DIAMONDS, rank: 3, isFace: false, isHouse: false, value: CardValues[`${CardType.DIAMONDS}-3`]},
//     {id: 30,type: CardType.DIAMONDS, rank: 4, isFace: false, isHouse: false, value: CardValues[`${CardType.DIAMONDS}-4`]},
//     {id: 31,type: CardType.DIAMONDS, rank: 5, isFace: false, isHouse: false, value: CardValues[`${CardType.DIAMONDS}-5`]},
//     {id: 32,type: CardType.DIAMONDS, rank: 6, isFace: false, isHouse: false, value: CardValues[`${CardType.DIAMONDS}-6`]},
//     {id: 33,type: CardType.DIAMONDS, rank: 7, isFace: false, isHouse: false, value: CardValues[`${CardType.DIAMONDS}-7`]},
//     {id: 34,type: CardType.DIAMONDS, rank: 8, isFace: false, isHouse: false, value: CardValues[`${CardType.DIAMONDS}-8`]},
//     {id: 35,type: CardType.DIAMONDS, rank: 9, isFace: false, isHouse: true, value: CardValues[`${CardType.DIAMONDS}-9`]},
//     {id: 36,type: CardType.DIAMONDS, rank: 10, isFace: true, isHouse: true, value: CardValues[`${CardType.DIAMONDS}-10`]},
//     {id: 37,type: CardType.DIAMONDS, rank: 11, isFace: true, isHouse: true, value: CardValues[`${CardType.DIAMONDS}-11`]},
//     {id: 38,type: CardType.DIAMONDS, rank: 12, isFace: true, isHouse: true, value: CardValues[`${CardType.DIAMONDS}-12`]},
//     {id: 39,type: CardType.DIAMONDS, rank: 13, isFace: true, isHouse: true, value: CardValues[`${CardType.DIAMONDS}-13`]},
//
//     {id: 40,type: CardType.CLUBS, rank: 1, isFace: true, isHouse: false, value: CardValues[`${CardType.CLUBS}-1`]},
//     {id: 41,type: CardType.CLUBS, rank: 2, isFace: false, isHouse: false, value: CardValues[`${CardType.CLUBS}-2`]},
//     {id: 42,type: CardType.CLUBS, rank: 3, isFace: false, isHouse: false, value: CardValues[`${CardType.CLUBS}-3`]},
//     {id: 43,type: CardType.CLUBS, rank: 4, isFace: false, isHouse: false, value: CardValues[`${CardType.CLUBS}-4`]},
//     {id: 44,type: CardType.CLUBS, rank: 5, isFace: false, isHouse: false, value: CardValues[`${CardType.CLUBS}-5`]},
//     {id: 45,type: CardType.CLUBS, rank: 6, isFace: false, isHouse: false, value: CardValues[`${CardType.CLUBS}-6`]},
//     {id: 46,type: CardType.CLUBS, rank: 7, isFace: false, isHouse: false, value: CardValues[`${CardType.CLUBS}-7`]},
//     {id: 47,type: CardType.CLUBS, rank: 8, isFace: false, isHouse: false, value: CardValues[`${CardType.CLUBS}-8`]},
//     {id: 48,type: CardType.CLUBS, rank: 9, isFace: false, isHouse: true, value: CardValues[`${CardType.CLUBS}-9`]},
//     {id: 49,type: CardType.CLUBS, rank: 10, isFace: true, isHouse: true, value: CardValues[`${CardType.CLUBS}-10`]},
//     {id: 50,type: CardType.CLUBS, rank: 11, isFace: true, isHouse: true, value: CardValues[`${CardType.CLUBS}-11`]},
//     {id: 51,type: CardType.CLUBS, rank: 12, isFace: true, isHouse: true, value: CardValues[`${CardType.CLUBS}-12`]},
//     {id: 52,type: CardType.CLUBS, rank: 13, isFace: true, isHouse: true, value: CardValues[`${CardType.CLUBS}-13`]},
//
//
// ];
class CardRules {
    static getCardValue(card) {
        return CardValues[`${card.type}-${card.rank}`];
    }
    static isFaceCard(card) {
        return card.rank === 1 || card.rank > 10;
    }
    static isHouseCard(card) {
        return card.rank > 8;
    }
    static getDeck() {
        let id = 1;
        let deck = [];
        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 13; j++) {
                let card = new player_1.CardSchema();
                card.id = j <= 9 ? `${CardTypes[i - 1]}0${j}` : `${CardTypes[i - 1]}${j}`;
                card.cardType = i;
                card.rank = j;
                card.value = CardValues[`${i}-${j}`];
                card.isFace = card.rank === 1 || card.rank > 10;
                card.isHouse = card.rank > 8;
                deck.push(card);
            }
        }
        return deck;
    }
}
exports.CardRules = CardRules;
