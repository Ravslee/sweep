import {Logger} from "../logger";
import {GameRoom} from "./game-room";

enum Moves{
    BID,
    THROW,
    PICKED,
    HOUSE_CONTRIBUTE,
    HOUSE_CREATE,
    HOUSE_DOUBLE,
    SWEEP,
    DEAL
}

export class Handler {

    constructor(private gameRoom: GameRoom){
        Logger.i(">>> HANDLER INITIALIZED <<<");

        this.gameRoom.onMessage("*", (client, type, message) => {
            console.log(`received message "${type}" from ${client.sessionId}:`, message);
            this.messageRouter(client,type,message);
        });
    }



    messageRouter(client, type, message){
        switch (type) {

            case Moves.BID:{
                this.bidMoveHandle(client, message);
                break;
            }
            case Moves.THROW:{
                this.cardThrowHandle(client, message);
                break;
            }

            case Moves.HOUSE_CREATE:{
                this.houseCreateHandle(client, message);
                break;
            }

            case Moves.HOUSE_CONTRIBUTE:{
                this.houseAddHandle(client, message);
                break;
            }

            case Moves.SWEEP:{
                this.sweepCallHandle(client,message);
                break;
            }


            case Moves.DEAL :{
                Logger.i("DEAL ")
                this.dealCard(client, message);
                break;
            }

        }
    }


    private sweepCallHandle(client, message){
        console.log("Sweep done")
    }

    private dealCard(client, message){
        this.gameRoom.match.startMatch();
    }


    private bidMoveHandle(client: any, message: any) {
        this.gameRoom.match.bidValue = message.bidValue;
        this.gameRoom.match.turn.next();

    }

    private cardThrowHandle(client: any, message: any) {

    }

    private houseCreateHandle(client: any, message: any) {

    }

    private houseAddHandle(client: any, message: any) {

    }
}
