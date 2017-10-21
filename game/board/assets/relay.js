class Relay {
    constructor(serverUrl,listener){
        this.serverUrl = serverUrl;
        this.connected = false;
        this.listener = listener;
        this.socket = new ReconnectingWebSocket(this.serverUrl, null, {debug: true, reconnectInterval: 500});
    }

    connect() {
        this.socket.open();
        this.socket.addEventListener('open', this.onOpen);
        socket.onmessage = function (data) {
            this.listener(JSON.parse(data));
        };
    }

    onOpen() {
        console.log('socket opened');
        this.connected = true;
        this.listener(JSON.parse({status: "ok"}));
    }

    send(message) {
        ws.send(JSON.stringify(message));
    }
    get isConnected() {
        return (this.connected);
    }
}