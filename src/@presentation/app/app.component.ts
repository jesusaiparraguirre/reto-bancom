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
    idle.setIdle(5);
    // logout after 15 minutes
    idle.setTimeout(900);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => { 
      console.log("No longer idle.");
    });
    
    idle.onTimeout.subscribe(() => {
      console.log("Time out");
      alert("Tu sesion ha expirado")
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
