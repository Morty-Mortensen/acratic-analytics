import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingWebToCsvComponent } from './accounting-web-to-csv.component';

describe('AccountingWebToCsvComponent', () => {
  let component: AccountingWebToCsvComponent;
  let fixture: ComponentFixture<AccountingWebToCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingWebToCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingWebToCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
