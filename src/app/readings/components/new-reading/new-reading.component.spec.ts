import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReadingComponent } from './new-reading.component';

describe('NewReadingComponent', () => {
  let component: NewReadingComponent;
  let fixture: ComponentFixture<NewReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewReadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReadingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
