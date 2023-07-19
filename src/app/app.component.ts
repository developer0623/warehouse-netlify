import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, Platform} from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { Router } from '@angular/router';
import { menuController } from '@ionic/core';

import { DataService } from '../core/services/data.service';
import { UrlService } from '../core/providers/url';
import { GlobalFooService } from 'src/core/services/globalFoo.service';
import { NavService } from '../core/services/navigation.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent implements OnInit {
  rootPage: any = '';
  userName: any = '';

  public sideMenuFilters: Array<any> = [];
  public tabs: boolean[] = [];

  public transferTypes: Array<any>= [{id: 'all', title: 'All'}, {id: 'coil', title: 'Coil'}, {id: 'finished', title: 'Finished Product'}];
  public selectedTransferType = 'all';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private dataService: DataService,
    private globalFooService: GlobalFooService,
    private urlService: UrlService,
    public navCtrl: NavController,
    private router: Router,
    private navService: NavService
  ) {
    this.initializeApp();
  }
  ngOnInit() {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if(storedToken && storedUser) {
      const user = JSON.parse(storedUser);
      this.urlService.setMainUrl(user.url);
      this.userName = user.username;
      this.dataService.dispachGetAllData();
      this.rootPage = 'HomePage';
    } else {
      this.rootPage = 'login';
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.globalFooService.getObservable().subscribe((data) => {
        if(data.status === 'user:loggedin') {
          this.dataService.dispachGetAllData();
          this.userName = data.userName;
        } else if(data.status === 'user:logout') {
          this.navCtrl.navigateRoot('login');
        }
      });
    });

    this.makeSideMenuFilters();
  }

  makeSideMenuFilters() {
    this.dataService.selectSideMenuFiltersViewModel()
      .subscribe(taskFilters => {
        this.sideMenuFilters = taskFilters;
      }, err => {
        console.log(err);
      });

    this.dataService.selectTransferTypeValue()
      .subscribe(transferType => {
        // this.selectedTransferType = transferType; // todo
      }, err => {
        console.log(err);
      });
  }

  segmentChanged(event) {
    this.dataService.dispatchToggleTransferTypeFilter(event.value);
  }


  onClickFilter(tabIndex) {
      this.tabs[tabIndex] = !this.tabs[tabIndex];
  }

  onClickFilterItem(item, index1, index2) {
      item.checked = !item.checked;

      this.dataService.dispatchToggleTaskFilter(item);
      // this.events.publish('taskfilter:changed');

  }

  async logout() {
    // this.navCtrl.navigateRoot('login');
    await menuController.toggle();
    // localStorage.clear();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  async gotoCoilsPage() {
    await menuController.toggle();
    this.navService.gotoNewPage('all-coil', {taskFlag: false});
  }



}

