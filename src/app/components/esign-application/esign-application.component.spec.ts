import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsignApplicationComponent } from './esign-application.component';

describe('EsignApplicationComponent', () => {
  let component: EsignApplicationComponent;
  let fixture: ComponentFixture<EsignApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsignApplicationComponent]
    });
    fixture = TestBed.createComponent(EsignApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
