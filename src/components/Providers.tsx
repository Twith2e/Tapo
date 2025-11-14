import { QueryClientProvider, QueryClient } from "react-query";
import { SocketContextProvider } from "../contexts/SocketContext";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider, useUserContext } from "../contexts/UserContext";
import ConversationContextProvider from "@/contexts/ConversationContext";

export default function Providers({ children }) {
  const queryClient = new QueryClient();
  function SocketWithUser({ children }) {
    const { user } = useUserContext();
    return (
      <SocketContextProvider
        url="http://localhost:3000"
        token={null}
        userId={user?._id || ""}
      >
        <ConversationContextProvider>{children}</ConversationContextProvider>
      </SocketContextProvider>
    );
  }
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <SocketWithUser>{children}</SocketWithUser>
        </UserContextProvider>
      </QueryClientProvider>
    </Router>
  );
}
