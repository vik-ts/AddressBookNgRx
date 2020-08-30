import { Action } from '@ngrx/store';
import { type } from '../../utils/util';
import { Address } from '../../models/address';
export const ADDRESS_PATCH = type('ADDRESS_PATCH');
export const ADDRESS_DELETE = type('ADDRESS_DELETE');
export const ADDRESS_POST = type('ADDRESS_POST');

export interface IAddressPayload {
  address: Address;
}

export class AddressPatchAction implements Action {
  public readonly type = ADDRESS_PATCH;

  constructor(public payload: IAddressPayload) { }
}

export class AddressDeleteAction implements Action {
  public readonly type = ADDRESS_DELETE;

  constructor(public payload: IAddressPayload) { }
}

export class AddressPostAction implements Action {
  public readonly type = ADDRESS_POST;

  constructor(public payload: IAddressPayload) { }
}

export type AddressActions
  = AddressPatchAction
  | AddressDeleteAction
  | AddressPostAction;
