import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumCardComponent } from './medium-card.component';

describe('MediumCardComponent', () => {
  let component: MediumCardComponent;
  let fixture: ComponentFixture<MediumCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
