import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: true,
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  },
})
@Injectable()
export class NotificationGateway implements OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationGateway.name);
  private connectedUsers: Map<number, { socketId: string; timestamp: number }> =
    new Map();
  private readonly CONNECTION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private cleanupInterval: NodeJS.Timeout;

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway initialized');
    // Clean up inactive connections every 5 minutes
    this.cleanupInterval = setInterval(
      () => {
        this.cleanupInactiveConnections();
      },
      5 * 60 * 1000,
    );
  }

  handleDisconnect(client: Socket) {
    // Find and remove user by socketId
    for (const [userId, connection] of this.connectedUsers.entries()) {
      if (connection.socketId === client.id) {
        this.connectedUsers.delete(userId);
        this.logger.debug(`User ${userId} disconnected (socket: ${client.id})`);
        break;
      }
    }
  }

  // when user connects, map them with userId
  @SubscribeMessage('register')
  handleRegister(
    @MessageBody() userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    this.connectedUsers.set(userId, {
      socketId: client.id,
      timestamp: Date.now(),
    });
    this.logger.debug(`User ${userId} registered with socket ${client.id}`);

    // Set up disconnect listener
    client.on('disconnect', () => {
      this.connectedUsers.delete(userId);
      this.logger.debug(`User ${userId} disconnected`);
    });
  }

  // send notification to a specific user
  sendToUser(userId: number, payload: any) {
    const connection = this.connectedUsers.get(userId);
    if (connection) {
      this.server.to(connection.socketId).emit('notification', payload);
      // Update last activity timestamp
      connection.timestamp = Date.now();
    }
  }

  // broadcast to many users
  broadcastToUsers(userIds: number[], payload: any) {
    userIds.forEach((id) => this.sendToUser(id, payload));
  }

  // Clean up inactive connections to prevent memory leaks
  private cleanupInactiveConnections() {
    const now = Date.now();
    const inactiveUsers: number[] = [];

    for (const [userId, connection] of this.connectedUsers.entries()) {
      if (now - connection.timestamp > this.CONNECTION_TIMEOUT) {
        inactiveUsers.push(userId);
      }
    }

    inactiveUsers.forEach((userId) => {
      const connection = this.connectedUsers.get(userId);
      if (connection) {
        this.server.to(connection.socketId).emit('timeout', {
          message: 'Session timeout. Please reconnect.',
        });
        this.connectedUsers.delete(userId);
        this.logger.debug(`Cleaned up inactive connection for user ${userId}`);
      }
    });

    if (inactiveUsers.length > 0) {
      this.logger.log(
        `Cleaned up ${inactiveUsers.length} inactive connections. Active connections: ${this.connectedUsers.size}`,
      );
    }
  }

  // Graceful shutdown
  onModuleDestroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}
