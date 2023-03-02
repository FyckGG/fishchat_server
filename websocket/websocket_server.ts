import WebSocket from "ws";
import { WebSocketClients } from "../globalInterfaces/WebSocketClients";
import SearchService from "../services/SearchService";
import UserStatusService from "../services/UserStatusService";
import UserInterationService from "../services/UserInterationService";
import WebsocketSendClientTypes from "../textConstants/websocketSendClientTypes";
import WebsocketSendServerTypes from "../textConstants/websocketSendServerTypes";
import { getTargetResult } from "./helpers/getTargetResult";

const createWss = () => {
  const WSS_PORT = process.env.WSS_PORT || 5001;
  const wss = new WebSocket.Server({ port: WSS_PORT as number }, () => {
    console.log(`websocket started on port ${WSS_PORT}`);
  });

  var client_id = -1;
  var clients: WebSocketClients[] = [];

  wss.on(`connection`, (ws) => {
    ws.on(`message`, async (message) => {
      const json_message = JSON.parse(message.toString());

      switch (json_message.type) {
        case WebsocketSendClientTypes.USER_ID:
          {
            clients.map((client) => {
              if (client.value == ws) client.user_id = json_message.sender;
            });
          }
          break;

        case WebsocketSendClientTypes.USER__SEARCH:
          {
            const responce = await SearchService.searchUsersByName(
              json_message.sender,
              json_message.message
            );

            ws.send(
              JSON.stringify({
                message_type: WebsocketSendServerTypes.FIND_USER,
                ...responce,
              })
            );
          }
          break;

        case WebsocketSendClientTypes.SEND_FOLLOW:
          {
            const result = await UserInterationService.sendFollow(
              json_message.source,
              json_message.target
            );

            ws.send(
              JSON.stringify({
                message_type: WebsocketSendServerTypes.NEW_STATUS,
                new_status: result,
                target_user_id: json_message.target,
              })
            );
            await getTargetResult(
              json_message.target,
              json_message.source,
              clients
            );
            // const target_result = await UserStatusService.getUsersRelationships(
            //   json_message.target,
            //   json_message.source
            // );
            // clients.map((client) => {
            //   if (client.user_id == json_message.target) {
            //     client.value.send(
            //       JSON.stringify({
            //         message_type: WebsocketSendServerTypes.NEW_STATUS,
            //         new_status: target_result,
            //         target_user_id: json_message.source,
            //       })
            //     );
            //   }
            // });
          }
          break;

        case WebsocketSendClientTypes.CANCEL_FOLLOW:
          {
            const result = await UserInterationService.cancelFollow(
              json_message.source,
              json_message.target
            );
            ws.send(
              JSON.stringify({
                message_type: WebsocketSendServerTypes.NEW_STATUS,
                new_status: result,
                target_user_id: json_message.target,
              })
            );
            await getTargetResult(
              json_message.target,
              json_message.source,
              clients
            );
          }
          break;

        case WebsocketSendClientTypes.BAN:
          {
            const result = await UserInterationService.banUser(
              json_message.source,
              json_message.target
            );
            ws.send(
              JSON.stringify({
                message_type: WebsocketSendServerTypes.NEW_STATUS,
                new_status: result,
                target_user_id: json_message.target,
              })
            );
            await getTargetResult(
              json_message.target,
              json_message.source,
              clients
            );
          }
          break;

        case WebsocketSendClientTypes.CANCEL_BAN:
          {
            const result = await UserInterationService.cancelBanUser(
              json_message.source,
              json_message.target
            );
            ws.send(
              JSON.stringify({
                message_type: WebsocketSendServerTypes.NEW_STATUS,
                new_status: result,
                target_user_id: json_message.target,
              })
            );
            await getTargetResult(
              json_message.target,
              json_message.source,
              clients
            );
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
  });
};

export default createWss;
