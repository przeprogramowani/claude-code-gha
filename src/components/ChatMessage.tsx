import Avatar from "./Avatar";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  isLoading?: boolean;
}

export default function ChatMessage({
  content,
  isUser,
  isLoading,
}: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        } gap-3`}
      >
        {/* Avatar */}
        <Avatar role={isUser ? "user" : "assistant"} />

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-purple-500 text-white"
              : "bg-gray-100 text-gray-900 border border-gray-200"
          }`}
        >
          {isLoading ? (
            <div className='flex space-x-1'>
              <div
                className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                style={{animationDelay: "0ms"}}
              ></div>
              <div
                className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                style={{animationDelay: "150ms"}}
              ></div>
              <div
                className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                style={{animationDelay: "300ms"}}
              ></div>
            </div>
          ) : (
            <p className='text-sm leading-relaxed whitespace-pre-wrap'>
              {content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
