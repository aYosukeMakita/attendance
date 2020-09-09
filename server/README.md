# README

## インストール

### npm インストール

```
npm i
```

### コンテナ作成

```
docker-compose build
```

インストール直後は sequelize がコマンドラインから呼び出せないので、再度ターミナルを開きなおす

### DB 作成

```
docker-compose run --rm web npx sequelize db:create
```

### DB マイグレーション

```
docker-compose run --rm web npx sequelize db:create
```
