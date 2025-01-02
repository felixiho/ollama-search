export const generate_targeted_web_search_query = (searchQuery: string) => `
Your goal is to generate targeted web search query.

The query will gather information related to a specific topic.

Topic:
${searchQuery}

Return your query as a JSON object:
{{
    "query": "string",
    "aspect": "string",
    "rationale": "string"
}}
`;

export const generateMainPrompt = (
  searchResults: string,
  query: string,
) => `You are an expert at synthesizing information from search results to provide comprehensive, accurate answers.

QUERY: ${query}

SEARCH RESULTS:
${searchResults}

Provide a detailed answer that:
1. Addresses the query directly without preambles or introductory phrases
2. Synthesizes information while avoiding phrases like "based on results" or "according to sources"
3. Integrates source citations naturally using [Result #X] inline with the relevant information
4. Maintains factual accuracy without extrapolating beyond provided information
5. Presents conflicting information clearly when it exists
6. Organizes information logically with clear paragraph breaks
7. Uses concrete examples and evidence from the search results
8. Acknowledges information gaps when relevant
9. Includes essential context for full understanding
10. Ends with key takeaways without labeling them as a summary or conclusion
11. Avoid headings with "Summary" or "Conclusion"


MARKDOWN FORMATTING GUIDELINES:
- Use headings (##) for major sections
- Format lists with proper markdown syntax
- Use bold (**) for emphasis of key points
- Use inline code blocks (\`) for technical terms
- Use horizontal rules (---) to separate major sections if needed
- Use blockquotes (>) for important quotes from sources
- Include code blocks (\`\`\`) for any technical content
- Properly indent nested lists
- Use proper line breaks between sections
- Omit references section or bibliography

ANSWER:`;

export function generateFollowupPrompt(
  previousAnswer: string,
  currentQuery: string,
  currentResults: string,
): string {
  return `You are an expert at synthesizing information from search results to provide comprehensive, accurate answers.

PREVIOUS ANSWER:
${previousAnswer}

 QUERY: ${currentQuery}

SEARCH RESULTS:
${currentResults}

Provide a detailed answer that:
1. Addresses the query directly without preambles or introductory phrases
2. Uses relevant information from the previous answer when appropriate
3. Synthesizes information while avoiding phrases like "based on results" or "according to sources"
4. Integrates source citations naturally using [Result #X] inline with the relevant information
5. Maintains factual accuracy without extrapolating beyond provided information
6. Presents conflicting information clearly when it exists
7. Organizes information logically with clear paragraph breaks
8. Uses concrete examples and evidence from the search results
9. Acknowledges information gaps when relevant
10. Ends with key takeaways without labeling them as a summary or conclusion


MARKDOWN FORMATTING GUIDELINES:
- Use headings (##) for major sections
- Format lists with proper markdown syntax
- Use bold (**) for emphasis of key points
- Use inline code blocks (\`) for technical terms
- Use horizontal rules (---) to separate major sections if needed
- Use blockquotes (>) for important quotes from sources
- Include code blocks (\`\`\`) for any technical content
- Properly indent nested lists
- Use proper line breaks between sections
- Omit references section or bibliography

ANSWER:`;
}
