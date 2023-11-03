'use server'

interface SendChatResponse {
    answer: string
}

export async function sendChat(): Promise<SendChatResponse> {
  return { answer: "こんにちは，池永の池ちゃんだよ" }
}
