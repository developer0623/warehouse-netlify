import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as DataActions from '../store/data/data.actions';
import * as DataSelector from '../store/data/data.selector';
import { AppState } from '../store/index';
import { IUserTaskFacetViewModel } from  'src/core/datatypes';
import { toggleTaskFiltersAction } from '../store/taskFilters/actions';


@Injectable()
export class DataService {

  constructor(
      private store: Store<AppState>
    ) { }

  dispachGetAllData() {
    this.store.dispatch(
      DataActions.getAllDataAction()
    );
  }

  dispachReset() {
    this.store.dispatch(DataActions.resetStateAction());
  }

  dispatchAllTasks() {
  	return this.store.select(DataSelector.getAllTasks);
  }

  dispatchAllCoils() {
    return this.store.select(DataSelector.getAllCoils);
  }
  dispatchTaskCoils() {
    return this.store.select(DataSelector.getTaskCoils);
  }

  dispatchAllLocations() {
    return this.store.select(DataSelector.getAllLocations);
  }

  dispatchTaskFilters() {
    return this.store.select(DataSelector.userTaskFilterValues);
  }

  dispatchCoilFilters() {
    return this.store.select(DataSelector.getCoilFilters);
  }


  dispatchGetReasons() {
    return this.store.select(DataSelector.getReasons);
  }


  dispatchSetFilters(filters) {
    this.store.dispatch(DataActions.setFiltersAction({filters}));
  }

  selectTaskFacetsViewModel(): Observable<IUserTaskFacetViewModel[]>{
    return combineLatest([
      this.store.select(DataSelector.getTaskFilters),
      this.store.select(DataSelector.userTaskFilterValues)
    ]).pipe(
      filter(x => x.length > 0),
      map(([master, userValues])=>
        master.map(( facet: any) => (
          {
            title: facet.title,
            filters: facet.filters && facet.filters.map(item => (
              {
                ...item,
                // If it's in the user list, honor it's checked value. If not, default to checked.
                checked: userValues.filters.some(filtVal => filtVal.filterId === item.id && filtVal.checked)
                  || userValues.filters.every(filtVal => filtVal.filterId !== item.id)
              }
            ))
          }
        ))
    ));
  }

  selectSideMenuFiltersViewModel() {
    return this.selectTaskFacetsViewModel();
    // return this.selectTaskFacetsViewModel()
    //   .map(taskFilters => taskFilters.filter(x => x.title !== 'Transfer Type'));
  }

  selectTransferTypeValue() {
    return this.selectTaskFacetsViewModel();
    // return this.selectTaskFacetsViewModel()
    //   .flatMap(taskFilters => taskFilters.filter(x => x.title === 'Transfer Type'))
    //   .map(transferTypeFacet => {
    //     const isCoilSelected = transferTypeFacet.filters.some(f => f.id === 'TransferType/coil' && f.checked);
    //     const isFinishedSelected = transferTypeFacet.filters.some(f => f.id === 'TransferType/finished' && f.checked);

    //     if (isCoilSelected && isFinishedSelected || !isCoilSelected && !isFinishedSelected) {
    //       return 'all';
    //     }
    //     else {
    //       return isCoilSelected ? 'coil' : 'finished';
    //     }
    //   });
  }

  dispatchToggleTaskFilter(item: {id: string; checked: boolean}) {
    this.store.dispatch(toggleTaskFiltersAction(item));
  }

  dispatchToggleTransferTypeFilter(transferType: 'coil' | 'finished' | 'all') {
    const coilf = {id: 'TransferType/coil', checked: false};
    const finif = {id: 'TransferType/finished', checked: false};

    if (transferType === 'coil') {
      coilf.checked = true;
    }
    else if (transferType === 'finished') {
      finif.checked = true;
    }
    else {
      coilf.checked = true;
      finif.checked = true;
    }

    this.dispatchToggleTaskFilter(coilf);
    this.dispatchToggleTaskFilter(finif);
  }
}
