# 開発者向けドキュメント

## コードアーキテクチャ

詳しくは[ARCHITECTURE.md](./ARCHITECTURE.md)を参照。

レイヤードアーキテクチャを採用。循環参照を避け依存方向を制御するため。

## 修正方法

ブランチで作業し、プルリクエストで反映する。

コミットメッセージは基本的に以下の形式で記述する。

```
<type>!(<scope>): <subject>

BREAKING CHANGE: <body>

<footer>

# types
# build: ビルドシステムまたは外部の依存関係に影響する変更（スコープの例：gulp、broccoli、npm）
# ci: CI構成ファイルとスクリプトへの変更（スコープの例：Circle、BrowserStack、SauceLabs）
# docs: ドキュメントのみの変更
# feat: 新機能追加
# prune: 機能を削除した / 不要な物を削除した
# fix: バグ修正
# perf: パフォーマンスを向上させるコード変更
# refactor: バグ修正でも新機能追加でもないコード変更
# style: コードの意味に影響しない変更（空白、書式設定、セミコロンの欠落など）
# test: 足りないテストを追加した / 既存のテストを修正した
```

参考: [angularが実践しているもの](https://github.com/angular/angular/blob/main/CONTRIBUTING.md)
