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
     * @param {Function} callback Action to take as soon as you are subscribed, e.g. you might want to then send a message that drives a result sent to the subscription topic 
     * @param {Array.<*>} deps Any state vars for which the subscription should be retried on change. Will only subscribe when all deps are truthy.
     * @returns A lastMessage state variable that updates whenever a new message is received.
     */
    const useSubscription = ({
        topic,
        callback = () => {},
        deps = [],
        retry = [],
    }) => {
        const [lastMessage, setLastMessage] = useState();
        const [subscribed, setSubscribed] = useState(false);

        const onMessageReceived = (payload) => {
            setLastMessage(JSON.parse(payload.body));
        }

        useEffect(() => {
            console.log("Retrying subscription, retry is " + retry)
            let depsPass = true;
            console.log("Attempting to subscribe to " + topic);

            for(let i of deps) {
                if(!i) {
                    depsPass = false;
                    break;
                }
            }

            if(connected.current && depsPass && !subscribed) {
                stompClient.current.subscribe(topic, onMessageReceived);
                setSubscribed(true);
                callback();

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