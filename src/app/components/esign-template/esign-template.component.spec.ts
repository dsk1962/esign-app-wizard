import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsignTemplateComponent } from './esign-template.component';

describe('EsignTemplateComponent', () => {
  let component: EsignTemplateComponent;
  let fixture: ComponentFixture<EsignTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsignTemplateComponent]
    });
    fixture = TestBed.createComponent(EsignTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
