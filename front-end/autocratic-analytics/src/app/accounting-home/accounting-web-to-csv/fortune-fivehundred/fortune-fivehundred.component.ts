import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-fortune-fivehundred',
  templateUrl: './fortune-fivehundred.component.html',
  styleUrls: ['./fortune-fivehundred.component.css']
})
export class FortuneFivehundredComponent implements OnInit {

  selectedYear = '';

  constructor() { }

  ngOnInit(): void {
  }

  setSelectedDate($event)
  {
    this.selectedYear = $event.target.value;
    alert('You selected ' + this.selectedYear);
  }

}
