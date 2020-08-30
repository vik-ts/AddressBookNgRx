import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AddressEffects } from './address.effects';
import { AddressService } from '../../services/index';
import { Actions } from '@ngrx/effects';
import { Address } from '../../models/address';
import { cold } from 'jasmine-marbles';
import { AddressPostAction, AddressesGetAction, AddressesErrorAction,
  AddressDeleteAction, AddressPatchAction, AddressesGetCompleteAction } from '../actions';

export function mockAddressService(response: any | Error, func): any {
  const service = jasmine.createSpyObj('service', [ func ]);
  const isError = response instanceof Error;
  const serviceResponse = isError ? Observable.throw(response) : response;

  service[func].and.returnValue(serviceResponse);

  return service;
}

describe('AddressEffects', () => {
  let effects: AddressEffects;
  let actions$: Observable<any>;
  let addressService: AddressService;
  let addressTest: Address;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddressEffects,
        AddressService,
        provideMockActions(() => actions$),
      ]
    });
    effects = TestBed.inject(AddressEffects);
    actions$ = TestBed.get(Actions);
    addressService = TestBed.get(AddressService);
    addressTest =  { id: '1', favorite: true, surname: 'Иванов', name: 'Иван', patronymic: 'Иванович', phone: '+7(111) 111-11-11' };
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('postAddress$ should return an AddressesGetAction action, with parameters on success', () => {
    const source = cold('a', { a: new AddressPostAction({ address: addressTest }) });
    const service = mockAddressService({}, 'postAddress');
    const effectsAddress = new AddressEffects(new Actions(source), service);
    const expected = cold('a', { a: new AddressesGetAction() });
    expect(effectsAddress.postAddress$).toBeObservable(expected);
  });

  it('deleteAddress$ should return an AddressesGetAction action, with parameters on success', () => {
    const source = cold('a', { a: new AddressDeleteAction({ address: addressTest }) });
    const service = mockAddressService({}, 'deleteAddresses');
    const effectsAddress = new AddressEffects(new Actions(source), service);
    const expected = cold('a', { a: new AddressesGetAction() });
    expect(effectsAddress.deleteAddress$).toBeObservable(expected);
  });

  it('patchAddress$ should return an AddressesGetAction action, with parameters on success', () => {
    const source = cold('a', { a: new AddressPatchAction({ address: addressTest }) });
    const service = mockAddressService({}, 'patchAddresses');
    const effectsAddress = new AddressEffects(new Actions(source), service);
    const expected = cold('a', { a: new AddressesGetAction() });
    expect(effectsAddress.patchAddress$).toBeObservable(expected);
  });

  it('getAddresses$ should return an AddressesGetCompleteAction action, with parameters on success', () => {
    const source = cold('a', { a: new AddressesGetAction() });
    const service = mockAddressService(null, 'getAddresses');
    const effectsAddress = new AddressEffects(new Actions(source), service);
    const expected = cold('a', { a: new AddressesGetCompleteAction(null) });
    expect(effectsAddress.getAddresses$).toBeObservable(expected);
  });

  it('should return an AddressesErrorAction action, with the error', () => {
    const action = new AddressesErrorAction();
  });

});
