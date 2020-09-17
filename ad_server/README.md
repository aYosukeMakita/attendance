# snowy

ユーザー情報管理

ユーザーの登録はログインに成功した時点で自動的に行われる。

## ユーザー登録

### Request

新規ユーザーの場合

    POST /api/users

Body

    {
      "timestamp": "2020-05-12T09:12:38+09:00",
      "temperature: 36.3,
      "condition": "良い",
      "symptoms": "なし",
      "description": ""
    }

### Response

    {
      "userId": "kfd9WltSB64eVXAylCiS7cN14tovTVc-AA1Y8I-14CI",
      "dataId": 3,
      "timestamp": "2020-05-12T00:12:38Z",
      "temperature: 36.3,
      "condition": "良い",
      "symptoms": "なし",
      "description": ""
    }

## データ取得(リスト)

直近のデータをまとめて返す

### Request

    GET /api/users/{userId}/health_data?offset=20&limit=10

Parameters

| パラメーター | 説明                         | デフォルト値 |
| ------------ | ---------------------------- | ------------ |
| offset       | 先頭からのオフセット         | 0            |
| limit        | レスポンスに含まれる最大件数 | 10           |

### Response

    {
      "userId": 2,
      "data": [
        {
          "dataId": 3,
          "timestamp": "2020-05-12T00:12:38Z",
          "temperature: 36.3,
          "condition": "良い",
          "symptoms": "なし",
          "description": ""
        },
        {
          "dataId": 4,
          "timestamp": "2020-05-12T01:31:55Z",
          "temperature: 38.2,
          "condition": "悪い",
          "symptoms": "あり",
          "description": "発熱\n咳\n倦怠感\n味がしない"
        }
      ],
      "offset": 20,
      "limit": 10,
      "total": 120
    }

## データ取得

指定されたデータを返す

### Request

    GET /api/users/{userId}/health_data/{dataId}

### Response

    {
      "userId": 2,
      "dataId": 3,
      "timestamp": "2020-05-12T00:12:38Z",
      "temperature: 36.3,
      "condition": "良い",
      "symptoms": "なし",
      "description": ""
    }

## データ変更

指定されたデータを変更する。
Body に存在するパラメーターのみ更新するので、更新が不要なパラメーターは BODY 含めなくても良い。

### Request

    PUT /api/users/{userId}/health_data/{dataId}

Body

    {
      "timestamp": "2020-05-12T09:12:38+09:00",
      "temperature: 36.3,
      "condition": "良い",
      "symptoms": "なし",
      "description": ""
    }

### Response

    {
      "userId": 2,
      "dataId": 3,
      "timestamp": "2020-05-12T00:12:38Z",
      "temperature: 36.3,
      "condition": "良い",
      "symptoms": "なし",
      "description": ""
    }

## 全ユーザーの最新情報取得

全ユーザーの最新情報を取得する。管理者用 API。

### Request

    GET /admin/latest_health_data

### Response

    [
      {
        "userId": 2,
        "dataId": 3,
        "timestamp": "2020-05-12T00:12:38Z",
        "temperature: 36.3,
        "condition": "良い",
        "symptoms": "なし",
        "description": ""
      },
      {
        "userId": 3,
        "dataId": 8,
        "timestamp": "2020-05-11T23:58:20Z",
        "temperature: 37.9,
        "condition": "悪い",
        "symptoms": "あり",
        "description": "熱"
      }
    ]

## 全健康データ情報取得

全健康データを取得する。管理者用 API。

### Request

    GET /admin/health_data

Parameters

| パラメーター   | 説明                                                                    | 例                   |
| -------------- | ----------------------------------------------------------------------- | -------------------- |
| userId         | フィルター。ユーザー ID                                                 | abcd                 |
| timestamp_from | フィルター。日時の開始時刻                                              | 2020-05-18T08:10:06Z |
| timestamp_to   | フィルター。日時の終了時刻                                              | 2020-05-18T10:10:06Z |
| temperature_ge | フィルター。体温の下限                                                  | 36.5                 |
| temperature_le | フィルター。体温の上限                                                  | 38.5                 |
| condition      | フィルター。体調                                                        | 良い                 |
| symptoms       | フィルター。自覚症状                                                    | あり                 |
| description    | フィルター。自覚症状詳細。部分一致                                      | 熱                   |
| sort_by        | ソート。["userId", "timestamp", "temperature", "condition", "symptoms"] |
| order          | ソート。["acs", "desc"]。デフォルトは asc。                             |
| offset         | 先頭からのオフセット                                                    | 0                    |
| limit          | レスポンスに含まれる最大件数                                            | 10                   |

### Response

    [
      {
        "userId": 2,
        "dataId": 3,
        "timestamp": "2020-05-12T00:12:38Z",
        "temperature: 36.3,
        "condition": "良い",
        "symptoms": "なし",
        "description": ""
      },
      {
        "userId": 3,
        "dataId": 8,
        "timestamp": "2020-05-11T23:58:20Z",
        "temperature: 37.9,
        "condition": "悪い",
        "symptoms": "あり",
        "description": "熱"
      }
    ]
