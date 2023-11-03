'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button, Input, Spinner } from '@nextui-org/react';
import { TChat } from '@/types/TChat';
import { UMessage } from '@/types/TMessage';
import { type } from 'os';
import ChatBubble from './ChatBubble';

// type Message = {
//   id: number;
//   text: string;
//   sender: 'user' | 'bot';
// };

// type TUserMessage = Message & Omit<TChat, 'clientInput'>;

// type TBotMessage = Message;

// type TMessage<T> = T extends { sender: 'user' } ? TUserMessage : TBotMessage;

// type UMessage = TUserMessage | TBotMessage;

export default function ChatClientComponent() {
  const [messages, setMessages] = useState<UMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [finished, setFinished] = useState(false);
  const [userIcon, setUserIcon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const userType = params.get('user_type');

  // UserTypeによってアイコンを変える
  const coolBotIcons = ['/cool-man.png', '/cool-woman.png'];
  const tenderBotIcons = ['/tender-man.png', '/tender-woman.png'];
  const botIcon = useMemo(() => {
    const random = Math.floor(Math.random() * 2);
    return userType == '発散系' ? tenderBotIcons[random] : coolBotIcons[random];
  }, [userType]);
  const max_chat_length = 2;

  useEffect(() => {
    endOfMessagesRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const _userIcon = localStorage.getItem('userIcon') || '';
    setUserIcon(_userIcon);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((_) => [
        {
          id: 1,
          text: "initial message",
          sender: 'bot'
        },
      ]);
    }, 1000);
    return () => clearTimeout(timer);
  }, [])

  // const request: TChat = {
  //   counselingApproach: userType as string,
  //   clientInput: inputText,
  //   counselingEndFlag: false,
  // };

  type TRequest = {
    messages: UMessage[];
  };

  const request: TRequest = {
    messages: [
      ...messages,
      {
        id: messages.length + 1,
        text: inputText,
        sender: 'user',
        counselingApproach: userType ?? '',
        counselingEndFlag:
          messages.filter((x) => {
            return x.sender === 'user';
          }).length >=
          max_chat_length - 1,
      },
    ],
  };

  const handleRequest = async () => {
    setMessages((pre) => [
      ...pre,
      {
        id: pre.length,
        text: inputText,
        sender: 'user',
        counselingApproach: userType ?? '',
        counselingEndFlag: false,
      },
    ]);
    await fetch('/api/openai/chat', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const perseRes = JSON.parse(data);
        setMessages((pre) => [
          ...pre,
          { id: pre.length, text: perseRes.answer, sender: 'bot' },
        ]);
      });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '' || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await handleRequest();
    } finally {
      setIsSubmitting(false);
    }

    if (
      messages.filter((x) => {
        return x.sender === 'user';
      }).length >= max_chat_length
    ) {
      setFinished(true);
    }

    setInputText('');
  };

  return (
    //
    <div className="flex justify-center h-full">
      <div className="flex flex-col h-screen w-[480px]">
        <div className="overflow-auto flex-1 chat-box">
          {messages?.map((msg) => {
            const position =
              msg.sender === 'bot' ? 'left' : 'right';
            const image_path = msg.sender === 'bot' ? botIcon : userIcon;
            return (
              <ChatBubble key={msg.id} message={msg.text} position={position} icon={image_path}/>
            );
          })}
          <div ref={endOfMessagesRef} />
        </div>
        {finished ? (
          <Button type="button" onClick={() => router.push('/')}>
            TOPに戻る
          </Button>
        ) : (
          <div className="input-box">
            <form className="flex w-full" onSubmit={handleSubmit}>
              <Input
                type="text"
                className=""
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="メッセージを入力"
              />
              {isSubmitting ? <Spinner className='h-12'/> : <Button type="submit" variant='light'>送信</Button>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
