/**
 * ChatGPTクラス
 */

const API_KEY = "xxxxxxxxxxxxxxxxx";
const AI_CONTENT = `
  前提条件：
    あなたの職業はアナウンサーです。
    年齢は25歳で、性別は女性。
    朝のお天気キャスターをやっており、気象に関して専門的な知識を持っています。
    これから1日の気象情報を渡すので、その情報を要約しユーザーに伝えてください。
  
  文章を生成するときのポイント
    今日のお天気情報を要約する
    トークンの最大は700なのでその範囲内で文章を作る
    箇条書きではなく文章にして伝える
    文の最初に改行は不要
    文章には以下の内容を含めてください
    ・ 朝のあいさつ
    ・ 1日の最低気温と最高気温
    ・ 朝・昼・晩それぞれの気温
    ・ 雨が降るかどうか
    ・ 1日の服装
    ・ 外出時に気を付けるべきポイント
  `

/**
 * ChatGPT APIにリクエストしてメッセージを生成する
 * 
 * @param {}
 * @return {} 
  {
    "id": "xxxxxxxxxxxxxxxxxx",
    "usage": {"total_tokens": 989.0, "prompt_tokens": 574.0, "completion_tokens": 415.0},
    "choices": [
      {
        "message": {
          "content": "おはようございます、xxxxさん。今日の1日のお天気情報をお伝えしますね。
            今日の天気は、曇りがちから厚い雲の状態が続き、夜には小雨が降る予報です。朝の気温は15.5℃から始まり、昼間には最高気温が19.43℃まで上がる見込みです。
            体感温度も考慮して、寒暖差に注意が必要です。湿度は朝から高く、最大で100%に達する予定です。
            特に夜間は湿度が高いため、ムシムシした感じがするかもしれません。
            雨が降る可能性があるので、傘を持って外出することをおすすめします。
            服装は、朝晩は薄手のジャケットやカーディガンなど、日中は長袖で調整しやすい服装が良いでしょう。
            雨が降る可能性があるため、防水性のあるアウターや靴を準備しておくと安心です。
            今日は気温の変化が大きい一日になりそうです。
            体調管理に気を付けながら、快適な1日をお過ごしください。",
          "role": "assistant"
        },
        "finish_reason": "stop",
        "index": 0.0,
        "logprobs": null
      }
    ],
    "system_fingerprint": "xxxxxxxxx",
    "object": "xxxxxxxxxxx",
    "created": 1710664785,
    "model": "xxxxxxxxxxxx"
  };
 */
function getMessageFromChatGPT(dailyWeatherDataJson) {
  // APIエンドポイント
  var apiURL = "https://api.openai.com/v1/chat/completions";

  const USER_CONTENT = `
  前提条件
    私の名前はxxxxです。
    朝に情報番組を見ないため1日の天気が分からず困っています。

  ユーザー要求
  ${dailyWeatherDataJson}を元に今日1日のお天気を教えてください
`;
  var payload = JSON.stringify({
    // MODEL
    "model": "gpt-4-turbo",
    "messages": [
      // AIにどのような情報やスタイルで応答すべきか前提条件を与える
      {
        "role": "system",
        "content": AI_CONTENT
      },
      // ユーザーの質問やリクエスト
      {
        "role": "user",
        "content": USER_CONTENT
      },
    ],
    // テキストの多様性を制御
    "temperature": 0.7,
    // 最大トークン
    "max_tokens": 700,
    "top_p": 1.0,
    "frequency_penalty": 0.0,
    "presence_penalty": 0.0
  });

  var options = {
    "method" : "post",
    "contentType": "application/json", // コンテントタイプを指定
    "headers": {
      "Authorization": "Bearer " + API_KEY
    },
    "payload" : payload,
    "muteHttpExceptions": true // エラーハンドリングをカスタマイズする場合はtrueに設定
  };

  try {
    var response = UrlFetchApp.fetch(apiURL, options);
    var jsonResponse = JSON.parse(response.getContentText());
    var formattedJson = JSON.stringify(jsonResponse, null, 2); // 第二引数にnullを、第三引数にスペースの数を指定
    var message = getMessageFromJson(formattedJson);
    return message;

  } catch(e) {
    Logger.log("ChatGPT APIをリクエスト・整形中にエラーが発生しました。エラー: " + e.toString());
  }

  /**
   * JSONからメッセージだけを取得する
   * 
   * @param {} json
   * @return {string} message
   */
  function getMessageFromJson(json) {
    var jsonObject = JSON.parse(json);
    var message = jsonObject.choices[0].message.content;
    return message
  }

}
