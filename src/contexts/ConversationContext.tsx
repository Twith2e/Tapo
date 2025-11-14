import { useUserContext } from "@/contexts/UserContext";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useSocketContext } from "@/contexts/SocketContext";

type ConversationContextType = {
  roomId: string;
  setRoomId: (roomId: string) => void;
  email: string | null;
  createConversation: (email: string, id: string) => void;
  contact: string | null;
  initialized: boolean;
};

const ConversationContext = createContext<ConversationContextType>({
  roomId: "",
  setRoomId: () => {},
  email: null,
  createConversation: () => {},
  contact: null,
  initialized: false,
});

export default function ConversationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { emit, on } = useSocketContext();
  const { user } = useUserContext();
  const [roomId, setRoomId] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [contact, setContact] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  function createConversation(email: string, id: string) {
    const ids = [user._id, id].sort();
    const localRoomId = `direct:${ids[0]}:${ids[1]}`;
    setEmail(email);
    setContact(id);
    setRoomId(localRoomId);
    setInitialized(true);
    emit(
      "initiate-chat",
      { userId: id, contactId: email, room: localRoomId },
      (ack: any) => {
        if (ack && ack.status === "ok") {
          setRoomId(ack.roomId ?? localRoomId);
        }
      }
    );
  }

  useEffect(() => {
    if (!on) return;
    const off = on("chat-initialized", ({ roomId }) => {
      setRoomId(roomId);
      setInitialized(true);
    });
    console.log("chat-initialized", roomId);

    return off;
  }, [on]);

  return (
    <ConversationContext.Provider
      value={{
        roomId,
        setRoomId,
        email,
        createConversation,
        contact,
        initialized,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversationContext() {
  const ctx = useContext(ConversationContext);
  if (!ctx) {
    throw new Error(
      "useConversationContext must be used within a ConversationContextProvider"
    );
  }
  return ctx;
}
