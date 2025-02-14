# react-output-test-v2

React アウトプットサンプル

useState, Props のみの状態管理で作成した Todo リストに対し、コンポーネントに定義した状態とロジックをカスタムフックに以降したアプリケーション

上記の構成に対しテストを構築

url はこちら
https://yukionishi1129.github.io/react-output-test-v2

## 目次

1. 環境構築
2. アプリケーションの仕様

## 1. 環境構築

### 1-1. ライブラリ インストール

```
npm install

または

yarn
```

### 1-2. アプリケーション実行

```
npm run dev

または

yarn dev
```

## 2. アプリケーションの仕様

### 2-1. 仕様

- Todo リスト
  - Todo 一覧表示
  - Todo 検索処理
  - Todo 新規登録処理
  - Todo 削除処理

### 2-2. 構成技術

- react: 19.0.0
- react-dom: 19.0.0
- vite: 6.1.0
- @fortawesome/react-fontawesom: 0.2.2
- @fortawesome/free-solid-svg-icons: 6.7.2
- @testing-library/react: 16.2.0
- vitest: 3.0.5
