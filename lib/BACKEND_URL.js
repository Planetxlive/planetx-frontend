const BACKEND_URL = "https://planetx-backend.vercel.app";
export default BACKEND_URL;

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken")?.replace(/^"|"$/g, "") || null;
  }
  return null;
};
