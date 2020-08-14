import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent implements OnInit {

  // path: /something/is/here, display: Cool Looking Name
  @Input() cards = [];

  constructor() { }

  ngOnInit(): void {
  }

}
