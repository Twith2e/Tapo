import { createContext, useContext, useEffect } from "react";
import { useGetUser } from "../services/user/user";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const { data: user, isLoading } = useGetUser();
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || !user) return;
    const publicPrefixes = ["/", "/signup", "/otp", "/complete-registration"];

    const path = location.pathname;
    console.log(path);

    const isOnPublicRoute = publicPrefixes.some(
      (prefix) => path === prefix || path.startsWith(prefix + "/*")
    );
    if (isOnPublicRoute) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoading, user, location.pathname, navigate]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return ctx;
}
