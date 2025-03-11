const int buttonPins[10] = {13, 12, 11, 10, 9, 8, 7, 6, 5, 4}; 
int buttonStates[10];  
int lastButtonStates[10]; 
void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 10; i++) {
    pinMode(buttonPins[i], INPUT_PULLUP);  
    lastButtonStates[i] = HIGH;
  }
}

void loop() {
  for (int i = 0; i < 10; i++) {
    buttonStates[i] = digitalRead(buttonPins[i]);

    if (lastButtonStates[i] == HIGH && buttonStates[i] == LOW) {
      Serial.println(i); 
      delay(200);         
    }

    lastButtonStates[i] = buttonStates[i];
  }
}
