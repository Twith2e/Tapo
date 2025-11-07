import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("tapo_accessToken");
    const pathname = window.location.pathname;
    console.log(pathname);

    const publicPrefixes = ["/", "/signup", "/otp", "/complete-registration"];
    const isPublicRoute = publicPrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
    );
    if (!isPublicRoute && (!accessToken || accessToken === "null")) {
      return Promise.reject(new Error("No access token; request blocked."));
    }
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { data } = await axios.post(
            "http://localhost:3001/users/refresh-token",
            {},
            { withCredentials: true }
          );
          localStorage.setItem("tapo_accessToken", data.accessToken);
          onTokenRefreshed(data.accessToken);
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed, logging out...");
          localStorage.removeItem("tapo_accessToken");
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push((newToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
