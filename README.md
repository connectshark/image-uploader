# image-uploader

node + imgur

管理你在IMGUR雲端空間上的圖片們 搭配前端專案[image-manager](https://github.com/connectshark/image-manager)可進行本地端操作

## 一鍵部署至Render
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/connectshark/imgur-on-render)


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
- 瀏覽指定相簿的照片