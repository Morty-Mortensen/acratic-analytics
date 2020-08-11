import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav-bar-links',
  templateUrl: './nav-bar-links.component.html',
  styleUrls: ['./nav-bar-links.component.css']
})
export class NavBarLinksComponent implements OnInit {

  @Input() links = [];
  @Input() width = '';
  @Input() fontSize = '';

  constructor() { }

  ngOnInit(): void {
  }

}
