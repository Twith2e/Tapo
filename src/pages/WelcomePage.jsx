import React from "react";
import RegNav from "../components/RegNav";

export default function WelcomePage() {
  return (
    <div className="font-sans text-center text-white flex flex-col justify-between">
      <div>
        <p className="text-[45.39px] font-[500] leading-[53.79px]">Welcome</p>
        <p className="text-[21.18px] leading-[30.26px] font-normal">
          Let's help you get started
        </p>
      </div>
      <div className="mt-[50%]">
        <RegNav />
      </div>
    </div>
  );
}
