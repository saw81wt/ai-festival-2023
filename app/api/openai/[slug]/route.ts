import OpenAI from "openai"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }:{ params: { slug: string } }) {
  const openai = new OpenAI()

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-4",
  })

  console.log(completion.choices[0])

  const id = params.slug
  return NextResponse.json(id)
}
