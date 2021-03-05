import {GameRoom} from "./game-room";

import {BaseRules} from "./base-rules";
import {CardSchema, House, Player} from "../sim-table/player";
import {Util} from "../utils/util";
import {CardRules, CardType} from "../sim-table/card";
import {ErrorCodes} from "../types/ErrorCodes";
import {Result} from "../types/result";

export class Rules implements BaseRules {
    public deck: CardSchema[];
    public cardDictionary: { [cardId: string]: CardSchema };

    constructor(private gameRoom: GameRoom) {
        this.deck = CardRules.getDeck();
        this.deck.forEach((card) => {
            this.cardDictionary[card.id] = card;
        })
    }

    //Move Methods
    bidValidate(cardsId: string[], bidVal: number, sessionId: string) {
        return bidVal >= 9;
    }

    throwValidate(cardId: string, sessionId: string) {
        /*
        * 5. check if card with same no is on table,if yes , remove them from table and add to teams bucket.
        * 1. add card to cards on table
        * 2. remove card from players hand
        * 3. check if seep applicable
        * */
        let card = this.gameRoom.state.entities[sessionId].cardsInHand.find(card => card.id === cardId);
        if (!card) return false;

        this.addCardToTable(card);
        this.removeCardFromPlayer(cardId, sessionId);
        this.checkIfSeepApplicable(this.cardDictionary[cardId]);
        return true;
    }

    houseCreateValidate(cardsIds: string[], sessionId: string) {
        //TODO: LATER Check if the house already exits on a table. If yes, do contribution to same house.
        /*
        * 1. Check if he has face card of a house, he is trying to create
        * 2. If Yes, Check if the house already exits on a table. If yes, do contribution to same house.
        * 3. If No, Check if limit of houses on table exceeded
        * 4. If Yes, return false, saying house no. exceeded.
        * 5. If No, return true, and add a new house to array of houses.
        * */

        // check if
        const canCreate = this.canCreateHouseOnTable(this.gameRoom.state.entities[sessionId], cardsIds)

        if (canCreate.can) {
            //create house
            //add card to cards house
            // remove card from players hand
            // remove cards from table if any
            let house = this.createHouse(canCreate.ofNo);
            cardsIds.forEach((cardId) => house.cards.push(this.cardDictionary[cardId]));
            this.gameRoom.state.whatsOnTable.houses.push(house);
            house.cards.push()

            const playerCard = Util.getPlayerCard(this.gameRoom.state.entities[sessionId], cardsIds);
            this.removeCardFromPlayer(playerCard.id, sessionId);

            this.removeOrphanCardFromTable(cardsIds);
            return true;
        }

        return false;
    }

    houseContributeValidate(houseId: string, cardsIds: string[], sessionId: string) {
        const player = this.gameRoom.state.entities[sessionId];
        const result = this.canContribute(houseId, player, cardsIds);
        if (result.success) {
            //remove card from player
            //remove card from orphans
            //add cards to house
            const playerCard = Util.getPlayerCard(this.gameRoom.state.entities[sessionId], cardsIds);
            this.removeCardFromPlayer(playerCard.id, sessionId);
            this.removeOrphanCardFromTable(cardsIds);
            const cards = this.getAllCards(cardsIds);
            const house = this.gameRoom.state.whatsOnTable.houses.find((house) => houseId === house.houseId);
            house.cards.push(...cards);
            return true;
        }

        return true;
    }

    pickCardValidate(cardsIds: string[], sessionId: string) {
        const result = this.canPickCard(cardsIds, sessionId);
        if (result) {
            // remove card from player
            // remove cards from table
            // add cards to teams bucket.
            const playerCard = Util.getPlayerCard(this.gameRoom.state.entities[sessionId], cardsIds);

            this.removeCardFromPlayer(playerCard.id, sessionId);
            this.removeAndAddToBucket(sessionId);

            return true;
        }
        return false
    }

    pickHouseValidate(houseId: string, cardsIds: string[], sessionId: string) {

        const playerCard = this.cardDictionary[sessionId];
        const isHouse = CardRules.isHouseCard(playerCard);

        if (!isHouse) return false;

        const sumOfRanksOrphanCards = Util.getSumOfRankOfCards(this.gameRoom.state.whatsOnTable.orphanCards);
        const house = this.gameRoom.state.whatsOnTable.houses.filter((house) => house.houseId === houseId)[0];

        if (!house) return false;

        if (sumOfRanksOrphanCards % playerCard.rank === 0) {
            const orphanCards = this.gameRoom.state.whatsOnTable.orphanCards.filter((card) => true);
            this.gameRoom.state.whatsOnTable.orphanCards = [];
            this.gameRoom.state.whatsOnTable.houses = this.gameRoom.state.whatsOnTable.houses.filter((house) => house.houseId !== houseId);
            this.gameRoom.state.entities[sessionId].team.bucket.push(...orphanCards);
        }

        this.gameRoom.state.entities[sessionId].team.bucket.push(...house.cards);

        return true;
    }

    sweepValidate(cardId: string, sessionId: string) {
        const playerCard = this.cardDictionary[cardId];

        const result = this.checkIfSeepApplicable(playerCard);

        if (result) {
            this.removeCardFromPlayer(cardId, sessionId);
            this.removeAndAddToBucket(sessionId);
            return true;
        }

        return false;
    }

    //Helper methods
    canCreateMoreHouseOnTable() {
        return this.gameRoom.state.whatsOnTable.houses.length < 2;
    }

    removeHouseFromTable(houseId: string) {
        this.gameRoom.state.whatsOnTable.houses = this.gameRoom.state.whatsOnTable.houses.filter((house) => house.houseId !== houseId);
    }

