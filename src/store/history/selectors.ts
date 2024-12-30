import { HistoryStore } from "./store";

const getAllHistory = (s: HistoryStore) => s.history;

export const historySelectors = {
  getAllHistory,
};
