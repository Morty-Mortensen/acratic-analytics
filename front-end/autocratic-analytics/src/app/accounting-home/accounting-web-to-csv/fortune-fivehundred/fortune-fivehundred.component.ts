import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fortune-fivehundred',
  templateUrl: './fortune-fivehundred.component.html',
  styleUrls: ['./fortune-fivehundred.component.css']
})
export class FortuneFivehundredComponent implements OnInit {

  selectedYear = '';

  webpageResponse = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  setSelectedDate($event: string)
  {
    this.selectedYear = $event;
  }

  submit()
  {
    this.http.get(this.router.url)
      .subscribe(response => {
        console.log(response);
      });
  }


}
