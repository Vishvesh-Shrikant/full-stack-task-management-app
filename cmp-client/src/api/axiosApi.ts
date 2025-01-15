import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`, 
    withCredentials: true, 
});


api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Check if the error is due to token expiration
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          // Attempt to refresh the token
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            const response = await axios.post(`/auth/checkRefreshToken`, { token: refreshToken });
            const newAccessToken = response.data.accessToken;
  
            // Save the new access token
            localStorage.setItem('accessToken', newAccessToken);
  
            // Retry the original request with the new access token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error('Failed to refresh token', refreshError);
          // Handle token refresh failure (e.g., log out the user)
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login'; // Redirect to login
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );

export default api