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
        stompClient.current.send(destination, {}, JSON.stringify(message));
    }

    /**
     * Sets up subscription on connection obtained from useWebSocket.
     * @param {String} topic Topic to subscribe to, e.g. "/botn/game-state"
     * @param {Array.<*>} deps Any state vars for which the subscription should be retried on change. Will only subscribe when all deps are truthy.
     * @returns A lastMessage state variable that updates whenever a new message is received.
     */
    const useSubscription = ({
        topic,
        deps = [],
        retry = [],
    }) => {
        const [lastMessage, setLastMessage] = useState();
        const [subscribed, setSubscribed] = useState(false);

        const onMessageReceived = (payload) => {
            setLastMessage(JSON.parse(payload.body));
        }

        useEffect(() => {
            console.log("Retrying subscription");

            // This JS shorthand indicates the dependencies do NOT pass if any one of them is falsy
            const depsPass = !deps.some(dep => (!dep));

            if(connected.current && depsPass && !subscribed) {
                stompClient.current.subscribe(topic, onMessageReceived);
                setSubscribed(true);

                // On component unmount, we then unsubscribe from the topic, thanks to this useEffect trick
                return () => {
                    stompClient.current.unsubscribe(topic);
                }
            }
        }, [...retry]);

        return lastMessage;
    }

    useEffect(() => {
        if(!connected.current) {
            var socket = new SockJS(url);
            stompClient.current = Stomp.over(socket);
            stompClient.current.connect({}, onConnected, onError);
        }
    }, [url]);

    return { sendMessage, useSubscription };
}

export { useWebSocket }