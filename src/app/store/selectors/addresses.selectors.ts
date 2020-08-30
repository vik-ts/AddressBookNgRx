import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AddressesState } from '../reducers/addresses.reducer';
import * as fromAddresses from '../reducers/addresses.reducer';

export const getAddressesState = createFeatureSelector<AddressesState>('addresses');

export const getAddressesObject = createSelector(
  getAddressesState,
  fromAddresses.getAddresses,
);

export const getAddressesIsLoading = createSelector(
  getAddressesState,
  fromAddresses.isLoading
);
