import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TextMaskModule } from 'angular2-text-mask';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AddressComponent,
  AddressContainerComponent,
  AddressTableComponent,
  AddressesContainerComponent
} from './components';
import { STORE_EFFECTS } from './store';
import { AddressService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    AddressComponent,
    AddressContainerComponent,
    AddressTableComponent,
    AddressesContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(STORE_EFFECTS)
  ],
  providers: [AddressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
