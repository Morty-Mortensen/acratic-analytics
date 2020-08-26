import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CurrencyPipe, DecimalPipe} from '@angular/common';


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



  constructor(private http: HttpClient, private router: Router, private currencyPipe: CurrencyPipe, private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
  }

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
    if ( currentYear )
    {
      // const currYearJsonData = JSON.stringify(this.currentFortuneFivehundredData);
      const selectedYearData = [];
      for ( let i = 0; i < this.currentFortuneFivehundredData.data.length; i++ )
      {
        selectedYearData.push(this.makePretty(this.currentFortuneFivehundredData.data[i], this.currentFortuneFivehundredData.year));
      }

      this.exportAsExcelFile(selectedYearData, 'year_test');
    }
    else
    {
      // const allYearsJsonData = JSON.stringify(this.fortuneFivehundredResponseData);
      const allData = [];
      let start: number = +this.selectedStartYear;
      const end: number = +this.selectedEndYear;

      while ( start <= end )
      {
        for ( let i = 0; i < this.fortuneFivehundredResponseData[start].length; i++ )
        {
            allData.push(this.makePretty(this.fortuneFivehundredResponseData[start][i], start));
        }
        start++;
      }



      this.exportAsExcelFile(allData, 'all_test');
    }
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
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
