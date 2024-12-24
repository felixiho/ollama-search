

export class Ollama {
    private model: string;

    constructor(model: string) {
        if (!model) {
            throw new Error("Model name is required to initialize Ollama.");
        }
        this.model = model;
    }

    public generateQueryUrl(query: string, webSearchResults: string): string {
        const prompt = `You are an expert assistant. Here are some web search results for context: \n\n${webSearchResults}\n\nNow answer the following question: ${query}.`;

        const params = {
            model: this.model,
            prompt
        }
        return `/api/ollama?${new URLSearchParams(params)}`;
    }


    public async handleFollowUp(followUpQuery: string, onStream: (chunk: string) => void): Promise<void> {
        //     const conversationContext = this.context.join("\n\n");
        //     const prompt = `${conversationContext}\n\nFollow-up question: ${followUpQuery}`;
        //     this.context.push(`Q: ${followUpQuery}`);
        //     const params = {
        //         model: this.model,
        //         query: prompt
        //     }

        //     return `/api/ollama?${new URLSearchParams(params)}`;
        // }
    }
}