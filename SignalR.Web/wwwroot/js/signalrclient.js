$(document).ready(function () {

    const broadcastMessageToAllClientHubMethodCall = "BroadcastMessageToAllClient";
    const broadcastMessageToCallerClient = "BroadcastMessageToCallerClient";
    const broadcastMessageToOtherClient = "BroadcastMessageToOtherClient";
    const broadcastMessageToIndividualClient = "BroadcastMessageToIndividualClient";

    const receiveMessageForAllClient = "ReceiveMessageForAllClient";
    const receiveMessageForCallerClient = "ReceiveMessageForCallerClient";
    const receiveMessageForOtherClient = "ReceiveMessageForOtherClient";
    const receiveMessageForIndividualClient = "ReceiveMessageForIndividualClient";
    const receiveConnectedClientCountAllClient = "ReceiveConnectedClientCountAllClient";
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/exampleTypeSafeHub")
        .configureLogging(signalR.LogLevel.Information)
        .build();

    async function start() {
        try {
            await connection.start();
            $("#connectionId").html(`Connection Id : ${connection.connectionId}`);
            console.log("SignalR Connected.");
        } catch (err) {
            console.log(err);
            setTimeout(start, 5000);
        }
    }

    start();

    //Subscribe
    connection.on(receiveMessageForCallerClient, (message) => {
        console.log("Received message for caller client: ", message);
    });

    //Subscribe
    connection.on(receiveMessageForAllClient, (message) => {
        console.log("Received message for all client: ", message);
    });

    //Subscribe
    connection.on(receiveMessageForOtherClient, (message) => {
        console.log("Received message for other client: ", message);
    });

    //Subscribe
    connection.on(receiveMessageForIndividualClient, (message) => {
        console.log("Received message for individual client: ", message);
    });

    var span_client_count = $("#span-connected-client-count");
    //Subscribe
    connection.on(receiveConnectedClientCountAllClient, (count) => {
        span_client_count.text(count);
        console.log("Connected client count: ", count);
    });

    $("#btn-send-message-all-client").click(function () {
        const message = "Hello world";
        connection.invoke(broadcastMessageToAllClientHubMethodCall,message).catch(err => console.log("hata",err))
    })

    $("#btn-send-message-caller-client").click(function () {
        const message = "Hello world";
        connection.invoke(broadcastMessageToCallerClient, message).catch(err => console.log("hata", err))
    })

    $("#btn-send-message-other-client").click(function () {
        const message = "Hello world";
        connection.invoke(broadcastMessageToOtherClient, message).catch(err => console.log("hata", err))
    })

    $("#btn-send-message-individual-client").click(function () {
        const message = "hello world";
        const connectionId = $("#text-connectionId").val();
        connection.invoke(broadcastMessageToIndividualClient, connectionId, message).catch(err => console.log("hata", err))
    })
});