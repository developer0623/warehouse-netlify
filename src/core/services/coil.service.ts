import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CoilActions from '../store/coil/coil.actions';
import * as DataSelector from '../store/data/data.selector';
import { ITaskCoil } from '../datatypes';

@Injectable()
export class CoilService {
  constructor(
  	private store: Store<any>) {
  }

  dispatchCurrentCoil() {
  	return this.store.select(DataSelector.currentCoil);
  }

  dispatchViewCoil(coil: ITaskCoil) {
    this.store.dispatch(CoilActions.viewCoilAction({coil}));
  }
  dispatchLocationCoil(location) {
    this.store.dispatch(CoilActions.setLocationAction({location}));
  }

}
