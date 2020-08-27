import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CurrencyPipe, DecimalPipe} from '@angular/common';
import {ExcelService} from "../../../common-services/excel.service";


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-fortune-fivehundred',
  templateUrl: './fortune-fivehundred.component.html',
  styleUrls: ['./fortune-fivehundred.component.css']
})
export class FortuneFivehundredComponent implements OnInit {

  selectedStartYear = '';
  selectedEndYear = '';
  selectedCompaniesPerYear = 100;
  fortuneFivehundredResponseData = null;
  currentFortuneFivehundredData = null;

  displayedColumns: string[] = ['rank', 'name',
    'revenue', 'revenuePercentChange',
    'profits', 'profitsPercentChange',
    'assets', 'marketValue',
    'changeInRankFull1000', 'employees',
    'changeInRank500Only'];
  dataSource = null;
  loading = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private http: HttpClient, private router: Router, private currencyPipe: CurrencyPipe, private decimalPipe: DecimalPipe, private excelService: ExcelService) { }

  ngOnInit(): void {}

  setSelectedDate($event: any)
  {
    this.selectedStartYear = $event.startDate;
    this.selectedEndYear = $event.endDate;
  }

  submit()
  {
    this.loading = true;
    this.http.post('http://localhost:8080' + this.router.url, {startDate: this.selectedStartYear, endDate: this.selectedEndYear, companiesPerYear: this.selectedCompaniesPerYear})
      .subscribe(response => {
        this.loading = false;
        this.fortuneFivehundredResponseData = response;
        this.currentFortuneFivehundredData = {year: this.selectedStartYear, data: this.fortuneFivehundredResponseData[this.selectedStartYear]};
        this.dataSource = new MatTableDataSource<FortuneFivehundredInterface>(this.currentFortuneFivehundredData.data);
        this.dataSource.paginator = this.paginator;
      });
  }

  validateValue()
  {
    if ( this.selectedCompaniesPerYear < 0 )
    {
      alert('Negative values are not allowed');
      this.selectedCompaniesPerYear = 100;
    }
  }

  displaySelectedYear(selectedYear)
  {
    this.currentFortuneFivehundredData = {year: selectedYear, data: this.fortuneFivehundredResponseData[selectedYear]};
    this.dataSource = new MatTableDataSource<FortuneFivehundredInterface>(this.currentFortuneFivehundredData.data);
    this.dataSource.paginator = this.paginator;
  }

  export(currentYear)
  {
    const cleanDataToExport = [];
    let exportTitle: string;
    if ( currentYear )
    {
      for ( let i = 0; i < this.currentFortuneFivehundredData.data.length; i++ )
      {
        cleanDataToExport.push(this.makePretty(this.currentFortuneFivehundredData.data[i], this.currentFortuneFivehundredData.year));
      }

      exportTitle = 'fortune_fivehundred_' + this.currentFortuneFivehundredData.year;
    }
    else
    {
      let start: number = +this.selectedStartYear;
      const end: number = +this.selectedEndYear;

      while ( start <= end )
      {
        for ( let i = 0; i < this.fortuneFivehundredResponseData[start].length; i++ )
        {
          cleanDataToExport.push(this.makePretty(this.fortuneFivehundredResponseData[start][i], start));
        }
        start++;
      }
      exportTitle = 'fortune_fivehundred_' + this.selectedStartYear + '_' + this.selectedEndYear;
    }

    this.excelService.exportAsExcelFile(cleanDataToExport, exportTitle);
  }

  public makePretty(data: any, year: number)
  {
    return {
      Year: year,
      Rank: data.rank,
      Name: data.name,
      Revenue: this.currencyPipe.transform(data.revenue),
      RevenuePercentChange: data.revenuePercentChange + '%',
      Profits: this.currencyPipe.transform(data.profits),
      ProfitsPercentChange: data.profitsPercentChange + '%',
      Assets: this.currencyPipe.transform(data.assets),
      MarketValue: this.currencyPipe.transform(data.marketValue),
      ChangeInRankFull1000: data.changeInRankFull1000,
      Employees: this.decimalPipe.transform(data.employees, '1.0-0'),
      ChangeInRank500Only: data.changeInRank500Only

    };
  }
}

export interface FortuneFivehundredInterface {

  rank: number;
  name: string;
  revenue: number;
  revenuePercentChange: number;
  profits: number;
  profitsPercentChange: number;
  assets: number;
  marketValue: number;
  changeInRankFull1000: number;
  employees: number;
  changeInRank500Only: number;
}
