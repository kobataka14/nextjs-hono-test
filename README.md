## ローカルDB

```
// 起動
docker compose up -d
// 停止
docker compose stop
```

## 開発環境

```
npm install

npx prisma generate
npx prisma migrate dev

npm run dev
```

## フロント用型定義

```
// 型ファイルの出力
npx openapi-typescript http://localhost:3000/api/docs -o src/types/api.d.ts
```

・OpenAPI
http://localhost:3000/api/docs

・Swagger UI
http://localhost:3000/api/ui

・API Reference
http://localhost:3000/api/reference
