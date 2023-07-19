import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate } from '../core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [canActivate]
  },
  {
    path: 'all-coil',
    loadChildren: () => import('../pages/all-coil/all-coil.module').then(m => m.AllCoilPageModule),
    canActivate: [canActivate]
  },
  {
    path: 'cancel-task',
    loadChildren: () => import('../pages/cancel-task/cancel-task.module').then(m => m.CancelTaskPageModule),
    canActivate: [canActivate]
  },
  {
    path: 'coil-detail',
    loadChildren: () => import('../pages/coil-detail/coil-detail.module').then(m => m.CoilDetailPageModule),
    canActivate: [canActivate]
  },
  {
    path: 'deliver',
    loadChildren: () => import('../pages/deliver/deliver.module').then(m => m.DeliverPageModule),
    canActivate: [canActivate]
  },
  {
    path: 'manual-find',
    loadChildren: () => import('../pages/manual-find/manual-find.module').then(m => m.ManualFindPageModule),
    canActivate: [canActivate]
  },
  {
    path: 'non-prefered-reason',
    loadChildren: () => import('../pages/nonprefered-reason/nonprefered-reason.module').then(m => m.NonpreferedReasonPageModule),
    canActivate: [canActivate]
  },
  {
    path: 'override-reason',
    loadChildren: () => import('../pages/override-reason/override-reason.module').then(m => m.OverrideReasonPageModule),
    canActivate: [canActivate]
  },
  {
    path: 'search-coil-detail',
    loadChildren: () => import('../pages/search-coil-detail/search-coil-detail.module').then(m => m.SearchCoilDetailPageModule),
    canActivate: [canActivate]
  },
  {
    path: 'task-detail',
    loadChildren: () => import('../pages/task-detail/task-detail.module').then(m => m.TaskDetailPageModule),
    canActivate: [canActivate]
  },
  {
    path: 'unattainable-reason',
    loadChildren: () => import('../pages/unattainable-reason/unattainable-reason.module').then(m => m.UnattainableReasonPageModule),
    canActivate: [canActivate]
  },
  {
    path: 'login',
    loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
