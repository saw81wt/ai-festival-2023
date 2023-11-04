'use client';

import { Avatar, Button } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Image } from '@nextui-org/react';

export default function Home() {
  const [userIcon, setUserIcon] = useState('');
  const imagePaths = [
    '/icons/avatar1.png',
    '/icons/avatar2.png',
    '/icons/avatar3.png',
    '/icons/avatar4.png',
    '/icons/avatar5.png',
    '/icons/avatar6.png',
    '/icons/avatar7.png',
    '/icons/avatar8.png',
    '/icons/avatar9.png',
    '/icons/avatar10.png',
  ];

  const onClickNext = () => {
    localStorage.setItem('userIcon', userIcon);
  };

  // const topUserIcons = userIcons.slice(0, 15);

  const onClickIcon = (iconPath: string) => {
    setUserIcon(iconPath);
  };

  useEffect(() => {
    const _userIcon = localStorage.getItem('userIcon') || '';
    setUserIcon(_userIcon);
  }, []);

  return (
    <main className="h-screen w-[390px] mx-auto px-xs py-sm flex space-y-6 flex-col items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <Image alt="logo" width={128} src="logo.png" />
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        「kiraku」は、「気楽に気分を楽にする」をコンセプトに、日常生活におけるストレスや精神的な負担を軽減し、誰もがいつでもどこでも気楽にアクセスできるパーソナルヘルスケアAIを提供します。
        心理的負担を和らげることに特化したユーザーフレンドリーなデザインと機能を備えたアプリケーションです。
        「気楽・気持ちが楽になる・喜怒哀楽」を意味する「kiraku」は、これらをもじった造語です。
      </p>
      <div className="w-full">
        <div className="w-fit mr-auto mt-8 font-bold text-lg">
          アイコンを選択
        </div>
        <div className="grid grid-cols-5 gap-4 place-items-center mt-2">
          {imagePaths.map((icon) => (
            <Avatar
              key={icon}
              isBordered={icon == userIcon}
              onClick={() => {
                onClickIcon(icon);
              }}
              src={icon}
              color="primary"
              className="m-2 "
            />
          ))}
        </div>
      </div>
      <div className="w-full mt-md text-center">
        <Link href="/question">
          <Button
            className="h-12 text-center text-gray-700 text-md shadow-base disabled:opacity-50 disabled:cursor-not-allowed"
            variant="light"
            radius="md"
            onClick={onClickNext}
            disabled={!userIcon}
          >
            カウンセリングをはじめる
          </Button>
        </Link>
      </div>
    </main>
  );
}
