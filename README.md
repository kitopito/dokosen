# どこ先（どこいる先生）
先生の在室状況をブラウザで確認するアプリです。  
https://dokosen.pages.dev/

## 使用技術
|  種類 |  名前  | 備考 |
| ---- | ---- | ---- |
| 言語 | TypeScript | JavaScript被害者の会 |
| UI | React |  |
| ビルドツール | Vite |  |
| コンポーネントライブラリ | Chakra UI |  |
| ルーティング | React Router (v6) | バージョンによって動作が大きく変わるので注意 |
| 状態管理 | Zustand | 軽量なのがいいと思った |
| データベース | Firebase |  |
| ホスティング | Cloudflare | 無料のやつで一番いいと思った |
<!-- 追加用
|  |  |  |
-->

## メモ
以下の設定をtrueにするとCloudflareの自動ビルドでエラーがでます。  
    "noUnusedLocals": false,  
    "noUnusedParameters": false,