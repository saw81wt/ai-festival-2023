"use client"
import { useState } from "react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

export default function ChatClientComponent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim() === "") return

    if (messages.length > 0) {
      setMessages((pre) => [
        ...pre,
        { id: pre.length, text: inputText, sender: "user" },
      ])
    } else {
      setMessages((pre) => [{ id: 1, text: inputText, sender: "user" }])
    }

    setInputText("")
  }

  return (
    <div>
      <div className="chat-box">
        {messages?.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="メッセージを入力"
          />
          <button type="submit">送信</button>
        </form>
      </div>
    </div>
  )
}
