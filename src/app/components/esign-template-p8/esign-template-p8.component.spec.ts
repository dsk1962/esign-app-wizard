import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsignTemplateP8Component } from './esign-template-p8.component';

describe('EsignTemplateP8Component', () => {
  let component: EsignTemplateP8Component;
  let fixture: ComponentFixture<EsignTemplateP8Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsignTemplateP8Component]
    });
    fixture = TestBed.createComponent(EsignTemplateP8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
