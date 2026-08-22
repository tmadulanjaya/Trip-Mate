import api from "./api";

export const pollService = {
  async getForTrip(tripId)   { const { data } = await api.get(`/trips/${tripId}/polls`);           return data; },
  async create(tripId, poll) { const { data } = await api.post(`/trips/${tripId}/polls`, poll);     return data; },
  async vote(pollId, optId)  { const { data } = await api.post(`/polls/${pollId}/vote`, { optionId: optId }); return data; },
};
