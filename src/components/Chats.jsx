import { chats } from "../data/Chats";
import { CiSearch } from "react-icons/ci";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

export default function Chats() {
  return (
    <div className="py-3 px-2 relative h-screen">
      <div className="flex items-center justify-between">
        <span className="font-rubik px-1 text-2xl">Messages</span>
        <div className="flex gap-3">
          <button>
            <BiSolidMessageSquareAdd size={24} />
          </button>
          <button>
            <BsFilter size={24} />
          </button>
        </div>
      </div>
      <div
        className="border-1 flex items-center px-3 bg-[#0f1a2b] rounded-xl mx-1 my-3"
        role="search"
      >
        <CiSearch size={20} color="white" />
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="p-2 w-full outline-none bg-[#0f1a2b] text-white"
        />
      </div>
      {chats.map(({ id, src, alt, time, name, message, messageCount }) => (
        <button
          key={id}
          className="flex items-center gap-3 font-sans text-black w-full my-1 hover:bg-slate-300 p-2 rounded-md"
        >
          <img height={50} width={50} src={src} alt={alt} />
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between">
              <span className="font-bold text-sm">{name}</span>
              <span
                className={` text-xs ${
                  !messageCount ? "text-gray-400" : "text-sky"
                }`}
              >
                {time}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400 text-left text-sm w-[80%] truncate">
                {message}
              </span>
              {messageCount && (
                <span className="bg-sky text-black text-sm h-5 w-5 rounded-full">
                  {messageCount}
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
