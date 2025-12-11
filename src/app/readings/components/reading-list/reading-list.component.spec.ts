import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingListComponent } from './reading-list.component';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
