import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import {
  INITIAL_SYSTEM_PROMPT,
  userInitialPrompt,
  MedicalQuestionnaire,
} from './_prompt';

export async function GET(request: Request) {
  const openai = new OpenAI();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: INITIAL_SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: '',
      },
    ],
    model: 'gpt-4',
    temperature: 0,
  });

  return NextResponse.json(completion.choices[0].message);
}
