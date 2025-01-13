import React from "react";
import MessageIcon from "./MessageIcon";
import PhoneIcon from "./PhoneIcon";

export default function ScreenMessage({ header, body, message = false }) {
  return (
    <div>
      <div className="flex gap-3 align-middle">
        {message ? <MessageIcon /> : <MessageIcon />}
        <p>{header}</p>
      </div>
      <div>
        <p>{body}</p>
      </div>
    </div>
  );
}
