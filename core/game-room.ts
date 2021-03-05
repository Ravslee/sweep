import {Room, Client} from "colyseus";
import {Logger} from "../logger";
import {Player, RoomState} from "../sim-table/player";
import {Match} from "./match";

export class GameRoom extends Room {
    public static MAX_CLIENTS = 1;
    public state: RoomState;
    public clients: Client[];
    public clientsMap: { [sessionId: string]: Client } = {};
    public match: Match;

    onCreate(options: any): void | Promise<any> {
        Logger.i(">>> GAME ROOM CREATED <<<");

        this.setState(new RoomState());
        this.initRoom();
        return undefined;
    }

    onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
        Logger.i("CLIENT JOINED :: " + client.sessionId);

        this.state.entities[client.sessionId] = this.initPlayer(client, options);
        this.clients.push(client);
        this.clientsMap[client.sessionId] = client;
        this.match.onPlayerJoined(client);
        Logger.i("Total Clients ::" + this.clients.length);

        return undefined;
    }

    onLeave(client: Client, consented?: boolean): void | Promise<any> {
        Logger.i("Client Left ::" + client.sessionId);
        this.clients = this.clients.filter(cl => cl.sessionId !== client.sessionId)
        delete this.clientsMap[client.sessionId];
        this.match.onPlayerLeave(client);
        Logger.i("Total Clients ::" + this.clients.length);

        return undefined;
    }

    onDispose(): void | Promise<any> {
        Logger.i(">>> GAME ROOM DISPOSED <<<");

        return undefined;
    }


    initRoom() {
        Logger.i(">>> GAME ROOM INITIALIZED <<<");
        this.clients = [];
        this.match = new Match(this);
    }

    initPlayer(client: Client, options: any) {
        let player = new Player();
        player.sessionId = client.sessionId;
        player.name = options.name;

        return player;
    }

}
