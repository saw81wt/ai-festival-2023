import { TQuestion } from '@/types/TQuestion';
import { OpenAICollection } from '../constants/openaiCollection';
import { INITIAL_SYSTEM_PROMPT_CONTENT, userInitialPromptContent } from '../constants/prompt';
import { NextResponse } from 'next/server';
import { redirect } from 'next/dist/server/api-utils';

export async function requestQuestion(question: TQuestion) {
  
}
