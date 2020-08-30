import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressTableComponent } from './address-table.component';
import { By } from '@Angular/platform-browser';

describe('AddressTableComponent', () => {
  let component: AddressTableComponent;
  let fixture: ComponentFixture<AddressTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressTableComponent);
    component = fixture.componentInstance;
    component.addresses = [
      { id: '1', favorite: true, surname: 'Иванов', name: 'Иван', patronymic: 'Иванович', phone: '+7(111) 111-11-11' },
      { id: '2', favorite: false, surname: 'Петров', name: 'Ян', patronymic: 'Петрович', phone: '+7(222) 222-22-22' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should work favorites', () => {
    spyOn(component.patchAddress, 'emit');
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[id=fav1]')).nativeElement;
    btn.click();
    fixture.detectChanges();
    expect(component.patchAddress.emit).toHaveBeenCalled();
  });

  it('should work removal', () => {
    spyOn(component.deleteAddress, 'emit');
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button[id=btn0]')).nativeElement;
    btn.click();
    fixture.detectChanges();
    expect(component.deleteAddress.emit).toHaveBeenCalled();
  });
});
