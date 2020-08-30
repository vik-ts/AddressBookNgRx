import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-address',
  template: `<app-address-dumb
  (postAddress)="onPostAddress($event)"
  ></app-address-dumb>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddressContainerComponent {

  constructor(private store: Store<fromStore.IState>) {
  }

  onPostAddress(payload: fromStore.IAddressPayload): void {
    this.store.dispatch(new fromStore.AddressPostAction(payload));
  }
}
