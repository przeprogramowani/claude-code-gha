import { Plus, X } from "lucide-react";
import { useChatStore } from "../stores/chatStore";
import ThreadItem from "./ThreadItem";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const { threads, activeThreadId, hasHydrated, createThread, switchThread, deleteThread, updateThreadTitle } =
    useChatStore();

  const sortedThreads = threads.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleNewChat = () => {
    createThread();
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleThreadClick = (threadId: string) => {
    switchThread(threadId);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out md:relative md:transform-none md:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleNewChat}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="New chat">
                <Plus size={20} className="text-gray-600" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
                title="Close sidebar">
                <X size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Threads list */}
          <div className="flex-1 overflow-y-auto p-2">
            {!hasHydrated ? (
              <div className="text-center py-8 text-gray-500">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                </div>
                <p className="text-sm mt-2">Loading conversations...</p>
              </div>
            ) : sortedThreads.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No conversations yet</p>
                <button
                  onClick={handleNewChat}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                  Start your first chat
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                {sortedThreads.map((thread) => (
                  <ThreadItem
                    key={thread.id}
                    thread={thread}
                    isActive={thread.id === activeThreadId}
                    onClick={() => handleThreadClick(thread.id)}
                    onDelete={deleteThread}
                    onTitleUpdate={updateThreadTitle}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
