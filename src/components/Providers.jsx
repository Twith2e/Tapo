import { QueryClientProvider, QueryClient } from "react-query";
import { SocketContextProvider } from "../contexts/SocketContext";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "../contexts/UserContext";

export default function Providers({ children }) {
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <SocketContextProvider token={null}>
          <UserContextProvider>{children}</UserContextProvider>
        </SocketContextProvider>
      </QueryClientProvider>
    </Router>
  );
}
