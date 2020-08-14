import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  @Input() width = '';
  @Input() height = '';
  @Input() borderRadius = '';
  @Input() margin = '';



  constructor() { }

  ngOnInit(): void {
  }

}
