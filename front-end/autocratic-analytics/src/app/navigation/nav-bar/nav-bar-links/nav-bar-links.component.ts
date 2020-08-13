import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-nav-bar-links',
  templateUrl: './nav-bar-links.component.html',
  styleUrls: ['./nav-bar-links.component.css']
})
export class NavBarLinksComponent implements OnInit {

  @Input() links = [];
  @Input() backLink = null;
  @Input() width = '';
  @Input() fontSize = '';
  @Input() matMenuItems = false;
  @Input() noButton = false;


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void
  {
  }



}
