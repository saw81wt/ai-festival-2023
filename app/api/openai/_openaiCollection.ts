import OpenAI from "openai"

interface CompletionOptions {
  systemPrompt: string
  userContent: string
  model?: string
  temperature?: number
}

class OpenAICollection {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI()
  }

  async createCompletion(options: CompletionOptions) {
    const {
      systemPrompt,
      userContent,
      model = "gpt-4",
      temperature = 0,
    } = options

    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      model: model,
      temperature: temperature,
    })

    return completion.choices[0]
  }
}
