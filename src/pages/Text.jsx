import React from "react";
import ScreenMessage from "../components/ScreenMessage";

export default function Text() {
  return (
    <div>
      <img
        className="absolute top-[5%] left-[7%] z-50 w-[70%]"
        src="./src/assets/tapo-text-image.png"
        alt=""
      />

      <div>
        <ScreenMessage
          header={"Message"}
          body={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit vivamus"
          }
        />
      </div>
    </div>
  );
}
