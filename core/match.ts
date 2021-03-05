import {GameRoom} from "./game-room";
import {Handler} from "./handler";
import {Logger} from "../logger";
import {Client} from "colyseus";
import {ArraySchema} from "@colyseus/schema";
import {CardSchema, Player, Team} from "../sim-table/player";
import {CardRules} from "../sim-table/card";
import {Turn} from "./turn";
import {Timer} from "./timer";
// TODO 1: SERVE BID CARD, AND WAIT FOR THE USER TURN
// TODO 2: IMPLEMENT TIMER THAT WILL WAIT FOR USER TURN

export class Match{
    public playerStartedAt: number;
    public deck: CardSchema[] = CardRules.getDeck();
    public handler: Handler;
    public turn: Turn;
    public bidValue: number;
    public testing = true;
    public shuffledDeck: CardSchema[];
    public timer: Timer;



    constructor(private gameRoom: GameRoom) {
        this.handler = new Handler(gameRoom);
        this.turn = new Turn(gameRoom);
        this.timer = new Timer(gameRoom);
    }

    startMatch() {
        Logger.i(">>> MATCH STARTED <<<");

        //TODO:1 FOR TESTING, WITH SINGLE CLIENT, COMMENT THIS

        // this.playerStartedAt = Math.floor((Math.random() * MAX_CLIENTS) + 1);

        //TODO:1 FOR TESTING, WITH SINGLE CLIENT, UNCOMMENT THIS
        this.playerStartedAt = this.startMatchAt();

        if(this.testing){
            this.playerStartedAt = 1;
        }

        //Biding, serve only 4 cards to this player.
        let client: Client = this.gameRoom.clients[this.playerStartedAt];
        let player: Player = this.gameRoom.state.entities[client.sessionId];

        this.doSeatingArrange(player.sessionId);
        this.doBid(player);

    }

    onPlayerJoined(client:Client){
        this.turn.set(client.sessionId,false);
        if (this.gameRoom.clients.length === GameRoom.MAX_CLIENTS) {
            this.startMatch();
        }
    }

    shuffleDeck(array) {
        array.sort(() => Math.random() - 0.5);
    }

    onPlayerLeave(client: Client) {
        if(this.turn.has(client.sessionId)){
            this.turn.delete(client.sessionId);
        }
    }

    startMatchAt(){
      return  Math.floor(Math.random()*4) + 1;
    }


    doSeatingArrange(by : string){

      const orderByIndex = this.gameRoom.clients.findIndex(client => client.sessionId === by);

        const temp = this.gameRoom.clients[0];
        this.gameRoom.clients[0] = this.gameRoom.clients[orderByIndex];
        this.gameRoom.clients[orderByIndex] = temp;
        let team1 = new Team();
        let team2= new Team();

        team1.teamId = 'team-id-'+ Date.now();
        team2.teamId = 'team-id-'+ Date.now();
        const teams = [ team1 , team2];

        this.gameRoom.clients.forEach((client, index) => {
            this.gameRoom.state.entities[client.sessionId].seatNo = index + 1;
            this.gameRoom.state.entities[client.sessionId].team = teams[(index + 1 % 2)];
        });
    }

    doBid(player: Player){
        player.cardsInHand = new ArraySchema<CardSchema>();
        let valid = false;
        while (!valid) {
            //SHUFFLE CARDS
            this.shuffleDeck(this.deck);
            Logger.i(">>> DECK SHUFFLED <<<");

            for (let i = 0; i < 4; i++) {
                player.cardsInHand.push(this.deck[i]);
            }
            valid = !!player.cardsInHand.find((card: CardSchema) => card.isFace)
            Logger.i("Dealing...");
        }
        this.setPlayerMove(player.sessionId)

    }

    setPlayerMove(sessionId: string){
        this.gameRoom.match.turn.setActive(sessionId);
        this.gameRoom.state.entities[sessionId].isHisMove = true;
        this.timer.start(sessionId);
    }

}
