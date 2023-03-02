import UserStatusService from "../../services/UserStatusService";
import { WebSocketClients } from "../../globalInterfaces/WebSocketClients";
import WebsocketSendServerTypes from "../../textConstants/websocketSendServerTypes";

export const getTargetResult = async (
  target_id: string,
  source_id: string,
  clients: WebSocketClients[]
) => {
  const target_result = await UserStatusService.getUsersRelationships(
    target_id,
    source_id
  );
  clients.map((client) => {
    if (client.user_id == target_id) {
      client.value.send(
        JSON.stringify({
          message_type: WebsocketSendServerTypes.NEW_STATUS,
          new_status: target_result,

          target_user_id: source_id,
        })
      );
    }
  });
};
