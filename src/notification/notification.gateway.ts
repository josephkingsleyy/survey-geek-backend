import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: true,
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  // optional: track connected users
  private connectedUsers: Map<number, string> = new Map();

  // when user connects, map them with userId
  @SubscribeMessage('register')
  handleRegister(@MessageBody() userId: number, @ConnectedSocket() client: Socket) {
    this.connectedUsers.set(userId, client.id);
    console.log(`User ${userId} registered with socket ${client.id}`);
  }

  // send notification to a specific user
  sendToUser(userId: number, payload: any) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('notification', payload);
    }
  }

  // broadcast to many users
  broadcastToUsers(userIds: number[], payload: any) {
    userIds.forEach((id) => this.sendToUser(id, payload));
  }
}
