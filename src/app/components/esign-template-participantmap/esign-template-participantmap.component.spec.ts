import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsignTemplateParticipantmapComponent } from './esign-template-participantmap.component';

describe('EsignTemplateParticipantmapComponent', () => {
  let component: EsignTemplateParticipantmapComponent;
  let fixture: ComponentFixture<EsignTemplateParticipantmapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsignTemplateParticipantmapComponent]
    });
    fixture = TestBed.createComponent(EsignTemplateParticipantmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
