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
      title: 'My Title',
      subtitle: 'My Sub Title',
      image: 'question_mark.png',
      description: 'Here is a little description about the article.'
    },
    {
      path: '/',
      title: 'My Title 2',
      subtitle: 'My Sub Title 2',
      image: 'question_mark.png',
      description: 'Here is a little description about the article 2.'
    },
    {
      path: '/',
      title: 'My Title 3',
      subtitle: 'My Sub Title 3',
      image: 'question_mark.png',
      description: 'Here is a little description about the article 3.'
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


