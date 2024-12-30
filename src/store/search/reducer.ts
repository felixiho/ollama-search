import { SearchResultType } from "@/app/home/features/search/types";
import { produce } from "immer";

export interface UpdateSearchResults {
  id: string;
  key: keyof SearchResultType;
  type: "updateSearchResult" | "updateFollowupResult";
  value: SearchResultType[keyof SearchResultType];
}

export const searchReducer = (
  state: SearchResultType[],
  payload: UpdateSearchResults,
): SearchResultType[] => {
  switch (payload.type) {
    case "updateSearchResult": {
      return produce(state, (draftState) => {
        const { id, key, value } = payload;
        const message = draftState.find((i) => i.id === id);
        if (!message) return;
        // @ts-expect-error eslint
        message[key] = value;
      });
    }
    default: {
      throw new Error("Invalid action type");
    }
  }
};
