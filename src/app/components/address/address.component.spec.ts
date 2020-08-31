import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressComponent } from './address.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form be invalid', () => {
    const btn = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    btn.click();
    fixture.detectChanges();
    expect(component.formIsValid).toBeFalsy();
  });

  it('should form be valid', () => {
    spyOn(component.postAddress, 'emit');
    component.addressForm.controls.surname.setValue('123');
    component.addressForm.controls.phone.setValue('+7 (111) 111-11-11');
    const btn = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    btn.click();
    fixture.detectChanges();
    expect(component.postAddress.emit).toHaveBeenCalled();
  });
});
