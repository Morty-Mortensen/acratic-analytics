import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-accounting-web-to-csv',
  templateUrl: './accounting-web-to-csv.component.html',
  styleUrls: ['./accounting-web-to-csv.component.css']
})
export class AccountingWebToCsvComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
