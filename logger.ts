export class Logger{
    static d(msg:any){
        console.log(msg);
    }
    static i(msg:any){
        console.info(msg);
    }
    static w(msg:any){
        console.warn(msg);
    }
    static e(msg:any){
        console.error(msg);
    }
}
