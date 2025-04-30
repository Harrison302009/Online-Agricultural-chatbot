import { GetAllChatMessagesResponse } from "@/app/api/chat/route";

export async function getAllChatMessages(chatroomId?: string) {
  const url = chatroomId ? `/api/chat?chatroomId=${chatroomId}` : `/api/chat`;
  const response = await fetch(url);
  const json: GetAllChatMessagesResponse = await response.json();
  return json.messages;
}
