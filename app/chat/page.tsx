"use client"

import { useState } from "react"
import { Avatar } from "@nextui-org/react"
import { Button } from "@nextui-org/react"
import {Input} from "@nextui-org/react";

import { myAction } from "./actions";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatClientComponent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const image_path = "/cool-man.png"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim() === "") return

    if (messages.length > 0) {
      setMessages((pre) => [
        ...pre,
        { id: pre.length, text: inputText, sender: "user" },
      ])
      const botMessage = await myAction()
      setMessages((pre) => [
        ...pre,
        { id: pre.length, text: botMessage, sender: "bot" },
      ])
    } else {
      setMessages((pre) => [{ id: 1, text: inputText, sender: "user" }])
      const botMessage = await myAction()
      setMessages((pre) => [{ id: 1, text: botMessage, sender: "bot" }])
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
            return (
              <div className={`flex items-center mb-2 ${order}`}>
                <Avatar src={image_path} className="m-2" />
                <div key={msg.id} className={`message ${msg.sender} max-w-[320px]`}>
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
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
      </div>
    </div>
  );
}
