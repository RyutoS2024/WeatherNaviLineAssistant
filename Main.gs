/**
 * Mainクラス
 */


/**
 * 各クラスに定義したメソッドを集約し実行する
 */
function main() {
    // 全てのトリガーを削除する
  deleteExistingTriggers();

  // 2時間後のトリガーを作成する
  createNextTrigger();
  
  // 現在から24h後までの天気情報を取得する
  var daily_weather_data_json = extractDailyWeatherDataJson();

  // ChatGPTからメッセージを取得する
  var message = getMessageFromChatGPT(daily_weather_data_json);

  // メッセージをLINEへ送る
  sendLineMessage(message); 
}
