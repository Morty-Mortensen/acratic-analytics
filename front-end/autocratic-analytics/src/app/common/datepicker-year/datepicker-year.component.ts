import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-datepicker-year',
  templateUrl: './datepicker-year.component.html',
  styleUrls: ['./datepicker-year.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DatepickerYearComponent implements OnInit {

  date = new FormControl(moment());

  // range = new FormGroup({
  //   start: new FormControl(moment()),
  //   end: new FormControl(moment())
  // });

  range: FormGroup;

  maxDate: Date;
  minDate: Date;

  @Output() years = new EventEmitter<any>();


  constructor() {
    const currentYear = new Date().getFullYear();
    const minDateToConvert = '1996-01-01T00:00:00';
    const convertedMinDate = new Date(minDateToConvert).getFullYear();

    this.minDate = new Date(convertedMinDate, 0, 1);
    this.maxDate = new Date(currentYear, 11, 31);
  }

  ngOnInit(): void
  {
    this.range = new FormGroup({
      start: new FormControl(moment()),
      end: new FormControl(moment())
    });

    // Emit years when changed.
    this.range.valueChanges.subscribe(value => {
      const start = moment(new Date(this.range.controls.start.value)).format('YYYY');
      const end = moment(new Date(this.range.controls.end.value)).format('YYYY');
      this.years.emit({startDate: start, endDate: end});
    });
  }
}
