// キャッシュするファイルの名前とバージョンを定義
const CACHE_NAME = 'chinese-app-showcase-v15';
// キャッシュするファイルのリスト
const urlsToCache = [
  './', // index.html を示す
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
  // 注意: 紹介しているアプリの画像 (images/ フォルダ内の画像) は、数が多いとキャッシュサイズが
  // 大きくなるため、ここではキャッシュ対象に含めていません。
  // 含めたい場合は、'./images/app1_screen1.png', のようにリストに追加します。
];

// 1. インストール処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // ★追加: 新しいサービスワーカーが待機状態に入ったらすぐに有効化を試みる
  // self.skipWaiting(); 
});
// ★★★ 追加: メッセージを受け取ったら skipWaiting を実行するリスナー ★★★
// messageイベントリスナーを拡張
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// 2. フェッチイベント（リクエストがあった場合）の処理
self.addEventListener('fetch', (event) => {
  // ★★★ 追加: http/https プロトコル以外（chrome-extension:// など）のリクエストは無視する ★★★
  if (!event.request.url.startsWith('http')) {
    return; // 何もせず、通常のネットワークリクエストとして処理させる
  }

  // ★★★ 修正: 以前のコードを以下に置き換える ★★★
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        // キャッシュにヒットした場合、キャッシュから返す
        if (response) {
          return response;
        }

        // キャッシュにない場合、ネットワークにリクエストしにいく
        return fetch(event.request).then((networkResponse) => {
          // 正常に取得できた場合、レスポンスをキャッシュに追加してから返す
          // 'basic' タイプのレスポンス（同一オリジンからのリクエスト）のみキャッシュする
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      });
    })
  );
});

// 3. 古いキャッシュの削除とクライアントの制御
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // ホワイトリストに含まれない古いキャッシュを削除
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // ★★★ 追加: すべてのクライアント（タブやPWAウィンドウ）のコントロールを即座に要求する ★★★
      console.log('Service Worker activating and claiming clients.');
      return self.clients.claim(); 
    })
  );
});