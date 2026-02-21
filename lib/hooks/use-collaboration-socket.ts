import { useEffect, useRef } from 'react';
import { useEditorStore } from '../store/editor-store';

interface CollaborationMessage {
  type: 'user_joined' | 'user_left' | 'section_updated' | 'selection_changed' | 'cursor_moved';
  userId: string;
  userName: string;
  data?: any;
  timestamp: number;
}

export const useCollaborationSocket = (portfolioId: string, userId: string, userName: string) => {
  const socketRef = useRef<any>(null);
  const { collaborativeUsers, setCollaborativeUsers, sections } = useEditorStore();

  useEffect(() => {
    // Simulating socket.io connection
    const mockSocket = {
      connected: true,
      userId,
      userName,
      
      emit: (event: string, data: any) => {
        console.log('[v0] Socket emit:', event, data);
      },
      
      on: (event: string, callback: (data: any) => void) => {
        console.log('[v0] Socket on:', event);
      },
      
      disconnect: () => {
        console.log('[v0] Socket disconnected');
      },
    };

    socketRef.current = mockSocket;

    // Simulate user joined
    setCollaborativeUsers([
      {
        id: userId,
        name: userName,
        color: '#00f0ff',
        isActive: true,
        lastUpdate: Date.now(),
      },
    ]);

    return () => {
      if (socketRef.current?.disconnect) {
        socketRef.current.disconnect();
      }
    };
  }, [portfolioId, userId, userName, setCollaborativeUsers]);

  const broadcastSectionUpdate = (sectionId: string, updates: any) => {
    if (socketRef.current?.emit) {
      socketRef.current.emit('section_updated', {
        sectionId,
        updates,
        timestamp: Date.now(),
      });
    }
  };

  const broadcastSelectionChange = (sectionId: string | null) => {
    if (socketRef.current?.emit) {
      socketRef.current.emit('selection_changed', {
        sectionId,
        userId,
        timestamp: Date.now(),
      });
    }
  };

  return {
    socket: socketRef.current,
    broadcastSectionUpdate,
    broadcastSelectionChange,
  };
};
