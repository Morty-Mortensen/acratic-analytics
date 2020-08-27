import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-accounting-web-to-csv',
  templateUrl: './accounting-web-to-csv.component.html',
  styleUrls: ['./accounting-web-to-csv.component.css']
})
export class AccountingWebToCsvComponent implements OnInit {

  displayComponent = true;

  mockData = [
    {
      path: 'fortune-500',
      title: 'Fortune 500',
      image: 'fortune-500.jpg',
      // description: 'There is a lot that could be said about accounting in the modern world.'
    },
  ];



  constructor(private route: Router)
  {

    this.route.events.subscribe(event =>
    {

      if ( event instanceof NavigationEnd)
      {
        if ( event.url === '/accounting/web-to-csv' )
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

  ngOnInit(): void {
  }

}
