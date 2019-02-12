import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccdefListComponent } from './accdef-list.component';

describe('AccdefListComponent', () => {
  let component: AccdefListComponent;
  let fixture: ComponentFixture<AccdefListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccdefListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccdefListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
