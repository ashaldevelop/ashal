import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccdefComponent } from './new-accdef.component';

describe('NewAccdefComponent', () => {
  let component: NewAccdefComponent;
  let fixture: ComponentFixture<NewAccdefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccdefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccdefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
