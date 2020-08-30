import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AddressService } from '../../services/index';

@Injectable()
export class AddressEffects {

  constructor(private actions$: Actions, private addressService: AddressService) {
  }

  @Effect() postAddress$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.AddressPostAction>(fromActions.ADDRESS_POST),
    switchMap((payload) => {
      return of(this.addressService.postAddress(payload)).pipe(
        map(() => new fromActions.AddressesGetAction()),
        catchError(() => of(new fromActions.AddressesErrorAction())),
      );
    })
  );

  @Effect() getAddresses$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.AddressesGetAction>(fromActions.ADDRESSES_GET),
    switchMap(() => {
      return of(this.addressService.getAddresses()).pipe(
        map((response) => new fromActions.AddressesGetCompleteAction(response)),
        catchError(() => of(new fromActions.AddressesErrorAction())),
      );
    })
  );

  @Effect() deleteAddress$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.AddressDeleteAction>(fromActions.ADDRESS_DELETE),
    switchMap((payload) => {
      return of(this.addressService.deleteAddresses(payload)).pipe(
        map(() => new fromActions.AddressesGetAction()),
        catchError(() => of(new fromActions.AddressesErrorAction())),
      );
    })
  );

  @Effect() patchAddress$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.AddressPatchAction>(fromActions.ADDRESS_PATCH),
    switchMap((payload) => {
      return of(this.addressService.patchAddresses(payload)).pipe(
        map(() => new fromActions.AddressesGetAction()),
        catchError(() => of(new fromActions.AddressesErrorAction())),
      );
    })
  );
}
