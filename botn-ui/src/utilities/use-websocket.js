import { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const useWebSocket = (url) => {
    const connected = useRef(false);
    const stompClient = useRef();

    const onConnected = () => {
       connected.current = true;
    }

    const onError = (error) => {
        console.error(error);
    }

    const sendMessage = (destination, message) => {
        console.log("Sending message to " + destination);
        console.log("Message: ");
        console.log(message);
        stompClient.current.send(destination, {}, JSON.stringify(message));
    }

    const useSubscription = (topic, callback = () => {}, ...deps) => {
        const [lastMessage, setLastMessage] = useState();

        const onMessageReceived = (payload) => {
            setLastMessage(JSON.parse(payload.body));
        }

        useEffect(() => {
            let depsPass = true;

            for(let i of deps) {
                if(!i) {
                    depsPass = false;
                    break;
                }
            }

            if(connected && depsPass) {
                stompClient.current.subscribe(topic, onMessageReceived);
                callback();

                return () => {
                    stompClient.current.unsubscribe(topic);
                }
            }
        }, [...deps]);

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