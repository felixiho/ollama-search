interface StreamMessage {
    response: string;
}



interface StreamEventDetail {
    message: {
        output: string;
    };
    error: {
        error: Error;
        message: string;
        chunk?: string;
    };
    finish: {
        output: string;
    };
    abort: undefined;
}

type StreamEventType = keyof StreamEventDetail;

type StreamEventMap = {
    readonly [K in StreamEventType]: CustomEvent<StreamEventDetail[K]>;
};

export class StreamHandler extends EventTarget {
    private reader: ReadableStreamDefaultReader<Uint8Array>;
    private decoder: TextDecoder;
    private buffer: string;
    private output: string;

    constructor(
        reader: ReadableStreamDefaultReader<Uint8Array>,
        decoder: TextDecoder = new TextDecoder()
    ) {
        super();
        this.reader = reader;
        this.decoder = decoder;
        this.buffer = '';
        this.output = '';
        this.processStream();
    }

    private dispatchStreamEvent<T extends StreamEventType>(
        type: T,
        detail?: StreamEventDetail[T]
    ): void {
        const event = new CustomEvent(type, { detail });
        this.dispatchEvent(event);
    }

    private async processStream(): Promise<void> {
        try {
            while (true) {
                const { done, value } = await this.reader.read();

                if (done) {
                    if (this.buffer.trim()) {
                        try {
                            const parsed: StreamMessage = JSON.parse(this.buffer);
                            this.output += parsed.response;
                            this.dispatchStreamEvent('message', {
                                output: this.output
                            });
                        } catch (e) {
                            this.dispatchStreamEvent('error', {
                                error: e as Error,
                                message: 'Failed to parse final chunk',
                                chunk: this.buffer
                            });
                        }
                    }
                    this.dispatchStreamEvent('finish', { output: this.output });
                    break;
                }

                const decoded = this.decoder.decode(value, { stream: true });
                if (decoded.length) {
                    this.buffer += decoded;
                    const chunks = this.buffer.split('\n');

                    for (let i = 0; i < chunks.length - 1; i++) {
                        const chunk = chunks[i].trim();
                        if (chunk) {
                            try {
                                const parsed: StreamMessage = JSON.parse(chunk); 
                                this.output += parsed.response; 
                                this.dispatchStreamEvent('message', {
                                    output: this.output
                                });
                            } catch (e) {
                                this.dispatchStreamEvent('error', {
                                    error: e as Error,
                                    message: 'Failed to parse chunk',
                                    chunk
                                });
                            }
                        }
                    }
                    this.buffer = chunks[chunks.length - 1];
                }
            }
        } catch (e) {
            this.dispatchStreamEvent('error', {
                error: e as Error,
                message: 'Stream processing failed'
            });
            this.dispatchStreamEvent('abort');
        }
    }

    override addEventListener<K extends StreamEventType>(
        type: K | string,
        listener: ((event: StreamEventMap[K]) => void) | EventListenerOrEventListenerObject | null,
        options?: AddEventListenerOptions | boolean
    ): void {
        super.addEventListener(type, listener as EventListener, options);
    }

    override removeEventListener<K extends StreamEventType>(
        type: K | string,
        listener: ((event: StreamEventMap[K]) => void) | EventListenerOrEventListenerObject | null,
        options?: EventListenerOptions | boolean
    ): void {
        super.removeEventListener(type, listener as EventListener, options);
    }
}