import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import * as DataActions from '../store/data/data.actions';
import { Store } from '@ngrx/store';
import { bufferTime } from 'rxjs/operators';
import { AppState } from '../store/index';
import { UrlService } from '../providers/url';
import  * as Rx from 'rxjs';


@Injectable()
export class WarehouseHubService {

    putsObs$ = new Rx.Subject();
    private connection: signalR.HubConnection;

    constructor(private store: Store<AppState>, private urlService: UrlService) {
        this.putsObs$.pipe(bufferTime(5000)).subscribe(items => {
            this.store.dispatch(DataActions.updateManyAction({ items: [...items] }));
        });
    }

    startConnection() {
        const serverUrl = this.urlService.getMainUrl();
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${serverUrl}/warehousehub`)
            .withAutomaticReconnect()
            .build();

        this.connection.on('objectPut', (data, collection, serverTime) => {
            this.putsObs$.next({data, collection});
        });

        this.connection.on('objectDelete', (id, collection) => {
            console.log(`Hub DELETE for ${collection} id:${id}`);
            this.store.dispatch(DataActions.deleteDataAction({id, collection}));
        });

        this.connection.onclose(() => {
          console.log('WallboardHubService Disconnected');
          this.connect();
        });

        this.connect();
    }

    connect() {
       console.log('connecting to data hub');
       this.connection.start()
       .then(() => {
          console.log(`WarehousedHubService Connected.`);
       })
       .catch(error => {
          console.error('problem starting data hub', error);
          setTimeout(() => this.connect(), 5000);
       });
    }

}

