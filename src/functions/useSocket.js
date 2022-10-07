import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';


const useSocket = ({ userId, enabled, onConnected }) => {
    const ref = useRef();
    const [messages, setMessages] = useState([]);

    const send = (msg, senderId) => {
        ref.current.emit('message', {
            content: msg,
            senderId: senderId,
            userId,
            date: new Date(),
        });
    };

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const socket = io('http://10.0.0.154:5000/');
        /*
        socket.emit('joinRoom', userId);
        
        */
        socket.on('message', (msg) => {
            setMessages((prev) => prev.concat(msg));
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
        });

        socket.on('connect', () => {
            if (onConnected) {
                onConnected();
            }
        });

        socket.on('reconnect', () => {
            socket.emit('joinRoom', userId);
        });

        ref.current = socket;

        return () => socket.disconnect();
    }, [enabled, userId]);

    return {
        send,
        messages,
    };
};

export { useSocket };