import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnattainableReasonPage } from './unattainable-reason';

const routes: Routes = [
  {
    path: '',
    component: UnattainableReasonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnattainableReasonPageRoutingModule {}
