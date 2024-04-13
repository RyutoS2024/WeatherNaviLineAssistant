/**
 * Timeクラス
 */

/**
 * タイムスタンプを日本時間に変換する
 * 
 * @param unixTimestamp: UNIXタイムスタンプ
 * @return jstDate: 日本時間
 */
function convertTimestampToJST(unixTimestamp) {
  // UNIXタイムスタンプをミリ秒に変換（JavaScriptではミリ秒単位で扱う）
  var date = new Date(unixTimestamp * 1000);
  
  // 日本標準時に変換するために、UTC時刻に9時間を加算する
  date.setHours(date.getUTCHours() + 9);
  
  // 日本標準時の日付と時刻を '年-月-日 時:分:秒' の形式でフォーマットする
  var jstDate = Utilities.formatDate(date, "JST", "yyyy-MM-dd HH:mm:ss");
  
  return jstDate;
}