import { Action } from '@ngrx/store';
import { type } from '../../utils/util';
import { Address } from '../../models/address';
export const ADDRESSES_GET = type('ADDRESSES_GET');
export const ADDRESSES_GET_COMPLETE = type('ADDRESSES_GET_COMPLETE');
export const ADDRESSES_ERROR = type('ADDRESSES_ERROR');

export class AddressesGetAction implements Action {
  public readonly type = ADDRESSES_GET;

  constructor() { }
}

export class AddressesGetCompleteAction implements Action {
  public readonly type = ADDRESSES_GET_COMPLETE;

  constructor(public payload: Address[]) { }
}

export class AddressesErrorAction implements Action {
  public readonly type = ADDRESSES_ERROR;

  constructor() {
  }
}

export type AddressesActions
  = AddressesGetAction
  | AddressesErrorAction
  | AddressesGetCompleteAction;
