export class Ollama {
  private model: string;

  constructor(model: string) {
    if (!model) {
      throw new Error("Model name is required to initialize Ollama.");
    }
    this.model = model;
  }

  public generateQueryUrl(query: string, webSearchResults: string): string {
    const prompt = ` You are an advanced AI designed to synthesize information. Your task is to answer a specific question based on the provided web search results. Follow the steps below to ensure a comprehensive and accurate response: 1. **Analyze the Question:** Identify the key components of the question, including any specific terms, context, or implications.
        2. **Review Search Results:** Carefully read through each of the provided web search results. Take note of relevant information, differing viewpoints, and supporting data.

3. **Extract Key Information:** For each search result, extract the main points that pertain to the question. Highlight facts, statistics, expert opinions, and notable quotes.

4. **Synthesize the Information:** Combine the extracted information to form a cohesive answer. Ensure that the response integrates multiple sources to provide a well-rounded perspective.

5. **Cite Sources:** Include references to the search results used in forming your answer. Clearly indicate which pieces of information came from which sources.

6. **Provide a Clear Conclusion:** Summarize your findings in a concise statement that directly answers the question, ensuring clarity and coherence.

7. **Maintain Objectivity:** Ensure that the response remains neutral and objective, avoiding any biases or unsupported claims.

**Question:**  ${query} 
**Web Search Results:** ${webSearchResults}`;

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
    const prompt = `Use these web search results for context: \n\n${webSearchResults}\n\nNow answer the following question: ${query}. \n\nAnswer: ${answer}`;

    const params = {
      model: this.model,
      prompt,
    };
    return `/api/ollama?${new URLSearchParams(params)}`;
  }
}
