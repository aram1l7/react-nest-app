
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { chatMessages } from './in-memory';

@WebSocketGateway({ cors: true })
export class AppGateway {
    @WebSocketServer()
    server: Server;

    private connectedUsers: Map<string, any> = new Map();

    @SubscribeMessage('join')
    handleJoinChat(client: any, username: string): void {
        if (this.connectedUsers.has(username)) {
            client.emit('registrationError', 'This username is taken');
            client.disconnect();
            return;
        }
        console.log(username, 'username');


        client.username = username;

        this.connectedUsers.set(username, client);

        this.server.emit('userJoined', username);

        const connectedUsernames = Array.from(this.connectedUsers.keys());
        client.emit('connectedUsers', connectedUsernames);
    }

    @SubscribeMessage('message')
    handleChatMessage(client: any, message: {}): void {
        const timestamp = new Date().toISOString();

        const chatMessage = {
            ...message,
            timestamp,
        };

        chatMessages.push(chatMessage);
        console.log('Received message:', chatMessage);
        console.log(chatMessages, 'messages');

        this.server.emit('message', chatMessage);
    }
}