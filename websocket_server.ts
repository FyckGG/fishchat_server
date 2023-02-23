import WebSocket from "ws";
import UsersSearchService from "./services/UsersSearchService";

const createWss = () => {
  const WSS_PORT = process.env.WSS_PORT || 5001;
  const wss = new WebSocket.Server({ port: WSS_PORT as number }, () => {
    console.log(`websocket started on port ${WSS_PORT}`);
  });

  wss.on(`connection`, (ws) => {
    ws.on(`message`, async (message) => {
      const json_message = JSON.parse(message.toString());
      switch (json_message.type) {
        case process.env.VITE_REACT_APP_WSS_USERFIND_TYPE: {
          const responce = await UsersSearchService.searchByName(
            json_message.sender,
            json_message.message
          );

          ws.send(JSON.stringify(responce));
        }
      }

      ws.send(message.toString());
    });
  });
};

export default createWss;
