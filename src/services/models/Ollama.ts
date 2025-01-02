import { ChatOllama } from "@langchain/ollama";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import {
  generate_targeted_web_search_query,
  generateFollowupPrompt,
  generateMainPrompt,
} from "@/utils/prompts";

export class Ollama {
  private model: string;

  constructor(model: string) {
    if (!model) {
      throw new Error("Model name is required to initialize Ollama.");
    }
    this.model = model;
  }

  async generateSearchQuery(query: string, prevQuery: string): Promise<string> {
    const llm = new ChatOllama({
      model: this.model,
      format: "json",
    });
    const formattedQuery = generate_targeted_web_search_query(query);
    const messages = [
      new SystemMessage({ content: formattedQuery }),
      new HumanMessage({
        content: prevQuery
          ? `Generate a query for web search given that the previous query was ${prevQuery}`
          : "Generate a query for web search:",
      }),
    ];

    // Invoke the model
    const result = await llm.invoke(messages);
    let prompt = {};
    if (typeof result.content === "string") {
      try {
        prompt = JSON.parse(result.content);
      } catch (error) {
        console.error("Failed to parse result.content as JSON:", error);
      }
    } else {
      console.error("result.content is not a string:", result.content);
    }
    const searchQuery = (prompt as { query?: string }).query || "";
    return searchQuery;
  }

  async generateQueryUrl(
    query: string,
    webSearchResults: string,
  ): Promise<string> {
    const prompt = generateMainPrompt(webSearchResults, query);
    const params = {
      model: this.model,
      prompt,
    };
    return `/api/ollama?${new URLSearchParams(params)}`;
  }

  public generateFollowupQueryUrl(
    query: string,
    webSearchResults: string,
    answer: string,
  ): string {
    const prompt = generateFollowupPrompt(answer, query, webSearchResults);
    const params = {
      model: this.model,
      prompt,
    };
    return `/api/ollama?${new URLSearchParams(params)}`;
  }
}
