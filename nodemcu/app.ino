#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ESP8266HTTPClient.h>

ESP8266WiFiMulti WiFiMulti;

void setup() {
  // put your setup code here, to run once:
                
  WiFiMulti.addAP("OnePlus3", "dianaisaturtle");

}

void loop() {
  // put your main code here, to run repeatedly:
  if (WiFiMulti.run() == WL_CONNECTED) {
    HTTPClient http;

    http.begin("http://192.168.43.168:3000/test");
    int httpCode = http.GET();
    http.end();
  }

  delay(1000);
}
