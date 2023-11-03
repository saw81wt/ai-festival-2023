import OpenAI from "openai"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }) {
  const openai = new OpenAI()

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "" },
    ],
    model: "gpt-4",
    temperature: 0,
  })

  console.log(completion.choices[0])

  const id = params.slug
  return NextResponse.json(id)
}
