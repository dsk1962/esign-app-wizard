import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsignTemplateNotificationComponent } from './esign-template-notification.component';

describe('EsignTemplateNotificationComponent', () => {
  let component: EsignTemplateNotificationComponent;
  let fixture: ComponentFixture<EsignTemplateNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsignTemplateNotificationComponent]
    });
    fixture = TestBed.createComponent(EsignTemplateNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
