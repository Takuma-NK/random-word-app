# API仕様

## POST /api/generate

説明：
アイデア生成に使用するテーマと生成数を受け取る。

リクエスト：

```json
{
  "theme": "未来",
  "count": 5
}
```

レスポンス：

```json
{
  "theme": "未来",
  "count": 5
}
```

---

## GET /api/themes

説明：
利用可能なテーマ一覧を取得する。

レスポンス：

```json
[
  {
    "id": 1,
    "name": "未来",
    "description": "SFや近未来に関するテーマ"
  },
  {
    "id": 2,
    "name": "自然",
    "description": "自然や環境に関するテーマ"
  }
]
```