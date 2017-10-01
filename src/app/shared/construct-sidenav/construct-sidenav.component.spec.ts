import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructSidenavComponent } from './construct-sidenav.component';

describe('ConstructSidenavComponent', () => {
  let component: ConstructSidenavComponent;
  let fixture: ComponentFixture<ConstructSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
