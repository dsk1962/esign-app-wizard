import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsignTemplateFieldmapComponent } from './esign-template-fieldmap.component';

describe('EsignTemplateFieldmapComponent', () => {
  let component: EsignTemplateFieldmapComponent;
  let fixture: ComponentFixture<EsignTemplateFieldmapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsignTemplateFieldmapComponent]
    });
    fixture = TestBed.createComponent(EsignTemplateFieldmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
