import api from "./api";

export const expenseService = {
  async getForTrip(tripId)      { const { data } = await api.get(`/trips/${tripId}/expenses`);       return data; },
  async create(tripId, expense) { const { data } = await api.post(`/trips/${tripId}/expenses`, expense); return data; },
  async update(id, patch)       { const { data } = await api.patch(`/expenses/${id}`, patch);        return data; },
  async remove(id)              { await api.delete(`/expenses/${id}`); },
};
