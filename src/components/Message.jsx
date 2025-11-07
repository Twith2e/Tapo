import { LucideCheckCheck } from "lucide-react";

const Message = ({ message, isUser, time }) => {
  return (
    <div className="flex justify-between">
      <span>{message}</span>
      <div className="flex gap-2 items-center">
        {time}
        {isUser && (
          <span>
            <LucideCheckCheck />
          </span>
        )}
      </div>
    </div>
  );
};

export default Message;
