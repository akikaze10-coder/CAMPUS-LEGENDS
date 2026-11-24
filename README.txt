CAMPUS LEGENDS v0.46.0 — GitHub Pages / PWA 公開用
1. ZIPを展開し、全ファイルを同一リポジトリのルートへアップロード（ZIP自体ではない）。
2. Settings > Pages > Deploy from a branch > main / (root) > Save。
3. 公開URLをiPhoneのSafariで開き、共有 > ホーム画面に追加。
4. 次回更新も同じリポジトリ・同じURLを維持すること。
ゲーム本体は v0.46 cinematic audio HTML。画像・効果音はHTMLに内蔵。
ゲームのセーブキーと既存の移行処理を維持。別URL・別ブラウザ・別ストレージへの初回移行は手動復元が必要な場合があります。
サービスワーカーは起動時にネットワーク優先で最新ページを取得し、キャッシュができた後はオフラインでも起動できる設計。プレイ中の強制再読み込みは行いません。
iPhone実機・GitHub本番での動作確認は未実施。
