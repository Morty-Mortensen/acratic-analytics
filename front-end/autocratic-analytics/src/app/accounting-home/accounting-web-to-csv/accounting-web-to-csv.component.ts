import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

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
      description: 'There is a lot that could be said about accounting in the modern world.'
    },
    // {
    //   path: '/',
    //   title: 'Real Personal Finance',
    //   subtitle: 'Starting at home or at work?',
    //   image: 'finance-general.jpg',
    //   description: 'Here are a few tips and what could works for you when personal finance is concerned.'
    // },
    // {
    //   path: '/',
    //   title: 'Marketing to Millennials',
    //   subtitle: 'Is it possible?',
    //   image: 'marketing-general.jpg',
    //   description: 'This might be uncharted territory, but what if I said that Millennials could be marketed too?'
    // },
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
