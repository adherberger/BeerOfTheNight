import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const useWebSocket = (
    url,
    topic,
) => {
    const [lastMessage, setLastMessage] = useState();
    let stompClient;

    const onConnected = () => {
        console.log("onConnected");

        stompClient.subscribe(topic, onMessageReceived);
        stompClient.send("/app/game", {}, JSON.stringify({name: "Second Person", hasEntry: true}))
    }

    const onMessageReceived = (payload) => {
        console.log("onMessageReceived");
        setLastMessage(payload.body);
    }

    const onError = (error) => {
        console.error(error);
    }

    useEffect(() => {
        var socket = new SockJS(url);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }, []);

    return { lastMessage };
}

export { useWebSocket }