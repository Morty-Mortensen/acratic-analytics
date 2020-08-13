import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingCreateLogoComponent } from './marketing-create-logo.component';

describe('MarketingCreateLogoComponent', () => {
  let component: MarketingCreateLogoComponent;
  let fixture: ComponentFixture<MarketingCreateLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingCreateLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingCreateLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
