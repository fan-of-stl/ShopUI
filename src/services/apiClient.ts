import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

// 🔐 CSRF attach
apiClient.interceptors.request.use((config) => {
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrfToken="))
    ?.split("=")[1];

  if (csrfToken) {
    config.headers["X-CSRF-TOKEN"] = csrfToken;
  }

  return config;
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =========================
// RESPONSE INTERCEPTOR
// =========================

const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-otp",
  "/auth/refresh",
  "/auth/forget-password-otp",
];

apiClient.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    const requestUrl =
      originalRequest.url || "";

    // ❌ skip auth routes
    const isAuthRoute =
      authRoutes.some((route) =>
        requestUrl.includes(route)
      );

    if (isAuthRoute) {
      return Promise.reject(error);
    }

    // 🔥 token expired
    if (
     [401, 403].includes(
    error.response?.status
    ) &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const csrfToken =
          document.cookie
            .split("; ")
            .find((row) =>
              row.startsWith(
                "csrfToken="
              )
            )
            ?.split("=")[1] || "";

        const refreshResponse =
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh` || "http://localhost:8080/api/auth/refresh",
            {},
            {
              withCredentials: true,

              headers: {
                "X-CSRF-TOKEN":
                  csrfToken,
              },
            }
          );

        const newAccessToken =
          refreshResponse.data.data
            .accessToken;

        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return apiClient(
          originalRequest
        );

      } catch (refreshError) {

        localStorage.removeItem(
          "accessToken"
        );

        // window.location.href =
        //   "/login";
        console.log(document.cookie);
        

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);
export default apiClient;