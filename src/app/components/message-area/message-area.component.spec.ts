import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAreaComponent } from './message-area.component';

describe('MessageAreaComponent', () => {
  let component: MessageAreaComponent;
  let fixture: ComponentFixture<MessageAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageAreaComponent]
    });
    fixture = TestBed.createComponent(MessageAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
