import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnacleModalComponent } from './pinnacle-modal.component';

describe('PinnacleModalComponent', () => {
  let component: PinnacleModalComponent;
  let fixture: ComponentFixture<PinnacleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinnacleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnacleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
