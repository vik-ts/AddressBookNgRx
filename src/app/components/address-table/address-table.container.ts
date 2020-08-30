import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Address } from '../../models/Address';

@Component({
  selector: 'app-address-table',
  template: `<app-address-table-dumb
  [addresses]="addresses$ | async"
  [loading]="loading$ | async"
  (deleteAddress)="onDeleteAddress($event)"
  (patchAddress)="onPatchAddress($event)"
  ></app-address-table-dumb>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddressesContainerComponent implements OnInit {
  addresses$: Observable<Address[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromStore.IState>) {
    this.store.dispatch(new fromStore.AddressesGetAction());
  }

  ngOnInit(): void {
    this.addresses$ = this.store.select(fromStore.getAddressesObject);
    this.loading$ = this.store.select(fromStore.getAddressesIsLoading);
  }

  onDeleteAddress(payload: fromStore.IAddressPayload): void {
    this.store.dispatch(new fromStore.AddressDeleteAction(payload));
  }

  onPatchAddress(payload: fromStore.IAddressPayload): void {
    this.store.dispatch(new fromStore.AddressPatchAction(payload));
  }
}
