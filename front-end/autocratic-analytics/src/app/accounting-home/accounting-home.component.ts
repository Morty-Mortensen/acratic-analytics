import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-accounting-home',
  templateUrl: './accounting-home.component.html',
  styleUrls: ['./accounting-home.component.css']
})
export class AccountingHomeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
