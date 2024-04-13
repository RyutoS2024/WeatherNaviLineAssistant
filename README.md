# WeatherNaviLineAssistant

## 概要
今日のお天気情報を教えてくれるAI LINEbot

## 機能
- 今日のお天気情報を要約し朝7時にLINEへ通知する
  - メッセージ内容
    - 1日の最低気温と最高気温
    - 朝・昼・晩それぞれの気温
    - 雨が降るかどうか
    - 1日の服装
    - 外出時に気を付けるべきポイントなど

## 処理フロー
![WeatherNaviLineAssistant_Processing_Flow](https://github.com/RyutoS2024/WeatherNaviLineAssistant/assets/87289018/1e6773ec-ceee-4d3b-81ab-66646b3b8c50)
- OpenWeatherMap APIからHourlyデータを取得する
  - Hourlyデータとは実行時間から48時間後までの1時間ごとの気象データ
- 気象データを整形する
  - 実行時間から24時間後までのデータを取得する
  - 以下のデータだけ取得する
    - 時間（JST）
    - 気温(℃)
    - 体感温度(℃)
    - 湿度(%)
    - UV
    - 風速(m/s)
    - 1時間あたりの降水量(mm/h)
    - 1時間あたりの降雪量（mm/h）
    - 主要な天気
    - 天気状況
- 整形した気象データをChatGPT APIで読み込み、メッセージを生成する
- 生成したメッセージをLINEへ送る

## 技術
- Google Apps Scirpt
- OpenWeatherMap API
- ChatGPT API
- LINE Messaging API

## 追加実装について
- 一般公開化する
- ユーザーの入力メッセージに応答する
  - ユーザーの居住地
  - 言語
  - 文章量
  - それぞれのユーザーに合わせてメッセージ内容を変更する
