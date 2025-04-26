// const BACKEND_URL = "https://api.planetx-live.com/api";
const BACKEND_URL = "http://api.planetx-live.com/api";
export default BACKEND_URL;

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken")?.replace(/^"|"$/g, "") || null;
  }
  return null;
};
