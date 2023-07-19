import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverrideReasonPage } from './override-reason';

const routes: Routes = [
  {
    path: '',
    component: OverrideReasonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverrideReasonPageRoutingModule {}
