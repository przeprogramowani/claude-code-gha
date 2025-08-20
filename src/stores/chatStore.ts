import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  threadId: string;
}

export interface Thread {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatStore {
  threads: Thread[];
  activeThreadId: string | null;
  hasHydrated: boolean;
  
  createThread: () => string;
  switchThread: (threadId: string) => void;
  deleteThread: (threadId: string) => void;
  addMessage: (threadId: string, message: Omit<Message, 'threadId'>) => void;
  updateThreadTitle: (threadId: string, title: string) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  
  getThread: (threadId: string) => Thread | null;
}

const generateTitle = (message: string): string => {
  if (!message.trim()) return 'New Chat';
  return message.length > 50 ? message.substring(0, 50) + '...' : message;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      threads: [],
      activeThreadId: null,
      hasHydrated: false,

      createThread: () => {
        const threadId = Date.now().toString();
        const newThread: Thread = {
          id: threadId,
          title: 'New Chat',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          threads: [newThread, ...state.threads],
          activeThreadId: threadId,
        }));

        return threadId;
      },

      switchThread: (threadId: string) => {
        set({ activeThreadId: threadId });
      },

      deleteThread: (threadId: string) => {
        set((state) => {
          const newThreads = state.threads.filter(t => t.id !== threadId);
          let newActiveThreadId = state.activeThreadId;

          if (state.activeThreadId === threadId) {
            newActiveThreadId = newThreads.length > 0 ? newThreads[0].id : null;
          }

          return {
            threads: newThreads,
            activeThreadId: newActiveThreadId,
          };
        });
      },

      addMessage: (threadId: string, message: Omit<Message, 'threadId'>) => {
        set((state) => {
          const threads = state.threads.map(thread => {
            if (thread.id === threadId) {
              const newMessage = { ...message, threadId };
              const updatedMessages = [...thread.messages, newMessage];
              
              let title = thread.title;
              if (thread.messages.length === 0 && message.isUser) {
                title = generateTitle(message.content);
              }

              return {
                ...thread,
                messages: updatedMessages,
                title,
                updatedAt: new Date(),
              };
            }
            return thread;
          });

          return { threads };
        });
      },

      updateThreadTitle: (threadId: string, title: string) => {
        set((state) => ({
          threads: state.threads.map(thread =>
            thread.id === threadId
              ? { ...thread, title, updatedAt: new Date() }
              : thread
          ),
        }));
      },

      setHasHydrated: (hasHydrated: boolean) => {
        set({ hasHydrated });
      },

      getThread: (threadId: string) => {
        return get().threads.find(t => t.id === threadId) || null;
      },
    }),
    {
      name: 'chat-history',
      onRehydrateStorage: () => (state) => {
        // This runs after rehydration, whether there was persisted data or not
        if (state) {
          state.setHasHydrated(true);
        } else {
          // If no state was found (first visit), we still need to set hydrated
          useChatStore.getState().setHasHydrated(true);
        }
      },
      storage: {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          if (!item) return null;
          
          try {
            const parsed = JSON.parse(item);
            return {
              ...parsed,
              state: {
                ...parsed.state,
                threads: parsed.state.threads.map((thread: any) => ({
                  ...thread,
                  createdAt: new Date(thread.createdAt),
                  updatedAt: new Date(thread.updatedAt),
                  messages: thread.messages.map((message: any) => ({
                    ...message,
                    timestamp: new Date(message.timestamp),
                  })),
                })),
              },
            };
          } catch {
            return null;
          }
        },
        setItem: (name: string, value: any) => {
          const serialized = JSON.stringify({
            ...value,
            state: {
              ...value.state,
              threads: value.state.threads.map((thread: Thread) => ({
                ...thread,
                createdAt: thread.createdAt.toISOString(),
                updatedAt: thread.updatedAt.toISOString(),
                messages: thread.messages.map((message: Message) => ({
                  ...message,
                  timestamp: message.timestamp.toISOString(),
                })),
              })),
            },
          });
          localStorage.setItem(name, serialized);
        },
        removeItem: (name: string) => localStorage.removeItem(name),
      },
    }
  )
);