    canPickCard(cardIds: string[], sessionId: string) {
        const player: Player = this.gameRoom.state.entities[sessionId];
        const playerCard = Util.getPlayerCard(player, cardIds);
        const otherCards = Util.getOtheCards(player, cardIds);

        return playerCard.rank === Util.getSumOfRankOfCards(otherCards) || Util.getSumOfRankOfCards(otherCards) % playerCard.rank === 0;
    }

    addCardToTable(card: CardSchema) {
        this.gameRoom.state.whatsOnTable.orphanCards.push(card);
    }

    removeCardFromPlayer(cardId: string, sessionId: string) {
        this.gameRoom.state.entities[sessionId].cardsInHand = this.gameRoom.state.entities[sessionId].cardsInHand.filter((card) => card.id !== cardId);
    }

    removeOrphanCardFromTable(cardIds: string[]) {
        this.gameRoom.state.whatsOnTable.orphanCards = this.gameRoom.state.whatsOnTable.orphanCards.filter((card) => !cardIds.includes(card.id))
    }

    getAllCards(cardIds: string[]) {
        return cardIds.map((cardId) => {
            return this.cardDictionary[cardId];
        })
    }

    checkIfSeepApplicable(playerCard: CardSchema) {

        /*
       1. Check If orphan cards present , if yes do 2
        *  2. Check If (sumOfRankOf(orphanCards) and card thrown matches
        * and either (noOfhouses = 0), or  if (noOfHouses === 1 and houseNo === cardRank)
        * */
        const orphanCards = this.gameRoom.state.whatsOnTable.orphanCards;
        const sumOfRanksOfOrphanCards = Util.getSumOfRankOfCards(this.gameRoom.state.whatsOnTable.orphanCards);
        const houses = this.gameRoom.state.whatsOnTable.houses;

        if (orphanCards.length > 0) {
            return sumOfRanksOfOrphanCards === playerCard.rank
                && (houses.length === 0 || (houses.length === 1 && houses[0].houseNo === playerCard.rank));
        } else {
            return (houses.length === 1 && houses[0].houseNo === playerCard.rank);
        }
    }

    canCreateHouseOnTable(player: Player, cardsIds: string[]) {
        /*
        * 1. Check if sumOfRanks of cards  >= 9 && <=13    //RULE 1. used a normal card to create a house
        * 1.a) if player has a face card of requested house no.
        * 1.b) Check if table can have more house or not.
        *
        * 2. OR Check if sumOfRanks of cards > 13         // RULE 2. used a faceCard to create a house
        *   2.a) take player card and check if player still has atleast 1 face card of requested houseNo.
        *   2.a.1) if Yes, check if sumOfRanksOf(OtherCards)  is divisible by rank of player card.
        * */
        if (!this.canCreateMoreHouseOnTable()) {
            return {can: false, code: ErrorCodes.HOUSE_LIMIT_EXCEEDED}
        }
        const cards: CardSchema[] = cardsIds.map((cardId) => this.cardDictionary[cardId]);
        const playerCard = Util.getPlayerCard(player, cardsIds);
        const otherCards = Util.getOtheCards(player, cardsIds);
        const sumOfRanksOfCards = Util.getSumOfRankOfCards(cards);
        const sumOfRanksOfOtherCards = Util.getSumOfRankOfCards(otherCards);
        if (sumOfRanksOfCards >= 9 && sumOfRanksOfCards <= 13
            && Util.playerHasFaceCard(player, sumOfRanksOfCards)
            && this.canCreateMoreHouseOnTable()) {
            return {can: true, ofNo: sumOfRanksOfCards};
        } else if (sumOfRanksOfOtherCards > 13
            && Util.playerHasFaceCard(player, playerCard.rank)
            && sumOfRanksOfOtherCards % playerCard.rank) {
            return {can: true, ofNo: playerCard.rank}
        }
        return {can: false, code: ErrorCodes.INVALID_MOVE}
    }

    createHouse(houseNo: number) {
        let house = new House();
        house.houseId = 'house-id' + Date.now();
        house.houseNo = houseNo;

        return house;
    }

    canContribute(houseId: string, player: Player, cardsIds: string[]): Result {

        const house = this.gameRoom.state.whatsOnTable.houses.find((house) => house.houseId === houseId);
        if (!house) return {success: false, code: ErrorCodes.INVALID_MOVE}
        const cards: CardSchema[] = cardsIds.map((cardId) => this.cardDictionary[cardId]);
        const playerCard = Util.getPlayerCard(player, cardsIds);
        const otherCards = Util.getOtheCards(player, cardsIds);
        const sumOfRanksOfCards = Util.getSumOfRankOfCards(cards);
        const sumOfRanksOfOtherCards = Util.getSumOfRankOfCards(otherCards);

        if (sumOfRanksOfCards >= 9 && sumOfRanksOfCards <= 13
            && Util.playerHasFaceCard(player, sumOfRanksOfCards)) {
            return {success: true};
        } else if (sumOfRanksOfOtherCards > 13
            && Util.playerHasFaceCard(player, playerCard.rank)
            && sumOfRanksOfOtherCards % playerCard.rank) {
            return {success: true}
        }

    }

    removeAndAddToBucket(sessionId: string) {
        const orphanCards = this.gameRoom.state.whatsOnTable.orphanCards.filter((card) => true);
        const houses: House[] = this.gameRoom.state.whatsOnTable.houses.filter((house) => true);

        //Clean Table
        this.gameRoom.state.whatsOnTable.orphanCards = [];
        this.gameRoom.state.whatsOnTable.houses = [];

        // add to bucket of player
        this.gameRoom.state.entities[sessionId].team.bucket.push(...orphanCards);
        houses.forEach((house) => {
            this.gameRoom.state.entities[sessionId].team.bucket.push(...house.cards);
        });
    }

}
