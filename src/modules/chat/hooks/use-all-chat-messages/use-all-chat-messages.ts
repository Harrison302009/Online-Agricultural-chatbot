import useSWR from "swr";
import { useCallback } from "react";
import { getAllChatMessages } from "../../lib/get-all-chat-messages/get-all-chat-messages";

export function useAllChatMessages(chatroomId?: string) {
  const fetcher = useCallback(
    async ([path, id]: [path: string, id?: string]) => {
      return await getAllChatMessages(id);
    },
    [],
  );
  return useSWR(["/api/chat", chatroomId], fetcher);
}
