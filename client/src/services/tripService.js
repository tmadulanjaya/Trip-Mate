import api from "./api";

export const tripService = {
  async getAll()              { const { data } = await api.get("/trips");                  return data; },
  async getById(id)           { const { data } = await api.get(`/trips/${id}`);            return data; },
  async create(payload)       { const { data } = await api.post("/trips", payload);         return data; },
  async update(id, patch)     { const { data } = await api.patch(`/trips/${id}`, patch);   return data; },
  async remove(id)            { await api.delete(`/trips/${id}`); },
  async addMember(id, email)  { const { data } = await api.post(`/trips/${id}/members`, { email }); return data; },
};
