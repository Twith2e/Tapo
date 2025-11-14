import { formatTime } from "@/utils/utils";
import { LucideCheckCheck } from "lucide-react";

const Message = ({
  message,
  isUser,
  time,
}: {
  message: string;
  isUser: boolean;
  time: string;
}) => {
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[75%] p-3 rounded-2xl 
      ${isUser ? "bg-[#33BEE7] text-white" : "bg-[#E6F8FB] text-black"}
    `}
        style={{
          borderBottomRightRadius: isUser ? "6px" : "16px",
          borderBottomLeftRadius: isUser ? "16px" : "6px",
        }}
      >
        {/* Message text */}
        <span className="block wrap-break-word pr-12 leading-relaxed">
          {message}
        </span>

        {/* Time + ticks (WhatsApp-style bottom right) */}
        <div
          className="
        absolute bottom-2 right-3
        flex items-center gap-1
        text-[10px] opacity-70
      "
        >
          {formatTime(time)}
          {isUser && <LucideCheckCheck className="w-[14px] h-[14px]" />}
        </div>
      </div>
    </div>
  );
};

export default Message;
