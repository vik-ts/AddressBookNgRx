import { Injectable } from '@angular/core';
import { Address } from '../models/address';

@Injectable()
export class AddressService {

  constructor() {
  }

  postAddress(payload): void {
    const currentAddresses = this.getFromLocalStorage();
    currentAddresses.push(payload.payload.address);
    this.addInLocalStorage(currentAddresses);
  }

  getAddresses(): Address[] {
    return this.getFromLocalStorage();
  }

  deleteAddresses(payload): void {
    const currentAddresses = this.getFromLocalStorage();
    const index = currentAddresses.findIndex(item => item.id === payload.payload.address.id);
    /* istanbul ignore else*/
    if (index !== -1) {
      currentAddresses.splice(index, 1);
    }
    this.addInLocalStorage(currentAddresses);
  }

  patchAddresses(payload): void {
    const currentAddresses = this.getFromLocalStorage();
    currentAddresses.filter((item) => (item.id === payload.payload.address.id) ? item.favorite = !item.favorite : item);
    currentAddresses.sort(item => item.favorite ? -1 : 1);
    this.addInLocalStorage(currentAddresses);
  }

  getFromLocalStorage(): Address[] {
    const headsObj = JSON.parse(localStorage.getItem('allAddresses'));
    return headsObj ?  headsObj.addresses : [];
  }

  addInLocalStorage(currentAddresses): void {
    const setObj = { addresses: currentAddresses };
    const serialObj = JSON.stringify(setObj);
    localStorage.setItem('allAddresses', serialObj);
  }
}
