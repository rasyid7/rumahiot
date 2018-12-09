#include <FirebaseArduino.h>
#include <ESP8266WiFi.h>

// Set these to run example.
//#define WIFI_SSID "CMW-Corp"
//#define WIFI_PASSWORD "BBM4you!"
#define WIFI_SSID "Amir"
#define WIFI_PASSWORD "idoaffa0306"

#define CHIPID ESP.getChipId()
#define PATH "/users/6q7u3nY1CPXBJup2I02Yt98mpS93/"
#define FBHOST "rumahiot-dev.firebaseio.com"
#define FBKEY "bdzkIlAGWz4UYXOQqeYolLLpzPAqjgtUGN10dv7P"

int num = 1;
int pins[] = {LED_BUILTIN};
int states[] = {LOW};
//int num = 4;
//int pins[] = {D5, D6, D7, D8};
//int states[] = {LOW, LOW, LOW};

void setup() {
  Serial.begin(115200);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println(); 
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  Firebase.begin(FBHOST, FBKEY);

  delay(1000);
  registerMicrocontroller();
}

void loop() {

  firebaseGet();

  if (Firebase.failed())
  {
    Serial.print("setting / number failed:");
    Serial.println(Firebase.error());
    firebasereconnect();
    delay(5);
    return;
  }
}

void registerMicrocontroller() {

  for (int i = 0; i < num; i++) {

    pinMode(pins[i], OUTPUT);

    String path = getPath();
    //    path = path + "/" + pins[i];
    path = path + "/state";
    Serial.println(path);

    Firebase.setBool(path, !states[i]);
  }
}

void firebaseGet() {

  String path = getPath();
  FirebaseObject object = Firebase.get(path);

  if (Firebase.failed()) {
    Serial.println("Firebase error");
    Serial.println(Firebase.error());
  }

  for (int i = 0; i < num; i++) {

    int pin = pins[i];
    String p = "state";
    //    p = p + pin;
    int state = object.getBool(p);

    if (states[i] != state) {

      digitalWrite(pins[i], !state);
      states[i] = state;

      Serial.println();
      Serial.printf("Pin: %d State: %d", pin, state);
    }
  }
  delay(500);
}


String getPath() {

  String path = "";

  path += PATH;
  //  path += CHIPID;
  path += "devices/-LQxBtjRgpEbfky9qAQs";

  return path;
}

void firebasereconnect()
{
  Serial.println("Trying to reconnect");
  delay(500);
//  ESP.wdtFeed();
//  Firebase.begin(FBHOST, FBKEY);
//  delay(5);
//  ESP.wdtDisable();
  ESP.reset();
}
