import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div
      className="flex to-bg-[#33BEE7] from-white via-white h-screen align-middle bg-gradient-to-b justify-center"
      style={{
        background: "linear-gradient(to bottom, white 40%, #33BEE7 40%)",
      }}
    >
      <div className="mt-[20%] w-[60%]">
        <Outlet />
      </div>
    </div>
  );
}
