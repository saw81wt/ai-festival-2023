import { OpenAICollection } from '@/constants/openaiCollection';
import { NextResponse } from 'next/server';
import { CHAT_SYSTEM_PROMPT_CONTENT } from '@/constants/chatPrompt';
import { createChatPromptContents } from '@/constants/chatPrompt';
import { OpenAIMessage } from '@/constants/openaiCollection';

export async function POST(request: Request) {
  const jsonRequest = await request.json();
  const openai = new OpenAICollection();
  const chatPromptContents = createChatPromptContents(jsonRequest.messages);
  console.log(chatPromptContents);

  const firstMessage = {
    role: 'system',
    content: CHAT_SYSTEM_PROMPT_CONTENT,
  };

  const insertMessage = [firstMessage, ...chatPromptContents];
  const completion = await openai.chatPromptContent(
    insertMessage as OpenAIMessage[]
  );
  if (!completion.message.content) return;
  const res = completion.message.content;

  return NextResponse.json(res);
}
