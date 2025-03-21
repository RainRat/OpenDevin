import { useQuery } from "@tanstack/react-query";
import OpenHands from "#/api/open-hands";
import { useConversation } from "#/context/conversation-context";

export const useVSCodeUrl = (config: { enabled: boolean }) => {
  const { conversationId } = useConversation();

  const data = useQuery({
    queryKey: ["vscode_url", conversationId],
    queryFn: () => {
      if (!conversationId) throw new Error("No conversation ID");
      return OpenHands.getVSCodeUrl(conversationId);
    },
    enabled: !!conversationId && config.enabled,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });

  return data;
};
