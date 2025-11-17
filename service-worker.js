// キャッシュするファイルの名前とバージョンを定義
const CACHE_NAME = 'chinese-app-showcase-v6';
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
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// 2. フェッチイベント（リクエストがあった場合）の処理
// ネットワークからの取得を試み、失敗した場合にキャッシュから返す（ネットワークファースト）
// オフライン対応を優先する場合は、キャッシュファースト戦略もあります。
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにヒットした場合、キャッシュから返す
        if (response) {
          return response;
        }

        // キャッシュにない場合、ネットワークにリクエストしにいく
        return fetch(event.request).then(
          (networkResponse) => {
            // 正常に取得できた場合、レスポンスをキャッシュに追加してから返す
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // レスポンスをクローンして片方をキャッシュに、もう片方をブラウザに返す
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        );
      })
  );
});

// 3. 古いキャッシュの削除
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});