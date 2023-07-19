import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home';
import { TaskItemComponentsModule } from '../../components/task-list-components.module';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TaskItemComponentsModule,
    HomePageRoutingModule
  ],
})
export class HomePageModule {}
