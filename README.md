## 環境構築

### DBについて

1. ルート直下にてDBコンテナを立てる

```bash
docker compose up
```

2. .envにDBへの接続情報を設定する

```
DATABASE_URL="postgresql://root:root@localhost:5432/sns?schema=public"
```

3. migrationの実行

- 基本的に環境構築の初回実行時のみ(テーブルが増えたりとかしたらその限りではない)

  ```bash
  # ルート直下にて実行
  yarn migrate
  ```

- sqlファイルがない場合や新しいモデルを追加した際には、下記コマンドを実行してください。

  ```bash
  npx prisma generate
  ```

4. お好きなDBのGUIツールでデータを確認できます。DBコンテナに入るのもありです。

### アプリケーションについて

1. ルート直下に下記コマンドを実行してください。

```bash
yarn dev
```
