import WebSocket from "ws";

export interface WebSocketClients {
  id: string;
  value: WebSocket.WebSocket;
  user_id: string | undefined;
}
