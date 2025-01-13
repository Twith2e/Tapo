import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="flex align-center w-screen h-screen justify-center relative my-5 bg-[#33BEE7]">
      <div className="w-full h-fit mt-[100%] bg-[#33BEE7]">
        <Outlet />
      </div>
      <div className="w-[125%] h-[125%] bg-white absolute rounded-full -top-[80%]"></div>
    </div>
  );
}
