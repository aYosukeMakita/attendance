# ユーザー管理 API

ユーザーの登録はログインに成功した時点で自動的に行われるため不要

## 一覧取得

ユーザーの状態をまとめて返す。
個別に返す API はないので特定のユーザーの情報が欲しい場合でも一覧を呼ぶ必要がある。

### Request

GET /api/users

### Response

    [
      {
        "userId": 5,
        "username": "taro.yamada",
        "nickname": "山田　太郎",
        "isAdmin": true,
        "presence: "working",
        "location": "office"
      }
    ]

## 変更

ユーザーの情報を変更する

### Request

PUT /api/users/{userId}

    {
      "nickname": "山田　太郎",
      "presence: "working",
      "location": "office"
    }

### Response

    {
      "userId": 5,
      "username": "taro.yamada",
      "nickname": "山田　太郎",
      "isAdmin": true,
      "presence: "working",
      "location": "office"
    }

## 履歴取得

指定されたユーザーの変更履歴を返す。
返すのは出勤と退勤の切り替わるタイミングの記録のみ。

### Request

GET /api/users/{userId}/histories

### Response

    {
      "userId": 2,
      "username": "taro.yamada",
      "nickname": "山田　太郎",
      "histories": [
        {
          "oldPresence: "working",
          "newPresence: "finished",
          "time": "2020-09-18T01:43:48.000Z"
        }
      ]
    }

## 集計履歴取得

指定されたユーザーの 1 か月分の履歴を返す

### Request

GET /api/users/{userId}/statistics

### Response

    [
      {
        "date": "2020-09-18",
        "start": "2020-09-18T09:02:23+09:00",
        "end": "2020-09-18T17:37:50+09:00","
      }
    ]
