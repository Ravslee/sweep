import {CardSchema, Player} from "../sim-table/player";
import * as _ from 'lodash'
import {CardRules} from "../sim-table/card";
export class Util {

    public static getAllCard(player: Player, cardIds: string[]): CardSchema {
        const playerCardsIds: string[] = player.cardsInHand.map<string>((card) => card.id);

        const found: string[] = _.intersection(playerCardsIds, cardIds);
        if (found && found[0]) {

            return player.cardsInHand.find((card) => card.id === found[0])
        }

        return undefined;
    };
    public static getPlayerCard(player: Player, cardIds: string[]): CardSchema {
        const playerCardsIds: string[] = player.cardsInHand.map<string>((card) => card.id);

        const found: string[] = _.intersection(playerCardsIds, cardIds);
        if (found && found[0]) {

            return player.cardsInHand.find((card) => card.id === found[0])
        }

        return undefined;
    };

    public static getOtheCards(player: Player, cardIds: string[]) {
        const playerCard = this.getPlayerCard(player, cardIds);

        if (playerCard) {
            const othersCardIds = cardIds.filter((cardId) => cardId !== playerCard.id);
            const deck: CardSchema[] = CardRules.getDeck();
            return deck.filter((card) => {
                return othersCardIds.includes(card.id);
            });
        }

        return undefined;
    }

    public static getSumOfRankOfCards(cards: CardSchema[]) {
        let sum: number = 0;
        cards.forEach((card) => {
            sum += card.rank;
        });
        return sum;
    }

    public static getSumOfValueOfCards(otherCards: CardSchema[]) {
        let sum: number = 0;
        otherCards.forEach((card) => {
            sum += card.value;
        });
        return sum;
    }

    public static getFaceCardsOnly(cardIds: string[]) {

        cardIds.forEach((cardId)=>{

        })
    }

    public static playerHasFaceCard(player: Player, rank: number){
       return  !!player.cardsInHand.find((card)=> card.rank === rank);
    }
}
