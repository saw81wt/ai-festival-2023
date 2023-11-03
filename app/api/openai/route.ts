import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import {
  INITIAL_SYSTEM_PROMPT_CONTENT,
  MedicalQuestionnaire,
  userInitialPromptContent,
} from "./_prompt"
import { OpenAICollection } from "./_openaiCollection"

export async function POST(request: Request) {
  const openai = new OpenAICollection()

  const completion = await openai.createCompletion({
    userContent: userInitialPromptContent(
      request as unknown as MedicalQuestionnaire
    ),
    systemPrompt: INITIAL_SYSTEM_PROMPT_CONTENT,
  })

  return NextResponse.json(completion.message)
}
