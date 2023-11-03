"use client";

import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {Image} from "@nextui-org/react";


export default function Home() {
  const [userIcon, setUserIcon] = useState("");
  const imagePaths = [
    "/avatar.png", "/avatar.png", "/avatar.png", "/avatar.png", "/avatar.png",
    "/cool-man.png", "/cool-man.png", "/cool-man.png", "/cool-man.png", "/cool-man.png"
  ]

  const onClickNext = () => {
    localStorage.setItem("userIcon", userIcon);
  };

  // const topUserIcons = userIcons.slice(0, 15);

  const onClickIcon = (iconPath: string) => {
    setUserIcon(iconPath);
  };

  useEffect(() => {
    const _userIcon = localStorage.getItem("userIcon") || "";
    setUserIcon(_userIcon);
  }, []);

  return (
    <main className="h-screen w-[390px] mx-auto px-xs py-sm flex space-y-8 flex-col items-center justify-center">
      <div className="flex w-full items-center">
        <Image width={56} src="logo.png"/>
        <p className="font-bold text-3xl ml-4">KIRAKU</p>
      </div>
      <div className="w-full">
        <div className="w-fit mr-auto mt-xl font-bold text-lg">
          アイコン選択
        </div>
        <div className="grid grid-cols-5 gap-4 place-items-center mt-sm">
          {imagePaths.map((icon, i) => (
            <Avatar
              isBordered={icon==userIcon}
              onClick={() => {onClickIcon(icon)}}
              src={icon}
              className="m-2" />
          ))}
        </div>
      </div>
      <div className="w-full mt-md text-center">
        <Link href="/chat">
          <button
            className="w-60 h-12 text-center text-white text-xl rounded-4xl shadow-base tracking-[1rem] indent-[1rem] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onClickNext}
            disabled={!userIcon}
          >
            決定
          </button>
        </Link>
      </div>
    </main>
  );
}
