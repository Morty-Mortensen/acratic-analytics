import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-accounting-home',
  templateUrl: './accounting-home.component.html',
  styleUrls: ['./accounting-home.component.css']
})
export class AccountingHomeComponent implements OnInit {

  displayComponent = true;
  currUrl = '';

  constructor(private route: Router)
  {

    this.route.events.subscribe(event =>
    {

      if ( event instanceof NavigationEnd)
      {
        if ( event.url === '/accounting' )
        {
          this.displayComponent = true;
        }
        else
        {
          this.displayComponent = false;
        }
      }

    });
  }

  // @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
  //   console.log("Processing beforeunload...");
  //   // Do more processing...
  //   // event.returnValue = false;
  //   this.displayComponent = true;
  // }

  ngOnInit(): void {
  }

}
