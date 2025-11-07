import SidebarButton from "../components/SidebarButton";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { buttonInfos } from "../data/ButtonInfos";
import Chats from "../components/Chats";
import { HiOutlineMenu } from "react-icons/hi";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatUI from "../components/ChatUI";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    const newSocket = io("http://localhost:3000/");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server with id:", newSocket.id);
    });

    newSocket.on("welcome", (data) => {
      console.log(data);
      newSocket.emit("thankYou", [4, 5, 6]);
    });

    return () => newSocket.disconnect();
  }, []);
  return (
    <div className="flex h-screen">
      <aside
        className={`border-r py-3 border-sky bg-slate-200 transition-[width, position] duration-700 ease-in-out overflow-hidden flex flex-col justify-between ${
          expanded
            ? "w-60 absolute left-0 bg-slate-200 h-screen top-0 z-10"
            : "w-14"
        }`}
      >
        <div>
          <button
            aria-label="collapse-and-expand-button"
            onClick={() => setExpanded(!expanded)}
            title={expanded ? "Collapse" : "Expand"}
            className="flex justify-center items-center mb-4 px-3"
          >
            <HiOutlineMenu size={25} color="black" />
          </button>

          {buttonInfos.slice(0, 3).map(({ id, icon, text }) => (
            <SidebarButton
              key={id}
              icon={icon}
              text={text}
              expanded={expanded}
              color="gray"
            />
          ))}

          <div className="border-b-[#36454F] border-1 my-3 w-[90%] m-auto"></div>
        </div>
        <div>
          {buttonInfos.slice(3).map(({ id, icon, text, src }, index) => (
            <>
              {index === 1 ? (
                <>
                  <SidebarButton
                    key={id}
                    icon={icon}
                    text={text}
                    expanded={expanded}
                    id={id}
                    src={src}
                    color="gray"
                  />
                  <div className="border-b-[#36454F] border-1 my-3 w-[90%] m-auto"></div>
                </>
              ) : (
                <SidebarButton
                  key={id}
                  id={id}
                  src={src}
                  icon={icon}
                  text={text}
                  expanded={expanded}
                  color="gray"
                />
              )}
            </>
          ))}
        </div>
      </aside>
      <PanelGroup
        className="flex-grow"
        autoSaveId="example"
        direction="horizontal"
      >
        <Panel maxSize={60} minSize={25}>
          <Chats />
        </Panel>
        <PanelResizeHandle className="border-[#36454F] border-3" />
        <Panel defaultSize={30} minSize={20} className="bg-white">
          <ChatUI />
        </Panel>
      </PanelGroup>
    </div>
  );
}
