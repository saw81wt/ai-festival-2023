import { useState } from "react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim() === "") return

    setMessages([
      ...messages,
      { id: messages.length, text: inputText, sender: "user" },
    ])
    setInputText("")
  }

  return (
    <div>
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
    </div>
  )
}
