import { Address } from '../../models/address';
import * as fromAddress from '../actions';

export interface AddressesState {
  loading: boolean;
  addresses: Address[];
}

const initialState: AddressesState = {
  loading: false,
  addresses: null,
};

export function reducer(state = initialState, action: fromAddress.AddressesActions): AddressesState {
  switch (action.type) {
    case fromAddress.ADDRESSES_GET: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromAddress.ADDRESSES_GET_COMPLETE: {
      return {
        ...state,
        loading: false,
        addresses: action.payload,
      };
    }

    case fromAddress.ADDRESSES_ERROR: {
      return { ...initialState };
    }

    default:
      return state;
  }
}

export const isLoading = (state: AddressesState) => state.loading;
export const getAddresses = (state: AddressesState) => state.addresses;
