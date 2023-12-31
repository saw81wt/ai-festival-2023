import { TQuestion } from '@/types/TQuestion';

export const INITIAL_SYSTEM_PROMPT_CONTENT = `命令
これから以下の[## 制約条件]に厳密に従ってロールプレイを行ってください

制約条件
最終的な出力は、以下のJSON形式で必ずそれのみ出力してください

出力フォーマット
{"counselling_type": string};`;

export const userInitialPromptContent = (param: TQuestion) => {
  return `あなたはクライアントの好みと現在の精神状態に基づいてカウンセリングアプローチを推薦するために設計されたメンタルヘルスアシスタントです。提供された[# 問診票の情報]を使って、最適なカウンセリングアプローチを決定するというロールプレイを行なってください。ただし、以下の[# 出力フロー]に従って、実行してください。：発散系（共感とカジュアルな会話で悩みを和らげる）か収束系（問題解決に焦点を当てた直接的な質問とアドバイス）。
      問診票の情報
      心理的不調：${param.question1}
      ストレスレベル：${param.question2}
      友人と最後に楽しんだ経験：${param.question3}
      ストレスや悩みがある時に取り組む活動：${param.question4}
      新しい状況に対するアプローチ：${param.question5}
      理想的な週末の過ごし方：${param.question6}

      出力フロー
      このデータに基づいて、発散系か収束系のカウンセリングアプローチのどちらを推薦すべきでしょうか？"発散系"または"収束系"どちらかの文字列をJSONの"counselling_type" Keyの値に格納してください`;
};
