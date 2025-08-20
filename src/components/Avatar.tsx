import {User, Bot} from "lucide-react";

interface AvatarProps {
  role: "user" | "assistant";
}

export default function Avatar({ role }: AvatarProps) {
  const isUser = role === "user";
  
  return (
    <div
      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-600"
      }`}
    >
      {isUser ? <User size={16} /> : <Bot size={16} />}
    </div>
  );
}