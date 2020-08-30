import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { IAddressPayload } from '../../store';
import { Guid } from 'guid-typescript';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-dumb',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressComponent implements OnInit {

  @Output() postAddress = new EventEmitter<IAddressPayload>();
  addressForm: FormGroup;
  phoneMask = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  formIsValid: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formIsValid = true;
    this.initForm();
  }

  initForm(): FormGroup {
    return this.addressForm = this.fb.group({
      id: [Guid.create().toString()],
      favorite: false,
      surname: [null, Validators.required],
      name: null,
      patronymic: null,
      phone: [null, [Validators.required, Validators.pattern('[+]7 [(][0-9]{3}[)] [0-9]{3}-[0-9]{2}-[0-9]{2}')]]
    });
  }

  addAddress(): void {
    this.postAddress.emit({ address: this.addressForm.value });
    this.initForm();
    this.formIsValid = true;
  }
}
