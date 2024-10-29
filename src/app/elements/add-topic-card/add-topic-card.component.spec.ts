import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicCardComponent } from './add-topic-card.component';

describe('AddTopicCardComponent', () => {
  let component: AddTopicCardComponent;
  let fixture: ComponentFixture<AddTopicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTopicCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTopicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
