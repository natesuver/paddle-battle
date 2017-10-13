class Relay {
    constructor(gameId,serverUrl,listener){
        this.gameId = gameId;
        this.serverUrl = serverUrl;
        this.connected = false;
        this.listener = listener;
        this.ws = new WebSocket(this.serverUrl); 
    }

    connect() {
        this.send({"type":"ping"})
        ws.onmessage = function (data) {
            var returnValue = JSON.parse(data);
            if (returnValue.type==="ping" && returnValue.result==="OK")
                this.connected = true;
            this.listener(event);
        };
    }

    send(message) {
        ws.send(JSON.stringify(message));
    }
    get isConnected() {
        return (this.connected);
    }
}