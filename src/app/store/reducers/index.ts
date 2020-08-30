import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromAddresses from './addresses.reducer';

export interface IState {
  addresses: fromAddresses.AddressesState;
}

export const reducers: ActionReducerMap<IState> = {
  addresses: fromAddresses.reducer,
};

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];
