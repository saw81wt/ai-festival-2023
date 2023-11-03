"use client";

import React from "react";
import { Card, CardHeader, CardBody, Divider, Spacer } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";

export default function Index() {
  return (
    <>
      <form>
        <div className="flex justify-center">
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              Q1：最近感じる心理的な不調（複数選択可）
            </CardHeader>
            <Divider />
            <CardBody>
              <RadioGroup>
                <Radio value="Anxiety">不安</Radio>
                <Radio value="Depression">落ち込み</Radio>
                <Radio value="Irritability">イライラ</Radio>
                <Radio value="Fatigue">疲労感</Radio>
                <Radio value="Lack of motivation">無気力</Radio>
                <Radio value="Insomnia">寝つきが悪い</Radio>
                <Radio value="Difficulty concentrating">集中困難</Radio>
                <Radio value="Other">その他</Radio>
              </RadioGroup>
            </CardBody>
            <Divider />
          </Card>
        </div>
        <Spacer y={2} />

        <div className="flex justify-center">
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              Q2：現在のストレスレベル
            </CardHeader>
            <Divider />
            <CardBody>
              <RadioGroup>
                <Radio value="Low">低い</Radio>
                <Radio value="Slightly Low">やや低い</Radio>
                <Radio value="Moderate">中程度</Radio>
                <Radio value="Slightly High">やや高い</Radio>
                <Radio value="High">高い</Radio>
              </RadioGroup>
            </CardBody>
            <Divider />
          </Card>
        </div>

        <Spacer y={2} />

        <div className="flex justify-center">
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              Q3：最後に友人と楽しいと感じた体験は何でしたか？
            </CardHeader>
            <Divider />
            <CardBody>
              <RadioGroup>
                <Radio value="Social Gathering">
                  大勢でワイワイとパーティーをした
                </Radio>
                <Radio value="Deep Conversation">一対一で深い話をした</Radio>
                <Radio value="Balancing Alone Time and Socializing">
                  自分の時間を大切にしながら、たまに友達と遊んだ
                </Radio>
                <Radio value="Engaging in Hobbies with Friends">
                  友人と趣味の活動を共にした
                </Radio>
              </RadioGroup>
            </CardBody>
            <Divider />
          </Card>
        </div>
        <Spacer y={2} />

        <div className="flex justify-center">
          <Spacer y={2} />
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              Q4：悩みやストレスがある時にどのような活動に励みますか？
            </CardHeader>
            <Divider />
            <CardBody>
              <RadioGroup>
                <Radio value="Exercise">スポーツや運動をする</Radio>
                <Radio value="Music Listening or Playing">
                  音楽を聴く、または演奏する
                </Radio>
                <Radio value="Reading or Meditation">読書や瞑想</Radio>
                <Radio value="Socializing with Friends">
                  友達と話して気晴らしする
                </Radio>
              </RadioGroup>
            </CardBody>
            <Divider />
          </Card>
        </div>

        <Spacer y={2} />

        <div className="flex justify-center">
          <Spacer y={2} />
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              Q5：新しい状況に対しては、どう対応することが多いですか？
            </CardHeader>
            <Divider />
            <CardBody>
              <RadioGroup>
                <Radio value="Gather All Information Before Taking Action">
                  必要な情報をすべて集めてから対処する
                </Radio>
                <Radio value="Act Based on Intuition and Experience">
                  直感と経験に基づいて即座に行動する
                </Radio>
                <Radio value="Seek Advice from Others">
                  誰かにアドバイスを求める
                </Radio>
                <Radio value="Observe the Situation and Wait for a While">
                  状況を観察し、しばらく様子を見る
                </Radio>
              </RadioGroup>
            </CardBody>
            <Divider />
          </Card>
        </div>

        <Spacer y={2} />

        <div className="flex justify-center">
          <Spacer y={2} />
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              Q6：休日をどのように過ごすのが理想的ですか？
            </CardHeader>
            <Divider />
            <CardBody>
              <RadioGroup>
                <Radio value="Adventure and Exploration">
                  アドベンチャーと探索：新しい場所への旅行やアクティビティ
                </Radio>
                <Radio value="Relaxation">
                  リラクゼーション：家でゆっくりと過ごす
                </Radio>
                <Radio value="Creativity">
                  創造性：アート作品を作る、書くなど
                </Radio>
                <Radio value="Socializing">社交：友人や家族と集まる</Radio>
              </RadioGroup>
            </CardBody>
            <Divider />
          </Card>
        </div>
      </form>
    </>
  );
}
