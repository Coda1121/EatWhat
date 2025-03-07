# EatWhat? 水湳美食轉盤

![EatWhat? 水湳美食轉盤](https://img.shields.io/badge/EatWhat%3F-%E6%B0%B4%E6%B9%B3%E7%BE%8E%E9%A3%9F%E8%BD%89%E7%9B%A4-00B3BA)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript)
![Styled Components](https://img.shields.io/badge/Styled_Components-6.1.8-DB7093?logo=styled-components)

EatWhat? 是一個幫助你決定吃什麼的網頁應用，專注於水湳地區的美食選擇。通過隨機轉盤的方式，讓選擇美食變得更加有趣！

## 線上體驗

訪問 [EatWhat? 水湳美食轉盤](https://Coda1121.github.io/EatWhat) 立即體驗！

## 功能特點

- 隨機轉盤選擇美食，告別選擇困難症
- 兩種模式：預設版本與自訂版本
- 美食項目可包含名稱、地址和 Google Maps 連結
- 點擊可直接跳轉到 Google Maps 導航
- 支援新增、編輯和刪除自訂美食項目
- 響應式設計，完美適配各種裝置

## 預設美食清單

應用內建以下水湳地區的美食選項：

1. 蒸心手工小籠湯包
2. 王爺王肉羹
3. 一生懸命 丼飯（水湳總店）
4. 胖老闆早午餐
5. くら寿司 藏壽司 台中中清路店

## 技術實現

- **前端框架**：React + TypeScript
- **樣式管理**：Styled Components
- **轉盤效果**：React Custom Roulette
- **數據存儲**：LocalStorage
- **部署平台**：GitHub Pages

## 本地開發

### 安裝依賴

```bash
npm install
```

### 啟動開發服務器

```bash
npm start
```

### 構建生產版本

```bash
npm run build
```

### 部署到 GitHub Pages

```bash
npm run deploy
```

## 使用說明

1. **預設版本**：直接點擊「開始轉動」按鈕，隨機選擇水湳地區的美食
2. **自訂版本**：
   - 點擊「自訂版本」按鈕切換模式
   - 在右側表單中添加您喜愛的美食項目
   - 點擊「開始轉動」按鈕，從您的自訂清單中隨機選擇

## 注意事項

- 自訂版本中添加的項目僅保存在瀏覽器本地存儲中
- 清除瀏覽器數據或使用隱私模式將導致自訂項目丟失
- 切換到預設模式將清空您的自訂項目

