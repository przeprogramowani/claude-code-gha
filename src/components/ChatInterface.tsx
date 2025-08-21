import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatSidebar from "./ChatSidebar";
import MobileHeader from "./MobileHeader";
import { useChatStore } from "../stores/chatStore";
import { useChatMigration } from "../hooks/useChatMigration";
import Clock from "./Clock";

export default function ChatInterface() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { threads, activeThreadId, hasHydrated, createThread, addMessage } = useChatStore();

  useChatMigration();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Get active thread from threads array using activeThreadId
  const activeThread = threads.find((t) => t.id === activeThreadId) || null;
  const messages = activeThread?.messages || [];

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (hasHydrated && threads.length === 0) {
      createThread();
    }
  }, [hasHydrated, threads.length, createThread]);

  const handleSendMessage = async (content: string) => {
    if (!activeThreadId) {
      const threadId = createThread();
      const userMessage = {
        id: Date.now().toString(),
        content,
        isUser: true,
        timestamp: new Date(),
      };
      addMessage(threadId, userMessage);
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: content }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const data = await response.json();

        const aiMessage = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          isUser: false,
          timestamp: new Date(),
        };

        addMessage(threadId, aiMessage);
      } catch (error) {
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          content: "Sorry, I encountered an error. Please try again.",
          isUser: false,
          timestamp: new Date(),
        };

        addMessage(threadId, errorMessage);
      } finally {
        setIsLoading(false);
      }
    } else {
      const userMessage = {
        id: Date.now().toString(),
        content,
        isUser: true,
        timestamp: new Date(),
      };

      addMessage(activeThreadId, userMessage);
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: content }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const data = await response.json();

        const aiMessage = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          isUser: false,
          timestamp: new Date(),
        };

        addMessage(activeThreadId, aiMessage);
      } catch (error) {
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          content: "Sorry, I encountered an error. Please try again.",
          isUser: false,
          timestamp: new Date(),
        };

        addMessage(activeThreadId, errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <ChatSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Desktop Header */}
        <div className="hidden md:block bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">{activeThread?.title}</h1>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={32} className="text-blue-500" />
                </div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Start a conversation</h2>
                <p className="text-gray-500">Send a message to begin chatting with your AI assistant.</p>
              </div>
            )}

            {messages.map((message) => (
              <ChatMessage key={message.id} content={message.content} isUser={message.isUser} />
            ))}

            {isLoading && <ChatMessage content="" isUser={false} isLoading={true} />}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
