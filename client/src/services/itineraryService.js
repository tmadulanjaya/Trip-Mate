import api from "./api";

export const itineraryService = {
  async getForTrip(tripId)    { const { data } = await api.get(`/trips/${tripId}/items`);       return data; },
  async create(tripId, item)  { const { data } = await api.post(`/trips/${tripId}/items`, item); return data; },
  async update(itemId, patch) { const { data } = await api.patch(`/items/${itemId}`, patch);    return data; },
  async remove(itemId)        { await api.delete(`/items/${itemId}`); },
};
