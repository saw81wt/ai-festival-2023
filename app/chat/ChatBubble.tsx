import { Avatar } from "@nextui-org/react"

export const Position = {
  left: 'left',
  right: 'right',
} as const
export type Position = (typeof Position)[keyof typeof Position]

type Props = {
  message: string
  position: Position
  icon: string
}

export default function ChatBubble({ message, position, icon }: Props) {
  const tail = {
    [Position.right]: (
      <div className='absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-0.5 rotate-45 w-2 h-2 bg-white'></div>
    ),
    [Position.left]: (
      <div className='absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-0.5 rotate-45 w-2 h-2 bg-white'></div>
    ),
  }[position]

  const positionClass = {
    [Position.right]: 'flex flex-row-reverse items-center',
    [Position.left]: 'flex justify-start items-center',
  }[position]

  return (
    <div className={positionClass}>
      <Avatar src={icon} />
      <div className='break-words relative m-2 py-2 px-4 bg-white w-2/5 rounded-2xl'>
        {message}
        {tail}
      </div>
    </div>
  )
}
