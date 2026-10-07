# 樂丘廚房 - 餐廳形象網站

> 這是一個展現了餐廳特有氛圍的形象網站。在這裡，你可以輕鬆瀏覽菜單、預約訂位，並探索我們的成長故事。讓樂丘官網成為你和親朋好友聚會的美好起點，開啟美好記憶的大門。

![](https://cutecat8110.github.io/leo-chiu/demo.png)


## 📋 專案概述

此專案旨在提升前端切版技術，採用純粹的 HTML、CSS 和 JavaScript 進行獨立開發，以保持前端結構的簡潔和高效。<br>專案注重用戶體驗，致力於設計直覺易用的操作界面，同時保持餐廳風格，為使用者提供良好的瀏覽和訂位體驗。

* [Demo](https://cutecat8110.github.io/leo-chiu/)

## 本機預覽與 QA

這是純靜態作品，預覽不需要安裝前端依賴或建立後端。在專案目錄執行：

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

瀏覽 `http://127.0.0.1:8765/`。請使用 HTTP 伺服器預覽，避免以 `file://` 開啟時 SVG 載入受到限制。

- QA 分支：`portfolio/qa`。原本的 GitHub Pages 網址仍對應原發布版本。
- [逐項修正、重現步驟、驗證結果與已知限制](QA_CHANGELOG.md)
- [測試結果資料](docs/qa/results.json)
- SEND、訂位、READ MORE、DETAIL 等原有展示元件未新增功能；此版本不會送出聯絡資料或建立訂位。

原本的主樣式保留。這次的樣式修正集中於 `scss/qa.scss`，瀏覽器載入其編譯產物 `css/qa.css`。修改該 SCSS 後，使用 Node.js/npm 編譯並一併提交兩個檔案：

```sh
npx --yes sass@1.93.2 --no-source-map scss/qa.scss css/qa.css
node --check js/index.js
git diff --check
```

Swiper 的 JavaScript 與 CSS 固定為 `14.3.0`；字型、圖示、jQuery 與 Swiper 仍由外部 CDN 提供，預覽需要網路連線。

## 🔨 核心技術

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://developer.mozilla.org/zh-TW/docs/Web/HTML" >
          HTML
        </a>
      </td>
      <td>超文本標記語言</td>
    </tr>
    <tr>
      <td>
        <a href="https://developer.mozilla.org/zh-TW/docs/Web/CSS" >
          CSS
        </a>
      </td>
      <td>風格頁面語言</td>
    </tr>
    <tr>
      <td>
        <a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript" >
          JavaScript
        </a>
      </td>
      <td>腳本語言</td>
    </tr>
  </tbody>
</table>


## 🛠️ 擴展套件

<table>
  <tbody>
  <tr>
      <td>
        <a href="https://jquery.com/">
          jQuery
        </a>
      </td>
      <td>快速、且精簡的 JavaScript 函式庫</td>
    </tr>
    <tr>
      <td>
        <a href="https://swiperjs.com/">
          Swiper
        </a>
      </td>
      <td>輪播/滑動組件</td>
    </tr>
  </tbody>
</table>

