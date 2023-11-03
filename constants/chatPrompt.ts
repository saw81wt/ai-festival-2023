import { TChat } from '@/types/TChat';
import { UMessage, TBotMessage, TUserMessage } from '@/types/TMessage';

export const CHAT_SYSTEM_PROMPT_CONTENT = `命令
これから以下の[## 制約条件]に厳密に従ってロールプレイを行ってください

制約条件
最終的な出力は、以下のJSON形式で必ずそれのみ出力してください

出力フォーマット
{"answer": string};`;

export const userChatPromptContent = (param: TChat) => {
  return `あなたはクライアントの好みのカウンセリングアプローチに沿ってメンタルヘルスカウンセラーです。提示された[# クライアントの悩み事]に対して、提示された[# カウンセリングアプローチ ]に厳密に沿ってカウンセリングを行うというロールプレイを行なってください。その際、受け答えは[# クライアントの入力]に対して行なってください。[# カウンセリングアプローチ ]に厳密に沿うことは絶対に忘れないでください。
  ただし、以下の[# 出力フロー]に従って、実行してください。
  ちなみに、カウンセリングアプローチは発散系（共感とカジュアルな会話で悩みを和らげる）か収束系（問題解決に焦点を当てた直接的な質問とアドバイス）に定義されます。
    
    [# カウンセリングアプローチ ]
    ${param.counselingApproach}
    
    [# クライアントの入力]
    ${param.clientInput}
    
    [# カウンセリング終了フラグ]
    ${param.counselingEndFlag}
    
    [# 出力フロー]
    クライアントを悩み事があることによるによる不快感から解放に向かえるような受け答えをしてください。この際に質問を投げかける場合は質問は1問以下にしてください。
    ただし、[# カウンセリング終了フラグ]がtrueの場合、質問は投げかけず、これまでのカウンセリングをまとめて、一つだけアドバイスをしてください。
    その答えとなる文字列、または最後のまとめとアドバイスをJSONの"answer" Keyの値に文字列で格納してください。`;
};

export const userChatPromptContentV2 = (param: TUserMessage) => {
  return `あなたはクライアントの好みのカウンセリングアプローチに沿ってメンタルヘルスカウンセラーです。提示された[# クライアントの悩み事]に対して、提示された[# カウンセリングアプローチ ]に厳密に沿ってカウンセリングを行うというロールプレイを行なってください。その際、受け答えは[# クライアントの入力]に対して行なってください。[# カウンセリングアプローチ ]に厳密に沿うことは絶対に忘れないでください。
  ただし、以下の[# 出力フロー]に従って、実行してください。
  ちなみに、カウンセリングアプローチは発散系（共感とカジュアルな会話で悩みを和らげる）か収束系（問題解決に焦点を当てた直接的な質問とアドバイス）に定義されます。
    
    [# カウンセリングアプローチ ]
    ${param.counselingApproach}
    
    [# クライアントの入力]
    ${param.text}
    
    [# カウンセリング終了フラグ]
    ${param.counselingEndFlag}
    
    [# 出力フロー]
    クライアントを悩み事があることによるによる不快感から解放に向かえるような受け答えをしてください。この際に質問を投げかける場合は質問は1問以下にしてください。
    ただし、[# カウンセリング終了フラグ]がtrueの場合、質問は投げかけず、これまでのカウンセリングをまとめて、一つだけアドバイスをしてください
    その答えとなる文字列をJSONの"answer" Keyの値に格納してください。`;
};

export const createChatPromptContents = (messages: UMessage[]) => {
  return messages.map((message) => {
    if (isUserMessgage(message)) {
      // TUserMessage logic
      return {
        role: 'user',
        content: userChatPromptContentV2(message),
      };
    } else {
      // Message
      return {
        role: 'assistant',
        content: message.text,
      };
    }
  });
};

const isUserMessgage = (message: UMessage): message is TUserMessage => {
  return message.sender === 'user';
};
