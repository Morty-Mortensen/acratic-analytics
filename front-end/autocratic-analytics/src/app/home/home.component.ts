import { Component, OnInit } from '@angular/core';
import {NavigationStart, Router, RouterEvent, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{

  displayComponent = true;

  mockData = [
    {
      path: '/',
      title: 'Accounting and Software',
      subtitle: 'Accounting in the modern world',
      image: 'accounting-general.jpg',
      description: 'There is a lot that could be said about accounting in the modern world.'
    },
    {
      path: '/',
      title: 'Real Personal Finance',
      subtitle: 'Starting at home or at work?',
      image: 'finance-general.jpg',
      description: 'Here are a few tips and what could works for you when personal finance is concerned.'
    },
    {
      path: '/',
      title: 'Marketing to Millennials',
      subtitle: 'Is it possible?',
      image: 'marketing-general.jpg',
      description: 'This might be uncharted territory, but what if I said that Millennials could be marketed too?'
    },
  ];


constructor(private route: Router)
  {
    this.route.events.subscribe(event =>
    {
      if ( event instanceof RoutesRecognized)
      {
        if ( event.url === '/' )
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


