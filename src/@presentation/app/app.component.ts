import { Component } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reto-bancom';

  constructor(
    private idle: Idle, private keepalive: Keepalive
  ){
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => { 
      console.log("No longer idle.");
    });
    
    idle.onTimeout.subscribe(() => {
      console.log("Time out");
    });
    
    idle.onIdleStart.subscribe(() => {
        console.log("You\'ve gone idle!");
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      console.log("You will time out in"+countdown);
    });

    this.idle.watch();
  }
}
