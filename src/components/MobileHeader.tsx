import { Menu } from "lucide-react";
import { useChatStore } from "../stores/chatStore";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const { threads, activeThreadId } = useChatStore();
  const activeThread = threads.find((t) => t.id === activeThreadId) || null;

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 md:hidden">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="Open menu">
          <Menu size={20} className="text-gray-600" />
        </button>

        <div className="text-center flex-1 mx-4">
          <h1 className="text-lg font-semibold text-gray-900 truncate">{activeThread?.title || "10xChat"}</h1>
        </div>

        <div className="w-10" />
      </div>
    </div>
  );
}
