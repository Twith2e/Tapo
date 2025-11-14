import { LuSendHorizontal } from "react-icons/lu";
import { IoMdCall } from "react-icons/io";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { useSocketContext } from "../contexts/SocketContext";
import { FormEvent, useState } from "react";
import { useEffect } from "react";
import { useConversationContext } from "../contexts/ConversationContext";
import { useUserContext } from "@/contexts/UserContext";
import Message from "./Message";

type MessageType = {
  id: string;
  conversationId: string;
  from: string;
  message: string;
  ts: string;
};

export default function ChatUI() {
  const { user } = useUserContext();
  const { emit, on, connected } = useSocketContext();
  const { email, contact, roomId, initialized } = useConversationContext();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<MessageType>>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message) return;
    if (!initialized || !roomId) {
      console.error("Initialized or room id does not exist");
      return;
    }
    if (!connected) {
      console.error("Socket not connected");
      return;
    }

    const payload = {
      userA: user._id,
      userB: contact,
      roomId,
      message,
      from: user._id,
    };

    console.log("payload", payload);

    emit("send-message", payload, (ack: any) => {
      if (!ack) {
        // no ack -> treat as transient failure
        console.error("no ack from server");
        return;
      }
      if (ack.status === "error") {
        // server-side failure (e.g. conversation not found)
        console.error("send error:", ack.error);
      } else {
        setMessages((prev) => [...prev, ack.payload]);
      }
    });
    setMessage("");
  }

  useEffect(() => {
    if (!on) return;

    const handleIncoming = (incoming: any) => {
      console.log("chat-message", incoming);
      setMessages((prev) => [...prev, incoming]);
    };

    const off = on("chat-message", handleIncoming);

    return off;
  }, [on, roomId]);

  return (
    <div className="flex flex-col h-full w-full">
      <header className="bg-sky w-full p-3 h-16 flex items-center justify-between">
        <span className="text-black">{email || "Contact"}</span>
        <div className="flex items-center gap-3">
          <button type="button">
            <HiOutlineVideoCamera />
          </button>
          <button type="button">
            <IoMdCall />
          </button>
        </div>
      </header>
      <div className="grow overflow-y-auto p-4 flex flex-col h-[80%]">
        {messages.map((message) => (
          <Message
            message={message.message}
            isUser={message.from === user._id}
            time={message.ts}
          />
        ))}
      </div>
      <form
        className="border-t border-sky px-2 flex items-center h-14 bg-white "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="text-black grow px-2 py-1 h-full outline-none placeholder:text-gray-400"
          placeholder="Type a message"
          value={message || ""}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          aria-label="send message button"
          className="ml-2"
          disabled={!initialized || !connected}
        >
          <LuSendHorizontal size={24} />
        </button>
      </form>
    </div>
  );
}
