# image-uploader

## 目錄

- [部署至Render](#部署至Render)
- [如何使用](#如何使用)
- [目前可使用的功能](#目前可使用的功能)

express + imgur

管理你在IMGUR雲端空間上的圖片們 搭配前端專案[image-manager](https://github.com/connectshark/image-manager)可進行本地端操作

## 部署至Render

[imgur-on-render](https://github.com/connectshark/imgur-on-render)


## 如何使用
下載至本地端後於根目錄新增`.env`檔 新增以下指定內容
```
.env
IMGUR_REFRESH_TOKEN=<IMGUR_REFRESH_TOKEN>
IMGUR_CLIENT_ID=<IMGUR_CLIENT_ID>
IMGUR_CLIENT_SECRET=<IMGUR_CLIENT_SECRET>
IMGUR_ALBUM_ID=<IMGUR_ALBUM_ID>
```

## 目前可使用的功能

- 新增圖片
- 刪除圖片
- 更新圖片資訊
- 瀏覽指定相簿的照片
- 瀏覽指定畫廊的照片