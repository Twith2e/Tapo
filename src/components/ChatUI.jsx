import { LuSendHorizontal } from "react-icons/lu";
import { IoMdCall } from "react-icons/io";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { useSocketContext } from "../contexts/SocketContext";
import { useState } from "react";
import { useEffect } from "react";

export default function ChatUI() {
  const { emit, on } = useSocketContext();
  const [message, setMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    emit("send-message", message);
    setMessage("");
  }

  useEffect(() => {
    on("send-message", (msg) => console.log(msg));
  }, [on]);

  return (
    <div className="flex flex-col h-full w-full">
      <header className="bg-sky w-full p-3 h-16 flex items-center justify-between">
        <span className="text-white">John Doe</span>
        <div className="flex items-center gap-3">
          <button type="button">
            <HiOutlineVideoCamera />
          </button>
          <button type="button">
            <IoMdCall />
          </button>
        </div>
      </header>
      <div className="flex-grow overflow-y-auto p-4 flex flex-col h-[80%]"></div>
      <form
        className="border-t border-sky px-2 flex items-center h-14 bg-white "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="text-black flex-grow px-2 py-1 h-full outline-none placeholder:text-gray-400"
          placeholder="Type a message"
          value={message || ""}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button aria-label="send message button" className="ml-2">
          <LuSendHorizontal size={24} />
        </button>
      </form>
    </div>
  );
}
