import { ChangeDetectorRef, Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  changed= false;
  title = 'change-detection';
  _time: any = null;
  text= 'Original text in parent component'

  constructor(
    zone: NgZone,
    public cd: ChangeDetectorRef
    ){
    this._time = Date.now();

  //  setInterval( // PROBLEM: Runs change detection all the time (miLlisecond change)
    // Because zone.js causes a change detection for any async event happening in the browser; in this case
    // the NgZone triggers many change detections because of the setInterval callback which within it ---
    // the _time is changed thus the getter time which is a constituent of this view's binding (time & textContent of the span element)
    //   () => {
    //     this._time = Date.now();
    //   }
    // );


    zone.runOutsideAngular(// Running the setIntervalout side the Angular zone so that
      // the next time change detection happens the value of the getter time will be the synced/uptodate


      // Using NgZone to run some code outside of Angular to avoid triggering
      // change detection is a common optimization technique


      // The click event will trigger change detection; because of zone.js - it considers DOM events too; I guess
      () => {
        setInterval(
          () => {
            this._time = Date.now();
          }
        );
      }
    )



    // indepth example

    setTimeout(() => {
      this.cd.detach();
      this.changed = true;
    }, 2000);


    setTimeout(() => {
      this.cd.reattach();
      this.changed = true;


    }, 8000);
  }

  get time() {
    return this._time;
  }
}
