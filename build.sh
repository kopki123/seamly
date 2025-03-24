#!/bin/bash

# 進入 client 目錄
cd client

# 安裝套件
npm install

# 執行構建
npm run build

# 返回上級目錄
cd ..

echo "構建完成，文件已移動到 public 目錄"