import api from "./api";

export const authService = {
  async register(name, email, password) {
    const { data } = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("tripmate_token", data.token);
    return data;
  },
  async login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("tripmate_token", data.token);
    return data;
  },
  async getMe() {
    const { data } = await api.get("/auth/me");
    return data;
  },
  logout() {
    localStorage.removeItem("tripmate_token");
  },
};
