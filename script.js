// script.js
document.addEventListener('DOMContentLoaded', () => {
    // ----- ここから編集してください -----
    // 各アプリの情報を記述します。
    // id: HTML要素のID接頭辞として使用 (ユニークな文字列にしてください)
    // name: アプリの正式名称
    // description: アプリの簡単な紹介文
    // images: 表示する画像の配列。各画像は { src: "画像のパス", caption: "画像の説明文" } の形式です。
    //         画像パスは "images/ファイル名.png" のように指定します。
    // appUrl: アプリへジャンプするためのURL
    const appsData = [
        {
            id: "chinese-vocabulary-master", // 例: アプリ1のID
            name: "App①本文・文法",
            description: "各課の本文、文法説明が各ページに掲載されており、それぞれ音声の確認ができます。読み上げるスピードは調整可能です。",
            images: [
                // { src: "images/honbunIni.jpg", caption: "初期表示画面：最初の学習内容が表示されます。" },
                { src: "images/honbunSelect.jpg", caption: "選択画面：学びたいページを選択します。" },
                { src: "images/honbunDai1ka.jpg", caption: "学習内容が表示されます。簡体字をタップすると音声が流れます。" },
                // { src: "images/app1_screen3.png", caption: "テスト結果：間違えた単語を復習できます。" }
            ],
            appUrl: "https://script.google.com/macros/s/AKfycbz1y6it246m2yJ6t4ygoKseK9-VFdsdzcfvrh8EYI_PyM9P1sDRBeBPxH6SkHXGUxT2/exec" // あなたのアプリ1への実際のURLに置き換えてください
        },
        {
            id: "pinyin-trainer", // 例: アプリ2のID
            name: "App②単語カード",
            
            description: "「日本語」ー＞「中国語・ピンイン」の順に、単語カード形式で新出語句が次々と表示され、同時に音声の確認ができます。検索欄で単語を検索することも可能です(電子辞書機能)。「ピンイン入力」にチェックを入れると、ピンインで中国語を入力する問題形式になります。",
            images: [
                { src: "images/tangoSyoki.jpg", caption: "初期画面　下一个をクリックすれば問題が表示されます。" },
                { src: "images/tangoJpHyouji.jpg", caption: "日本語が表示されます。　下一个をクリックすれば日本語に対応する中国語が表示されます。" },
                { src: "images/tangoChina.jpg", caption: "中国語が表示されると同時に中国語の音声が流れます。" },
                { src: "images/tangoKensaku1.jpg", caption: "検索欄に検索文字を入力すると検索文字を含む単語が一覧表示されます。" },
                { src: "images/tangoKensaku2.jpg", caption: "検索欄にallと入力することで、全件表示します。中国語欄をクリックすると中国語音声が流れます。" },
                { src: "images/tangoPinyin1.jpg", caption: "ピンイン入力にチェックを入れるとピンイン入力モードになります。ピンイン入力欄が現れます。" },
                { src: "images/tangoPinyin2.jpg", caption: "ピンイン入力されたものが正しいかチェックします。" },
            ],
            appUrl: " https://tamagenai.github.io/BANBANtango/" // あなたのアプリ2への実際のURLに置き換えてください
        },
        {
            id: "sentence-builder", // 例: アプリ3のID
            name: "App③練習問題（クイズ形式）",
            description: "教科書の練習問題に、ゲーム感覚で手軽に挑戦することができます。教科書に解答を書き込んだ後も復習が可能で、問題を解きながら楽しく語彙や文法を習得できます。",
            images: [
                { src: "images/rensyuSyoki.jpg", caption: "初期画面 最初の問題が表示されています。" },
                { src: "images/rensyuKaitou1.jpg", caption: "例えば'妈'を第一声だと選択すると..." },
                { src: "images/rensyuCheck1.jpg", caption: "解答が正しい場合は、「いいね！」というコメント付きで褒められます。" },
                { src: "images/rensyuKaitou2.jpg", caption: "例えば'妈'を第二声だと選択すると..." },
                { src: "images/rensyuCheck2.jpg", caption: "解答が正しくない場合は、「もっと頑張りましょう！！」と表示されます。" },
            ],
            appUrl: "https://script.google.com/macros/s/AKfycbybGZTMsOo7WRzPv1jr5rqUW-LE3InTBG1-4Wdne0KdP32a4DrFBwXxbsiqIc8EZbM/exec" // あなたのアプリ3への実際のURLに置き換えてください
        },
        // {
        //     id: "conversation-practice", // 例: アプリ4のID
        //     name: "日常会話プラクティス",
        //     description: "様々なシチュエーションでの中国語会話をロールプレイ形式で練習できます。実践的なコミュニケーション能力を向上させます。",
        //     images: [
        //         { src: "images/app4_screen1.png", caption: "シーン選択：空港、レストラン、買い物など。" },
        //         { src: "images/app4_screen2.png", caption: "会話練習画面：自分のパートを録音・再生可能。" }
        //     ],
        //     appUrl: "https://example.com/your-app4-url" // あなたのアプリ4への実際のURLに置き換えてください
        // }
    ];
    // ----- ここまで編集してください -----


    const appListContainer = document.getElementById('app-list-container');
    if (!appListContainer) {
        console.error('Error: App list container (id="app-list-container") not found in HTML.');
        return;
    }

    appsData.forEach(appData => {
        const showcaseItem = createAppShowcaseElement(appData);
        appListContainer.appendChild(showcaseItem);
    });

    function createAppShowcaseElement(appData) {
        const item = document.createElement('div');
        item.className = 'app-showcase-item';
        item.id = `${appData.id}-showcase`;

        const nameElement = document.createElement('h2');
        nameElement.className = 'app-name';
        nameElement.textContent = appData.name;
        item.appendChild(nameElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'app-description';
        descriptionElement.textContent = appData.description;
        item.appendChild(descriptionElement);

        const sliderElement = document.createElement('div');
        sliderElement.className = 'image-slider';
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        const imageElement = document.createElement('img');
        imageElement.className = 'slider-image';
        imageElement.alt = `${appData.name} screenshot`; // 初期alt
        imageContainer.appendChild(imageElement);
        sliderElement.appendChild(imageContainer);

        const captionElement = document.createElement('p');
        captionElement.className = 'image-caption';
        sliderElement.appendChild(captionElement);

        const controlsElement = document.createElement('div');
        controlsElement.className = 'slider-controls';
        const prevButton = document.createElement('button');
        prevButton.className = 'prev-btn';
        prevButton.textContent = '◀ Back';
        const nextButton = document.createElement('button');
        nextButton.className = 'next-btn';
        nextButton.textContent = 'Next ▶';
        controlsElement.appendChild(prevButton);
        controlsElement.appendChild(nextButton);
        sliderElement.appendChild(controlsElement);
        
        item.appendChild(sliderElement);

        const linkElement = document.createElement('a');
        linkElement.className = 'app-link';
        // linkElement.href = appData.appUrl;
        linkElement.textContent = `「${appData.name}」へ`;
        // linkElement.target = '_blank'; // 新しいタブで開く
        // linkElement.rel = 'noopener noreferrer'; // セキュリティ対策
        // iPhoneでの動作を考慮し、クリックイベントで window.open を使用
        linkElement.addEventListener('click', (event) => {
            event.preventDefault(); // aタグのデフォルトの遷移を防ぎます

            // window.open() を使用して新しいタブで開く
            // 'noopener,noreferrer' はセキュリティ上の推奨事項です
            const newWindow = window.open(appData.appUrl, '_blank', 'noopener,noreferrer');

            // ポップアップがブロックされた場合のフォールバック（任意）
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                // ユーザーに通知するか、同じウィンドウで開くなどの代替手段を検討
                // alert('新しいタブを開けませんでした。ポップアップブロックの設定を確認してください。\nまたは、以下のURLを直接ブラウザで開いてください：\n' + appData.appUrl);
                // もしポップアップブロックで開けない場合、同じタブで開くことを試みる
                // window.location.href = appData.appUrl;
            }
        });
        item.appendChild(linkElement);

        // スライダーの状態とロジック
        let currentImageIndex = 0;

        function updateSliderDisplay() {
            if (!appData.images || appData.images.length === 0) {
                imageContainer.innerHTML = '<p style="padding: 20px; color: #777;">このアプリの画像はまだありません。</p>';
                captionElement.textContent = '';
                prevButton.style.display = 'none'; // 画像がない場合はボタンも非表示
                nextButton.style.display = 'none';
                return;
            }
            
            imageElement.style.display = 'block'; // 画像がある場合は表示
            prevButton.style.display = 'inline-block';
            nextButton.style.display = 'inline-block';

            const currentImage = appData.images[currentImageIndex];
            imageElement.src = currentImage.src;
            imageElement.alt = currentImage.caption || `${appData.name} screen ${currentImageIndex + 1}`;
            captionElement.textContent = currentImage.caption || '';

            prevButton.disabled = currentImageIndex === 0;
            nextButton.disabled = currentImageIndex === appData.images.length - 1;
        }

        prevButton.addEventListener('click', () => {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateSliderDisplay();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentImageIndex < appData.images.length - 1) {
                currentImageIndex++;
                updateSliderDisplay();
            }
        });

        // スワイプ機能
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50; // スワイプと判定する最小距離 (px)

        imageContainer.addEventListener('touchstart', (e) => {
            if (!appData.images || appData.images.length <= 1) return;
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        imageContainer.addEventListener('touchend', (e) => {
            if (!appData.images || appData.images.length <= 1) return;
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            if (Math.abs(swipeDistance) >= swipeThreshold) {
                if (swipeDistance < 0) { // 左スワイプ (Next)
                    if (currentImageIndex < appData.images.length - 1) {
                        currentImageIndex++;
                    }
                } else { // 右スワイプ (Back)
                    if (currentImageIndex > 0) {
                        currentImageIndex--;
                    }
                }
                updateSliderDisplay();
            }
        }
        
        updateSliderDisplay(); // 初期表示
        return item;
    }
});