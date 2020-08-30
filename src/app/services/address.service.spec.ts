import { TestBed } from '@angular/core/testing';
import { AddressService } from '../services';
import { Address } from '../models/address';

describe('AddressService', () => {

  let addressService: AddressService;

  let testAddresses: Address[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddressService,
      ],
    });
    addressService = TestBed.get(AddressService);

    testAddresses = [
      { id: 'guid1', favorite: true, surname: 'Иванов', name: 'Иван', patronymic: 'Иванович', phone: '+7(111) 111-11-11' },
      { id: 'guid2', favorite: false, surname: 'Петров', name: 'Ян', patronymic: 'Петрович', phone: '+7(222) 222-22-22' },
    ];
    addressService.addInLocalStorage(testAddresses);
  });

  it('should exist', () => {
    expect(addressService).toBeTruthy();
  });

  it('should get addresses', () => {
    expect(addressService.getAddresses().length).toEqual(2);
  });

  it('should post addresses', () => {
    const payload = {
      payload: {
        address: {id: 'guid3', favorite: false, surname: 'Сидоров', name: 'Олег', patronymic: 'Вадимович', phone: '+7(333) 333-33-33'}
      }
    };

    addressService.postAddress(payload);
    expect(addressService.getFromLocalStorage().length).toEqual(3);
  });

  it('should delete addresses', () => {
    const payload = {
      payload: {
        address: {id: 'guid2'}
      }
    };
    addressService.deleteAddresses(payload);

    expect(addressService.getFromLocalStorage().length).toEqual(1);
  });

  it('should patch addresses', () => {
    const payload = {
      payload: {
        address: {id: 'guid2'}
      }
    };
    addressService.patchAddresses(payload);

    expect(addressService.getFromLocalStorage()[1].favorite).toEqual(true);

    payload.payload.address.id = 'guid1';
    addressService.patchAddresses(payload);

    expect(addressService.getFromLocalStorage()[1].favorite).toEqual(false);
  });

  it('should return empty array if empty local storage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return null;
    });

    expect(addressService.getFromLocalStorage().length).toEqual(0);
  });
});
