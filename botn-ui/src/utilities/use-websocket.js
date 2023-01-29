import { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const useWebSocket = (url) => {
    const [connected, setConnected] = useState(false);
    const stompClient = useRef();

    const onConnected = () => {
        console.log("WebSocket connected!");

        setTimeout(() => {
            setConnected(true);
        }, 1000);
        // stompClient.current.subscribe(topic, onMessageReceived);
    }

    const onError = (error) => {
        console.error(error);
    }

    const sendMessage = (destination, message) => {
        stompClient.current.send(destination, {}, JSON.stringify(message));
    }

    const useSubscription = (topic, callback = () => {}) => {
        const [lastMessage, setLastMessage] = useState();

        const onMessageReceived = (payload) => {
            setLastMessage(JSON.parse(payload.body));
        }

        useEffect(() => {
            if(connected) {
                stompClient.current.subscribe(topic, onMessageReceived);
                console.log("Subscribed to topic " + topic);
                callback();

                return () => {
                    stompClient.current.unsubscribe(topic);
                }
            }
        }, [connected]);

        return lastMessage;
    }

    useEffect(() => {
        var socket = new SockJS(url);
        console.log(socket);
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, onConnected, onError);
    }, [url]);

    return { sendMessage, useSubscription };
}

export { useWebSocket }