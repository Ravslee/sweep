import {GameRoom} from "./game-room";
import {Client} from "colyseus";

export class Turn extends Map<string, boolean>{

    constructor(private gameRoom: GameRoom) {
        super();
    }

    setActive(sessionId: string): Map<string, boolean> {
        this.forEach((element: boolean, key: string)=>{
           super[key] = false
           this.gameRoom.state.entities[key].isHisMove = false;
        });
        this.gameRoom.state.entities[sessionId].isHisMove = true;
        return super.set(sessionId, true);
    }


    getActive() {
        let keyActive = undefined;
        this.forEach((element: boolean, key: string)=>{
            if(element){
                keyActive = key;
            }
        });
        return {sessionId: keyActive, value:super.get(keyActive)};
    }

    next() {

        let activeIndex = this.gameRoom.clients.findIndex(client => this.getActive().sessionId === client.sessionId);
        let nextIndex;
        if (activeIndex === 3) {
            nextIndex = 0;
        } else (activeIndex < 3)
        {
            nextIndex = activeIndex+1;
        }

        const nextSessionId = this.gameRoom.clients[nextIndex].sessionId;
        this.gameRoom.state.entities[nextSessionId].isHisMove = true;

        this.setActive(nextSessionId);
    }


}
