import { StateCreator } from "zustand";
import { HistoryStore } from "./store";
import { HistoryStoreType } from "./initialState";
import { IndexedDB } from "@/config/database";
import { DB_NAME, HISTORY_STORE } from "./constants";

export interface HistoryActionsType {
  initializeHistory: () => Promise<void>
}

export const HistoryActions: StateCreator<
  HistoryStore,
  [],
  [],
  HistoryActionsType
> = (set, get) => ({
  async initializeHistory() {
    const db = new IndexedDB(DB_NAME, HISTORY_STORE)
    await db.openDB()
    const allData = await db.getAllRecords() 
    set({ history: allData }, false)
  },
});
