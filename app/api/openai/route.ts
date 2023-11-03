import OpenAI from "openai"
import { NextResponse } from "next/server"

export async function GET(request: Request, { }) {
  
  const openai = new OpenAI()

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `命令
      これから以下の[## 制約条件]に厳密に従ってロールプレイを行ってください
      
      制約条件
      最終的な出力は、以下のJSON形式で出力してください
      
      出力フォーマット
      {"counselling_type": string};`,
      },
      {
        role: "user",
        content: `あなたはクライアントの好みと現在の精神状態に基づいてカウンセリングアプローチを推薦するために設計されたメンタルヘルスアシスタントです。提供された[# 問診票の情報]を使って、最適なカウンセリングアプローチを決定するというロールプレイを行なってください。ただし、以下の[# 出力フロー]に従って、実行してください。：発散系（共感とカジュアルな会話で悩みを和らげる）か収束系（問題解決に焦点を当てた直接的な質問とアドバイス）。

      問診票の情報
      心理的不調：疲労感、睡眠困難
      ストレスレベル：中程度
      友人と最後に楽しんだ経験：一対一で深い話をした
      ストレスや悩みがある時に取り組む活動：音楽を聴く、または演奏する
      新しい状況に対するアプローチ：他人にアドバイスを求める
      理想的な週末の過ごし方：アート作品を作る、書くなどの創造的活動
      
      出力フロー
      このデータに基づいて、発散系か収束系のカウンセリングアプローチのどちらを推薦すべきでしょうか？"発散系"または"収束系"どちらかの文字列をJSONの"counselling_type" Keyの配列に格納してください`,
      },
    ],
    model: "gpt-4",
    temperature: 0,
  })

  console.log(completion.choices[0])

  return NextResponse.json(completion.choices[0])
}
