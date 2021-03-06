import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input() title = 'Default Title';
  @Input() fontFamily = 'roboto-fontface, sans-serif';
  @Input() fontSize = '50px';
  @Input() fontColor = 'ghostwhite';
  @Input() fontWeight = 'lighter';
  @Input() lineHeight = '';
  @Input() wordSpacing = '';
  @Input() wordBreak = '';
  @Input() margin = '';
  @Input() borderBottom = '';
  @Input() paddingBottom = '';
  @Input() position = '';
  @Input() left = '';
  @Input() right = '';
  @Input() top = '';
  @Input() bottom = '';
  @Input() background = '';
  // '-webkit-linear-gradient(white, #ADD8E6)'
  @Input() webkitBackgroundClip = '';
  // text
  @Input() webkitTextFillColor = '';
  // transparent


  constructor() { }

  ngOnInit(): void {
  }

}
