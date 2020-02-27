#include <stdio.h>
#include <wiringPi.h>

int main (void) {
  wiringPiSetup();
  pinMode (0, INPUT) ;
  pinMode (1, INPUT) ;
  pinMode (2, INPUT) ;
  pinMode (3, INPUT) ;
  pinMode (4, INPUT) ;
  pinMode (5, INPUT) ;
  pinMode (6, INPUT) ;
  pinMode (7, INPUT) ;
//  pinMode (8, INPUT) ;
  int data=0, port=0;
  for (;;) {
    for (port=0;port<8;port++){
      data=digitalRead(port);
      printf(".%d",data);
    }
//    delay(50);
  printf(".\n");
  }
  return 0;
}

