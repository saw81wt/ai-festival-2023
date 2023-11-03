import { OpenAICollection } from '@/constants/openaiCollection';
import { INITIAL_SYSTEM_PROMPT_CONTENT, userInitialPromptContent } from '@/constants/initialPrompt';
import { TQuestion } from '@/types/TQuestion';
import { NextResponse } from 'next/server';
import { CHAT_SYSTEM_PROMPT_CONTENT, userChatPromptContent } from '@/constants/chatPrompt';


export async function POST(request: Request) {
  const jsonRequest = await request.json()
 const openai = new OpenAICollection();

  const completion = await openai.createCompletion({
    userContent: userChatPromptContent(
      jsonRequest as TQuestion
    ),
    systemPrompt: CHAT_SYSTEM_PROMPT_CONTENT,
  });
  if (!completion.message.content) return
  const res = completion.message.content
  
  return NextResponse.json(res);
}
