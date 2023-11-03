"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Avatar } from "@nextui-org/react"
import { Button } from "@nextui-org/react"
import { Input } from "@nextui-org/react";
import { sendChat } from "./actions";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatClientComponent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [finished, setFinished] = useState(false);
  const [userIcon, setUserIcon] = useState("");

  const router = useRouter()
  const params = useSearchParams()
  const userType = params.get('user_type')

  // UserTypeによってアイコンを変える
  const coolBotIcons = ["/cool-man.png", "/cool-woman.png"]
  const tenderBotIcons = ["/tender-man.png", "/tender-woman.png"]

  const botIcon = useMemo(() => {
    const random = Math.floor(Math.random() * 2)
    return userType == "発散系" ? tenderBotIcons[random] : coolBotIcons[random]
  }, [userType])
  const max_chat_length = 2

  useEffect(() => {
    endOfMessagesRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const _userIcon = localStorage.getItem("userIcon") || "";
    setUserIcon(_userIcon);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim() === "") return

    if (messages.length > 0) {
      setMessages((pre) => [
        ...pre,
        { id: pre.length, text: inputText, sender: "user" },
      ])
      const { answer } = await sendChat()
      setMessages((pre) => [
        ...pre,
        { id: pre.length, text: answer, sender: "bot" },
      ])
    } else {
      setMessages((pre) => [{ id: 1, text: inputText, sender: "user" }])
      const { answer } = await sendChat()
      setMessages((pre) => [
        ...pre,
        { id: pre.length, text: answer, sender: "bot" },
      ])
    }
    if (messages.length >= max_chat_length) {
      setFinished(true)
    }

    setInputText('');
  };

  return (
    //
    <div className="flex justify-center h-full">
      <div className="flex flex-col h-screen w-[480px]">
        <div className="overflow-auto flex-1 chat-box">
          {messages?.map((msg) => {
            const order =  msg.sender === "bot" ? "flex-row" : "flex-row-reverse"
            const image_path = msg.sender === "bot" ? botIcon : userIcon
            return (
              <div key={msg.id} className={`flex items-center mb-2 ${order}`}>
                <Avatar src={image_path} className="m-2" />
                <div key={msg.id} className={`message ${msg.sender} max-w-[320px]`}>
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={endOfMessagesRef} />
        </div>
        { finished ?
          <Button type="button" onClick={() => router.push('/')}>TOPに戻る</Button> :
          <div className="input-box">
            <form className="flex w-full" onSubmit={handleSubmit}>
              <Input
                type="text"
                className=""
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="メッセージを入力"
              />
              <Button type="submit">送信</Button>
            </form>
          </div>
        }
      </div>
    </div>
  );
}
