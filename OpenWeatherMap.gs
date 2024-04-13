/**
 * 現在から48時間後までの1時間ごとの東京の天気情報を取得する
 * 
 * lat（緯度）: 35.6828387,
 * lon（経度）: 139.7594549
 * 
 * @param
 * @return
 */
function getWeatherData() {
  var url = "https://api.openweathermap.org/data/3.0/onecall?lat=35.6828387&lon=139.7594549&exclude=current,minutely,daily,alerts&appid=xxxxxxxxxxxx&units=metric&lang=ja";
  var response = UrlFetchApp.fetch(url);
  return JSON.parse(response.getContentText());
}

/**
 * OpenWeatherMap APIのうち直近24時間の天気情報を取得する
 *
 * @param
 * @return
 */
function extractDailyWeatherDataJson() {

  // 実行時間から48時間後までの1時間ごとの気象情報を取得する
  var data = getWeatherData();

  // 1日の天気情報が入ったリスト
  var daily_weather_data_list = []

  // 1日の天気情報を取得する
  for (var i = 0; i < 24; i++) {

    // 1時間ごとの天気情報を取得する
    var hourly_weather_data = data.hourly[i]

    // dtを日本時間に変換する
    var jst_time = convertTimestampToJST(hourly_weather_data.dt)
    
    //　新規オブジェクトを作成する
    var summarize_hourly_weather_data = {
      "時間(JST)": jst_time,
      "気温(℃)": hourly_weather_data.temp,
      "体感温度(℃)": hourly_weather_data.feels_like,
      "湿度(%)": hourly_weather_data.clouds,
      "UV": hourly_weather_data.uvi,
      "風速(m/s)": hourly_weather_data.wind_speed,
      "1時間あたりの降水量(mm/h)": hourly_weather_data.rain,
      "1時間あたりの降雪量（mm/h）": hourly_weather_data.snow,
      "主要な天気": hourly_weather_data.weather[0].main,
      "天気状況": hourly_weather_data.weather[0].description
    }
    // リストに1時間ごとの天気情報を入れる
    daily_weather_data_list.push(summarize_hourly_weather_data)
  }

  // リストをオブジェクトに入れる
  var daily_weather_data_objects = {
    "daily_weather_data": daily_weather_data_list
  }

  // JSONで返す
  return JSON.stringify(daily_weather_data_objects)
}