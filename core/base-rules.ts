import { Player} from "../sim-table/player";

export interface BaseRules {
    bidValidate(cardsIds: string[], bidValue: number, sessionId: string);
    throwValidate(cardId: string, sessionId: string);
    houseCreateValidate(cardsIds: string[], sessionId: string);
    houseContributeValidate(houseId: string, cardsIds: string[], sessionId: string);
    pickCardValidate(cardsIds: string[], sessionId: string);
    pickHouseValidate(houseId: string, cardsIds: string[], sessionId: string);
    sweepValidate(cardId: string, sessionId: string);
    canCreateHouseOnTable(player: Player, cardIds: string[]);
    canCreateMoreHouseOnTable();
    removeHouseFromTable(houseId: string);
    canPickCard(cardIds: string[], sessionId:string);
}
