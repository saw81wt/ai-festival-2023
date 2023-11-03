import { OpenAICollection } from '@/constants/openaiCollection';
import { NextResponse } from 'next/server';
import {
  CHAT_SYSTEM_PROMPT_CONTENT,
  userChatPromptContent,
} from '@/constants/chatPrompt';

export async function POST(request: Request) {
  const jsonRequest = await request.json();
  // console.log(jsonRequest);
  const openai = new OpenAICollection();
  const completion = await openai.createCompletion({
    userContent: userChatPromptContent(jsonRequest),
    systemPrompt: CHAT_SYSTEM_PROMPT_CONTENT,
  });
  if (!completion.message.content) return;
  const res = completion.message.content;

  return NextResponse.json(res);
}
