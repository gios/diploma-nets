import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionModalComponent } from './transition-modal.component';

describe('TransitionModalComponent', () => {
  let component: TransitionModalComponent;
  let fixture: ComponentFixture<TransitionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
