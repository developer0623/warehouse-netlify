import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelTaskPage } from './cancel-task';

const routes: Routes = [
  {
    path: '',
    component: CancelTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelTaskPageRoutingModule {}
