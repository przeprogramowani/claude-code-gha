import { useEffect } from "react";
import { useChatStore } from "../stores/chatStore";

interface LegacyMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date | string;
}

export const useChatMigration = () => {
  const { threads, createThread, addMessage } = useChatStore();

  useEffect(() => {
    const migrateLegacyData = () => {
      try {
        const legacyMessages = localStorage.getItem("chatMessages");
        if (legacyMessages && threads.length === 0) {
          const messages: LegacyMessage[] = JSON.parse(legacyMessages);

          if (messages.length > 0) {
            const threadId = createThread();

            messages.forEach((message) => {
              const migratedMessage = {
                ...message,
                timestamp: typeof message.timestamp === "string" ? new Date(message.timestamp) : message.timestamp,
              };

              addMessage(threadId, migratedMessage);
            });

            localStorage.removeItem("chatMessages");
          }
        }
      } catch (error) {
        console.warn("Failed to migrate legacy chat data:", error);
      }
    };

    migrateLegacyData();
  }, [threads.length, createThread, addMessage]);
};
