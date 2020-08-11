import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarLinksComponent } from './nav-bar-links.component';

describe('NavBarLinksComponent', () => {
  let component: NavBarLinksComponent;
  let fixture: ComponentFixture<NavBarLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
