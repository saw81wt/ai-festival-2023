import { UMessage } from '@/types/TMessage';
import OpenAI from 'openai';

interface CompletionOptions {
  userContent: string;
  systemPrompt?: string;
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
}

interface IOpenAICollectionParams {
  model: GptModelType;
  temperature: number;
}
type GptModelType = 'gpt-4' | 'gpt-3.5-turbo';

export class OpenAICollection {
  private openai: OpenAI;
  private model: GptModelType = 'gpt-4';
  private temperature: number = 0;

  constructor(param?: IOpenAICollectionParams) {
    if (param) {
      this.model = param.model;
      this.temperature = param.temperature;
    }
    this.openai = new OpenAI();
  }

  async chatPromptContent(messages: OpenAIMessage[]) {
    const completion = await this.openai.chat.completions.create({
      messages: messages,
      model: this.model,
      temperature: this.temperature,
    });

    return completion.choices[0];
  }

  async createCompletion(options: CompletionOptions) {
    const { userContent, systemPrompt } = options;

    const completion = await this.openai.chat.completions.create({
      messages: systemPrompt
        ? [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: userContent,
            },
          ]
        : [
            {
              role: 'user',
              content: userContent,
            },
          ],
      model: this.model,
      temperature: this.temperature,
    });

    return completion.choices[0];
  }

  async createChatCompletion(messages: OpenAIMessage[]) {
    const completion = await this.openai.chat.completions.create({
      messages: messages,
      model: this.model,
      temperature: this.temperature,
    });

    return completion.choices[0];
  }
}
