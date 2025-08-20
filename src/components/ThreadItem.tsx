import { useState } from 'react';
import { Trash2, Edit3 } from 'lucide-react';
import type { Thread } from '../stores/chatStore';

interface ThreadItemProps {
  thread: Thread;
  isActive: boolean;
  onClick: () => void;
  onDelete: (threadId: string) => void;
  onTitleUpdate: (threadId: string, title: string) => void;
}

export default function ThreadItem({ 
  thread, 
  isActive, 
  onClick, 
  onDelete, 
  onTitleUpdate 
}: ThreadItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(thread.title);
  const [showDelete, setShowDelete] = useState(false);

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTitleSubmit = () => {
    if (editTitle.trim() && editTitle !== thread.title) {
      onTitleUpdate(thread.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setEditTitle(thread.title);
      setIsEditing(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(thread.id);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div
      className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
        isActive 
          ? 'bg-gray-800 text-white' 
          : 'hover:bg-gray-100 text-gray-700'
      }`}
      onClick={onClick}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={handleTitleKeyDown}
              className="w-full bg-transparent border-none outline-none text-sm font-medium"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div className="flex items-center gap-2">
              <h3
                className="text-sm font-medium truncate cursor-text"
                onClick={handleTitleClick}
              >
                {thread.title}
              </h3>
              {!isActive && (
                <Edit3 
                  size={12} 
                  className="opacity-0 group-hover:opacity-50 transition-opacity flex-shrink-0" 
                />
              )}
            </div>
          )}
          <p className={`text-xs mt-1 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
            {formatTimestamp(thread.updatedAt)}
          </p>
        </div>
        
        {showDelete && !isEditing && (
          <button
            onClick={handleDelete}
            className={`p-1 rounded hover:bg-red-100 transition-colors ${
              isActive ? 'text-gray-300 hover:text-red-600' : 'text-gray-400 hover:text-red-600'
            }`}
            title="Delete thread"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}