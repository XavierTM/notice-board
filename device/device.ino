
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <LCD_I2C.h>
#include <ArduinoJson.h>

ESP8266WiFiMulti WiFiMulti;
LCD_I2C lcd(0x27, 20, 4); // Default address of most PCF8574 modules, change according
// const String URL = "http://192.168.0.108:8082/api/notices";
const String URL = "http://noticeboard.xavisoft.co.zw/api/notices";

const String ERROR_PAYLOAD = "56b4d90e-6d04-476d-ba4b-b0c1c60cc736";

void setup() {

  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP("NBV", "MALKONDELIA#");

  
  lcd.begin();
  lcd.backlight();
  
}


String getNotices() {
  
  if ((WiFiMulti.run() == WL_CONNECTED)) {

    WiFiClient client;

    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    if (http.begin(client, URL)) {  // HTTP


      Serial.print("[HTTP] GET...\n");
      // start connection and send HTTP header
      int httpCode = http.GET();

      // httpCode will be negative on error

      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] GET... code: %d\n", httpCode);

        // file found at server
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = http.getString();
          Serial.println(payload);
          http.end();

          return payload;
          
        }
      } else {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }

      http.end();

    } else {
      Serial.printf("[HTTP} Unable to connect\n");
    }
  }

  return ERROR_PAYLOAD;

  
}



void displayNotices(String payload) {

  // parse json
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, payload);

  /// test if parsing succeeds.
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }

  String notices[] = { doc[0], doc[1], doc[2], doc[3] };

  // displaying
  lcd.clear();

  for (byte i = 0; i < 4; i++) {

    String notice = notices[i];

    if (notice.length() > 20) {
      notice = notice.substring(0, 17) + "..."; // truncatiing and adding ellipsis
    }

    Serial.print("LCD: ");
    Serial.println(notice);

    lcd.setCursor(0, i);
    lcd.print(notice);
    
  }
 
}


void loop() {
  // wait for WiFi connection
  String notices = getNotices();

  if (ERROR_PAYLOAD.equals(notices)) {
    return;
  }

  displayNotices(notices);

  delay(10000);
}
