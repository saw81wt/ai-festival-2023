import { TChat } from '@/types/TChat';

export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

export type TUserMessage = Message & Omit<TChat, 'clientInput'>;

export type TBotMessage = Message;

export type TMessage<T> = T extends { sender: 'user' }
  ? TUserMessage
  : TBotMessage;

export type UMessage = TUserMessage | TBotMessage;
