"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, Divider, Spacer } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { initRequestParams } from "@/constants/initRequestParams";
import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter()
  const [requestState, setRequestState] = useState(initRequestParams);
  const handleRequest = async() => {
    const res = await fetch('/api/openai', { method: "POST",body : JSON.stringify(requestState),  headers: {
      "Content-Type": "application/json",
    },
    }).then((response) => response.json()).then((data) => {
      const jsonRes = JSON.parse(data)
      router.push(`/chat?user_type=${jsonRes.counselling_type}`)
    })
  }
  return (
    <>
      <form action={async () => await handleRequest()}>
        <div className="flex justify-center">
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              Q1：最近感じる心理的な不調（複数選択可）
            </CardHeader>
            <Divider />
            <CardBody>
              <RadioGroup
                onValueChange={(value) =>
                  setRequestState((pre) => ({
                    ...pre,
                    ...{ question1: value },
                  }))
                }
              >
                <Radio value="不安">不安</Radio>
                <Radio value="落ち込み">落ち込み</Radio>
                <Radio value="イライラ">イライラ</Radio>
                <Radio value="疲労感">疲労感</Radio>
                <Radio value="無気力">無気力</Radio>
                <Radio value="寝つきが悪い">寝つきが悪い</Radio>
                <Radio value="集中困難">集中困難</Radio>
                <Radio value="その他">その他</Radio>
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
              <RadioGroup
                onValueChange={(value) =>
                  setRequestState((pre) => ({
                    ...pre,
                    ...{ question2: value },
                  }))
                }
              >
                <Radio value="低い">低い</Radio>
                <Radio value="やや低い">やや低い</Radio>
                <Radio value="中程度">中程度</Radio>
                <Radio value="やや高い">やや高い</Radio>
                <Radio value="高い">高い</Radio>
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
              <RadioGroup
                onValueChange={(value) =>
                  setRequestState((pre) => ({
                    ...pre,
                    ...{ question3: value },
                  }))
                }
              >
                <Radio value="大勢でワイワイとパーティーをした">
                  大勢でワイワイとパーティーをした
                </Radio>
                <Radio value="一対一で深い話をした">一対一で深い話をした</Radio>
                <Radio value="自分の時間を大切にしながら、たまに友達と遊んだ">
                  自分の時間を大切にしながら、たまに友達と遊んだ
                </Radio>
                <Radio value="友人と趣味の活動を共にした">
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
              <RadioGroup
                onValueChange={(value) =>
                  setRequestState((pre) => ({
                    ...pre,
                    ...{ question4: value },
                  }))
                }
              >
                <Radio value="スポーツや運動をする">スポーツや運動をする</Radio>
                <Radio value="音楽を聴く、または演奏する">
                  音楽を聴く、または演奏する
                </Radio>
                <Radio value="読書や瞑想">読書や瞑想</Radio>
                <Radio value="友達と話して気晴らしする">
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
              <RadioGroup
                onValueChange={(value) =>
                  setRequestState((pre) => ({
                    ...pre,
                    ...{ question5: value },
                  }))
                }
              >
                <Radio value="必要な情報をすべて集めてから対処する">
                  必要な情報をすべて集めてから対処する
                </Radio>
                <Radio value="直感と経験に基づいて即座に行動する">
                  直感と経験に基づいて即座に行動する
                </Radio>
                <Radio value="誰かにアドバイスを求める">
                  誰かにアドバイスを求める
                </Radio>
                <Radio value="状況を観察し、しばらく様子を見る">
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
              <RadioGroup
                onValueChange={(value) =>
                  setRequestState((pre) => ({
                    ...pre,
                    ...{ question6: value },
                  }))
                }
              >
                <Radio value="アドベンチャーと探索：新しい場所への旅行やアクティビティ">
                  アドベンチャーと探索：新しい場所への旅行やアクティビティ
                </Radio>
                <Radio value="リラクゼーション：家でゆっくりと過ごす">
                  リラクゼーション：家でゆっくりと過ごす
                </Radio>
                <Radio value="創造性：アート作品を作る、書くなど">
                  創造性：アート作品を作る、書くなど
                </Radio>
                <Radio value="社交：友人や家族と集まる">社交：友人や家族と集まる</Radio>
              </RadioGroup>
            </CardBody>
            <Divider />
          </Card>
        </div>

        <div className="flex justify-center">
          <input type="submit" />
        </div>
      </form>
    </>
  );
}
