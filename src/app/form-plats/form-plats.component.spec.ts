import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlatsComponent } from './form-plats.component';

describe('FormPlatsComponent', () => {
  let component: FormPlatsComponent;
  let fixture: ComponentFixture<FormPlatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPlatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
