import { Component, OnInit } from '@angular/core';
import {NavigationStart, Router, RouterEvent} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor()
  {
    // private route: Router
    // this.route.events.subscribe(event => {
    //
    //   // console.log(this.route.config);
    //   console.log('CONFIG: ' + this.route.routerState.root.firstChild);
    //   console.log('THE CHILDREN: ' + this.route);
    //   // console.log('CONFIG: ' + this.route.routerState.root.routeConfig);
    //   // console.log('THE CHILDREN: ' + this.route.routerState.root.routeConfig.children);
    //   let test = event;
    //   // console.log(event);
    //   // NavigationEnd
    //   // NavigationCancel
    //   // NavigationError
    //   // RoutesRecognized
    // });
  }

  ngOnInit(): void {

  }



}
