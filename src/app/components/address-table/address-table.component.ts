import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Address } from '../../models/address';
import { IAddressPayload } from '../../store';

@Component({
  selector: 'app-address-table-dumb',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressTableComponent {

  @Input() addresses: Address[];
  @Input() loading: boolean;
  @Output() deleteAddress = new EventEmitter<IAddressPayload>();
  @Output() patchAddress = new EventEmitter<IAddressPayload>();

  constructor() { }

  removeAddress(item: Address): void {
    this.deleteAddress.emit({ address: item });
  }

  updateAddress(item: Address): void {
    this.patchAddress.emit({ address: item });
  }
}
