import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Input() fontSize = '';
  @Input() width = '';
  @Input() availableRoutes = [];

  filterOptions: Observable<string[]>;

  search = new FormControl();
  startSearch = false;
  timesSearchButtonClicked = 0;

  constructor(private element: ElementRef) { }

  ngOnInit(): void {

    console.log('Availalbe search routes: ' + this.availableRoutes);

    this.filterOptions = this.search.valueChanges.pipe(
      map(value => this.availableRoutes.filter(option => option.display.toLowerCase().includes(value)))
    );
  }

  @HostListener('focus') openSearchBar()
  {
    this.startSearch = true;
  }

  @HostListener('blur') onBlur()
  {
    this.startSearch = false;
  }

  public closeSearchBar()
  {
      this.startSearch = false;
      this.timesSearchButtonClicked = 0;
  }

  // Close search bar after clicking out.
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement)
  {
    const clickedInside = this.element.nativeElement.contains(targetElement);
    this.timesSearchButtonClicked++;
    if (!clickedInside && this.startSearch && this.timesSearchButtonClicked > 1)
    {
      this.closeSearchBar();
    }
  }





}
