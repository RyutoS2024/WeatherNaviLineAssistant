/**
 * Triggerクラス
 */


/**
 * 既存のトリガーを全て削除する
 */
function deleteExistingTriggers() {
  // このスクリプトに紐づいている既存のトリガーを取得し、削除する
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

/**
 * 次のトリガーを作成する
 */
function createNextTrigger() {
  var date = new Date();
  // トリガーの起動時間は24時間後
  date.setHours(date.getHours() + 24, 0, 0, 0); 
  Logger.log(date)
  ScriptApp.newTrigger("main")
    .timeBased()
    .at(date)
    .create();
}