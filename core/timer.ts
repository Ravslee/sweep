import {Player} from "../sim-table/player";
import {GameRoom} from "./game-room";

export class Timer{
    private timeOut;
    private sendInterval;
    private durationMillis = 30000; // 30 secs

    constructor(private gameRoom: GameRoom) {

    }


   public start(sessionId: string){
        this.gameRoom.state.entities[sessionId].remainingMillis  = 30000;
        this.sendInterval = setInterval(()=>{
            console.log(this.msToTime(this.gameRoom.state.entities[sessionId].remainingMillis))
            console.log(this.gameRoom.state.entities[sessionId].remainingMillis)
            if(this.gameRoom.state.entities[sessionId].remainingMillis > 0){
                this.gameRoom.state.entities[sessionId].remainingMillis  -= 1000;
            }else{
                this.stop();
            }
        },1000);

        // this.timeOut = setTimeout(()=>{
        //     this.stop();
        // },this.durationMillis);
    }

   public stop(){
        if(this.sendInterval){
            clearInterval(this.sendInterval)
            this.sendInterval = undefined;
        }
    }

    msToTime(s) {
        const ms = s % 1000;
        s = (s - ms) / 1000;
        const secs = s % 60;
        s = (s - secs) / 60;
        const mins = s % 60;

        s = (s - mins) / 60;
        const hrs = s % 60;

        return `${hrs < 10 ? "0" + hrs : hrs}:${mins < 10 ? "0" + mins : mins}:${
            secs < 10 ? "0" + secs : secs
        }`;
    }
}
