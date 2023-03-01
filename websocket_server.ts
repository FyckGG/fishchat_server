import WebSocket from "ws";
import SearchService from "./services/SearchService";

const createWss = () => {
  const WSS_PORT = process.env.WSS_PORT || 5001;
  const wss = new WebSocket.Server({ port: WSS_PORT as number }, () => {
    console.log(`websocket started on port ${WSS_PORT}`);
  });

  interface WebSocketClients {
    id: string;
    value: WebSocket.WebSocket;
    user_id: string | undefined;
  }

  var client_id = -1;
  var clients: WebSocketClients[] = [];

  wss.on(`connection`, (ws) => {
    ws.on(`message`, async (message) => {
      const json_message = JSON.parse(message.toString());

      switch (json_message.type) {
        case process.env.WSS_USERID_TYPE:
          {
            console.log("gg");
            clients.map((client) => {
              if (client.value == ws) client.user_id = json_message.sender;
            });
            console.log(clients);
          }
          break;
        case process.env.WSS_USERFIND_TYPE:
          {
            const responce = await SearchService.searchUsersByName(
              json_message.sender,
              json_message.message
            );

            ws.send(JSON.stringify(responce));
          }
          break;
      }
    });
    clients.push({
      id: (client_id + 1).toString(),
      value: ws,
      user_id: undefined,
    });
    client_id++;
    //console.log(clients);
  });
};

export default createWss;
