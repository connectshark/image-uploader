# line-bot-upload-img

![cover](/readme/cover.png)

[![GitHub last commit](https://img.shields.io/github/last-commit/connectshark/line-bot-upload-img.svg?style=flat)](https://github.com/connectshark/line-bot-upload-img)
![GitHub stars](https://img.shields.io/github/stars/connectshark/line-bot-upload-img.svg?style=social&label=Stars&style=plastic)

line機器人上傳圖片至imgur雲端空間,回傳圖片url

機器人收到圖片後會收到訊息事件,其中訊息事件裡面不會包含圖檔而是會給圖片ID

## 閱讀前需具備知識

- Line機器人創建設置
- Nodejs與express基礎配置
- `@line/bot-sdk`SDK的基本認知

## 步驟說明

1. 收到line機器人訊息取得圖片訊息ID
1. 使用line API取得圖片訊息內容
1. 處理buffer資料
1. 使用imgur API上傳

## 步驟解說

### 收到line機器人訊息取得圖片訊息ID

每個使用者傳送圖片後
程式這裡會收到**訊息事件**
大概是長成這樣
```
{
  "destination": "xxxxxxxxxx",
  "events": [
    {
      "type": "message",
      "message": {
        "type": "image",
        "id": "354718705033693859",
        "contentProvider": {
          "type": "line"
        },
        "imageSet": {
          "id": "E005D41A7288F41B65593ED38FF6E9834B046AB36A37921A56BC236F13A91855",
          "index": 1,
          "total": 2
        }
      },
      "timestamp": 1627356924513,
      "source": {
        "type": "user",
        "userId": "U4af4980629..."
      },
      "webhookEventId": "01FZ74A0TDDPYRVKNK77XKC3ZR",
      "deliveryContext": {
        "isRedelivery": false
      },
      "replyToken":  "7840b71058e24a5d91f9b5726c7512c9",
      "mode": "active"
    }
  ]
}
```
主要先判斷訊息事件中類型是屬於`image`後即可確定是使用者傳送圖片

和一般的思路不一樣的地方是Line並不是直接把圖片整張丟過來
而且需要使用Line的API詢問這張圖片是什麼

記下圖片`ID`即可繼續操作

參考官方文件內容[官方文檔](https://developers.line.biz/en/reference/messaging-api/#message-event)

### 使用Line API取得圖片訊息內容

使用Line官方提供的 `getContent` API
簡單解釋ㄧ下大概就是圖片、影片、音訊、檔案等等訊息都要透過這個API來取得檔案本體

直接上官方範例程式[SDK](https://line.github.io/line-bot-sdk-nodejs/api-reference/client.html#getmessagecontent-messageid-string-promise-readable)
```
const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: '<channel access token>'
})
client.getMessageContent('<messageId>')
  .then((stream) => {
    stream.on('data', (chunk) => {
      ...
    });
    stream.on('error', (err) => {
      // error handling
    })
  })
```

回來的資料並不是圖檔本體
而是`readable stream`的資料格式

操考官方文檔[Get content](https://developers.line.biz/en/reference/messaging-api/#get-content)

### 處理buffer資料

`readable stream`大概就是資料被切分很多小塊`buffer`
需要把資料全部搜集好以後再一次轉換成我們需要的格式

查詢過imgur API中上傳圖片的指定格式後發現可以接受3種格式
`stream`, `base64`, `url`

所以預計處理方式是把`buffer`的資料搜集完成後全部轉換成`stream`的圖片格式

- 把buffer搜集起來
```
const buffers = []
readableBuffer.on('data', chunk => {
  buffers.push(chunk)
})
```

- 結束時將資料轉換成`stream`的格式
```
const { Readable } = require('stream')
readableBuffer.on('end', async () => {
  const stream = Readable.from(buffers)
})
```

### 使用imgur API上傳

最後再使用api直接上傳

```
const imgur_client = require('../imgur/index')
const data = await imgur_client.upload({
  image: stream,
  type: 'stream',
  album: process.env.IMGUR_ALBUM_ID
})
const link = data.data.link
```

成功上傳後會返回關於此次上傳的詳細資料
其中包含圖片的url位置
最後可以將url返回Line訊息即可