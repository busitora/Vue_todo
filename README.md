## 使用バージョン

- Ruby 2.6.5
- Rails 6.0.2.1
- Vue.js 2.6.11
- Node.js v12.13.0 以降
- Yarn 1.19.2 以降

## プロジェクトのセットアップ手順

ターミナルでgit cloneして作成されたフォルダに移動して、下記のコマンドを実行してください

- このプロジェクトで使用するライブラリをインストール
```bash
$ bundle install --path vendor/bundle
$ yarn install
```

- データベースの設定を雛形のdefaultファイルをコピーして作成

```bash
$ cp config/database.yml.default config/database.yml
```

- データベースおよびテーブルの作成

```bash
$ bundle exec rails db:setup
```

- バックエンド側サーバーの起動

```bash
$ bundle exec rails server
```

- フロントエンド側サーバーの起動
```bash
$ bin/webpack-dev-server
```

- 以上のコマンドが正しく実行できた場合、ブラウザで`localhost:3000`にアクセスしましょう。

また、`foreman`でもサーバーを起動できるようにしています。
 
```bash
$ bundle exec foreman start
```
