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
  mainTitle = 'Welcome to your business helper';

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


