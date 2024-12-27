
import { HistoryData } from "@/config/database";

export interface HistoryStoreType {
  history: HistoryData[]
}

export const initialHistoryState: HistoryStoreType = {
  history: []
};
